variable "tag" {}
variable "API_TOKEN" {}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "DOCKER_REGISTRY" {
    default = "rg.nl-ams.scw.cloud"
}

variable "docker_host" {
    default = "192.168.0.195:2376"
}
