def branch = ''

pipeline {
    agent any

    environment {
        app = ''
        CI = 'true'
        GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no'
        GH_TOKEN = credentials('jenkins-github-accesstoken')
    }

    stages {
        stage ('prepare') {
            steps {
                script {
                    sh 'printenv'
                    try {
                        branch = env.GIT_LOCAL_BRANCH
                        branch = branch ?: env.GIT_BRANCH
                        if (branch == 'detached') {
                            branch = ''
                        }
                        branch = branch ?: env.ghprbActualCommit
                    } catch (e) {
                        println 'GIT BRANCH not detected'
                    }

                    sh 'git config user.name "jenkins-kabala.tech"'
                    sh 'git config user.email "jenkins@kabala.tech"'

                    if (!branch) {
                        error 'GIT branch to process not found'
                    }

                    if (branch.startsWith('origin/')) {
                        branch = branch.replaceAll('origin/', '')
                    }

                    println "GIT branch to process: ${branch}"
                    manager.addShortText(branch, 'white', 'navy', '1px', 'navy')
                    manager.addShortText("${packages}", "white", "green", "1px", "navy")
                }
            }
        }
        stage ('Checkout') {
            steps {
                    checkout([
                            $class                           : 'GitSCM',
                            branches                         : [[name: "${branch}"]],
                            browser                          : [$class: 'GithubWeb', repoUrl: 'https://github.com/mariusz-kabala/homeAutomation'],
                            doGenerateSubmoduleConfigurations: false,
                            userRemoteConfigs                : [[
                                credentialsId: 'github',
                                refspec      : '+refs/pull/*:refs/remotes/origin/pr/*',
                                url          : 'git@github.com:mariusz-kabala/homeAutomation.git'
                            ]]
                    ])
            }
        }
        stage ('Build Apps') {
            steps {
                script {
                    if (packages == "") {
                        return
                    }

                    def packagesList = packages.split(',')

                    println "packages: ${packages}"

                    println packagesList

                    println packagesList.size()

                    if (packagesList.size() == 0) {
                        return
                    }

                    packagesList.each {
                        def props = readJSON file: "packages/app_${it}/package.json"
                        def currentApp = docker.build(props['name'].replace('@', '').replace('-', '').toLowerCase(), "-f packages/app_${it}/Dockerfile .")
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            currentApp.push("v${props['version']}")
                        }
                    }
                }
            }
        }
        stage ('Build tasks') {
            steps {
                script {
                    def tasksList = tasks.split(',')

                    if (tasksList.size() == 0) {
                        return
                    }

                    tasksList.each {
                        def props = readJSON file: "packages/task_${it}/package.json"
                        def currentApp = docker.build(props['name'].replace('@', '').replace('-', '').toLowerCase(), "-f packages/task_${it}/Dockerfile .")
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            currentApp.push("v${props['version']}")
                            currentApp.push("latest")
                        }
                    }
                }
            }
        }

        stage ('Deploy') {
            when {
                environment name: 'deploy', value: 'true'
            }
            steps {
                script {
                        def packagesList = packages.split(',')
                        packagesList.each {
                            def props = readJSON file: "packages/app_${it}/package.json"

                            build job: 'home/monorepo_deploy', wait: false, parameters: [
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
