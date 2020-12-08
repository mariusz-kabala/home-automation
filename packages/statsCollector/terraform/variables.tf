variable "tag" {}

variable "STATS_DB_TOKEN" {}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "DOCKER_REGISTRY" {
    default = "docker-registry.kabala.tech"
}

variable "docker_host" {
    default = "192.168.0.195:2376"
}
