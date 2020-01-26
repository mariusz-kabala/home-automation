def version = ''

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/python-poetry:latest' } }
    
    environment {
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
        SMART_PLUG_TV_KEY = credentials('smart-plug-tv-key')
        SMART_PLUG_3_KEY = credentials('smart-plug-3-key')
        SMART_PLUG_2_KEY = credentials('smart-plug-2-key')
        SMART_PLUG_1_KEY = credentials('smart-plug-1-key')
    }

    stages {
        stage ('Prepare') {
            steps {
                script {
                    sh "printenv"
                }
            }
        }
        stage ('Deploy tuyaPlugs') {
            when {
                environment name: 'package', value: 'tuyaPlugs'
            }
             steps {
                script {
                    dir("packages/${app}/deploy") {
                        sshagent(['jenkins-local-ssh-key']) {
                            sh "ansible-playbook -i hosts playbook.yml -e 'SMART_PLUG_TV_KEY=${SMART_PLUG_TV_KEY} SMART_PLUG_3_KEY=${SMART_PLUG_3_KEY} SMART_PLUG_2_KEY=${SMART_PLUG_2_KEY} SMART_PLUG_1_KEY=${SMART_PLUG_1_KEY}'"
                        }
                    }
                }
            }
        }
    }

    post { 
        always { 
            cleanWs()
        }
    }
}
