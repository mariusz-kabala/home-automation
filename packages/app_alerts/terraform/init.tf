terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "2.8.0"
    }
  }
  
  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "alerts.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}

provider "docker" {
    host = "tcp://192.168.0.195:2376/"

    registry_auth {
      address = "docker-registry.kabala.tech"
      username = "${var.DOCKER_REGISTRY_USERNAME}"
      password = "${var.DOCKER_REGISTRY_PASSWORD}"
    }
}
