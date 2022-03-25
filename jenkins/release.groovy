def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/node12-with-git:latest' } }

    environment {
        app = ''
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
        GH_TOKEN = credentials('jenkins-github-accesstoken')
    }

    stages {
        stage ('prepare') {
            steps {
                script {
                    try {
                        branch = env.GIT_LOCAL_BRANCH
                        branch = branch ?: env.GIT_BRANCH
                        if (branch == 'detached') {
                            branch = ''
                        }
                        branch = branch ?: env.ghprbActualCommit
                    } catch (e) {
                        println "GIT BRANCH not detected"
                    }

                    sh 'git config user.name "jenkins-kabala.tech"'
                    sh 'git config user.email "jenkins@kabala.tech"'

                    if (!branch) {
                        error "GIT branch to process not found"
                    }

                    if (branch.startsWith('origin/')) {
                        branch = branch.replaceAll('origin/', '')
                    }

                    println "GIT branch to process: ${branch}"
                    manager.addShortText(branch, "white", "navy", "1px", "navy")
                }
            }
        }
        stage ('Checkout') {
            steps {
                    checkout([
                            $class                           : 'GitSCM',
                            branches                         : [[name: "${branch}"]],
                            browser                          : [$class: 'GithubWeb', repoUrl: "https://github.com/mariusz-kabala/homeAutomation"],
                            doGenerateSubmoduleConfigurations: false,
                            userRemoteConfigs                : [[
                                credentialsId: 'github',
                                refspec      : '+refs/pull/*:refs/remotes/origin/pr/*',
                                url          : "git@github.com:mariusz-kabala/homeAutomation.git"
                            ]]
                    ])
            }
        }
        stage ('Install dependencies') {
            steps {
                script {
                    sh "yarn install --ignore-scripts"
                }
            }
        }
        stage ('Release') {
            steps {
                script {
                    sshagent(['jenkins-ssh-key']) {
                        sh "git checkout ${branch}"
                        sh "lerna version --no-commit-hooks"
                    }
                }
            }
        }
        stage ('Build & Deploy') {
            when {
                expression {
                    env.build == 'true'
                }
            }
             steps {
                script {
                    build job: 'home/monorepo_build', wait: false, parameters: [
                        string(name: 'ghprbActualCommit', value: "${ghprbActualCommit}"),
                        string(name: 'packages', value: "${env.packages}"),
                        string(name: 'deploy', value: "${env.deploy}"),
                    ]
                }
            }
        }
    }
}
