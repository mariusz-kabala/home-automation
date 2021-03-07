provider "docker" {
    host = var.docker_host

    registry_auth {
      address = var.DOCKER_REGISTRY
      username = var.DOCKER_REGISTRY_USERNAME
      password = var.DOCKER_REGISTRY_PASSWORD
    }
}


terraform {
  required_providers {
    docker = {
      source = "kreuzwerker/docker"
      version = "2.8.0"
    }
  }

  backend "s3" {
    bucket = "kabalatech-terraform"
    key    = "lg2mqtt.tfstate"
    region = "nl-ams"
    endpoint = "s3.nl-ams.scw.cloud"
    skip_credentials_validation = true
    skip_region_validation      = true
  }
}
