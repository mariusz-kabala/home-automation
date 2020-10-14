provider "docker" {
    host = "tcp://${var.docker_host}/"
}

terraform {
  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "home_mqtt.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}
