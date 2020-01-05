def branch = '';

pipeline {
    agent any

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
                    sh "printenv"
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
        stage ('Build Containers') {
             steps {
                script {
                    def packagesList = packages.split(',')
                    packagesList.each{
                        def props = readJSON file: "packages/${it}/package.json"
                        def currentApp = docker.build(props['name'].replace('@', '').toLowerCase(), "-f packages/${it}/Dockerfile .")
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            currentApp.push("v${props['version']}")
                        }
                    }
                }
            }
        }
        stage ('Deploy') {
            when {
                expression {
                    env.deploy == 'true'
                }
            }
            steps {
                script {
                        def packagesList = packages.split(',')
                        packagesList.each{
                            def props = readJSON file: "packages/${it}/package.json"

                            build job: '(HomeAutomation) Deploy', wait: false, parameters: [
                                string(name: 'ghprbActualCommit', value: "${ghprbActualCommit}"),
                                string(name: 'package', value: "${it}"),
                                string(name: 'version', value: "v${props.version}"),
                            ]
                        }
                }
            }
        }
    }
}
