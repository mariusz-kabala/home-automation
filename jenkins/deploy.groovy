def branch = '';

pipeline {
    agent { docker { image 'docker-registry.kabala.tech/alpine-terraform:latest' } }
    
    environment {
        AWS_ACCESS_KEY_ID = credentials('SCALEWAY_S3_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('SCALEWAY_S3_ACCESS_SECRET_KEY')
        DECONZ_API_TOKEN = credentials('deCONZ')
        STATS_DB_USER = credentials('home-automation-stats-db-user')
        STATS_DB_PASS = credentials('home-automation-stats-db-pass')
        DOCKER_REGISTRY_USERNAME = credentials('docker-registry-username')
        DOCKER_REGISTRY_PASSWORD = credentials('docker-registry-password')
        OPEN_WEATHER_API_KEY = credentials('open-weather-api-key')
        HAL9000_TOKEN=credentials('telegram-hal900-token')
        TV_KEYS = credentials('tv-auth-keys')
        AQICN_ORG_API_KEY = credentials('AQICN_ORG_API_KEY')
        AIR_VISUAL_API_KEY = credentials('AIR_VISUAL_API_KEY')
        CI = 'true'
        GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
    }

    stages {
        stage ('Prepare') {
            steps {
                script {
                    sh "printenv"
                }
            }
        }
        stage ('Deploy ws2mqtt') {
            when {
                environment name: 'package', value: 'ws2mqtt'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"API_TOKEN=${DECONZ_API_TOKEN}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy openWeather') {
            when {
                environment name: 'package', value: 'openWeather'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"OPEN_WEATHER_API_KEY=${OPEN_WEATHER_API_KEY}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy statsCollector') {
            when {
                environment name: 'package', value: 'statsCollector'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"API_TOKEN=${DECONZ_API_TOKEN}\" -var=\"STATS_DB_USER=${STATS_DB_USER}\" -var=\"STATS_DB_PASS=${STATS_DB_PASS}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy HAL9000') {
            when {
                environment name: 'package', value: 'bot'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"TELEGRAM_TOKEN=${HAL9000_TOKEN}\" -var=\"STATS_DB_USER=${STATS_DB_USER}\" -var=\"STATS_DB_PASS=${STATS_DB_PASS}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy alerts') {
            when {
                environment name: 'package', value: 'alerts'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy lg2mqtt') {
            when {
                environment name: 'package', value: 'lg2mqtt'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"TV_KEYS=${TV_KEYS}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy deviceDiscovery') {
            when {
                environment name: 'package', value: 'deviceDiscovery'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
        stage ('Deploy pollutionReports') {
            when {
                environment name: 'package', value: 'pollutionReports'
            }
            steps {
                dir("packages/${env.package}/terraform") {
                    script {
                        docker.withRegistry('https://docker-registry.kabala.tech', 'docker-registry-credentials') {
                            sh "terraform init"
                            sh "terraform plan -out deploy.plan -var=\"tag=${version}\" -var=\"DOCKER_REGISTRY_USERNAME=${DOCKER_REGISTRY_USERNAME}\" -var=\"DOCKER_REGISTRY_PASSWORD=${DOCKER_REGISTRY_PASSWORD}\" -var=\"AQICN_ORG_API_KEY=${AQICN_ORG_API_KEY}\" -var=\"AIR_VISUAL_API_KEY=${AIR_VISUAL_API_KEY}\"" 
                            sh "terraform apply -auto-approve deploy.plan"
                        }
                    }
                }
            }
        }
    }
}
