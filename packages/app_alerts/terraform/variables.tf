variable "tag" {}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "DOCKER_REGISTRY" {
    default = "docker-registry.kabala.tech"
}

variable "docker_host" {
    default = "tcp://192.168.0.195:2376/"
}

variable "consul_host" {
  default = "192.168.0.195"
}

variable "consul_port" {
  default = "8500"
}
