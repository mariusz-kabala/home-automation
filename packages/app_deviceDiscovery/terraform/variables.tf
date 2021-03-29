variable "tag" {}
variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "docker_host" {
    default = "tcp://192.168.0.195:2376/"
}

variable "consul_host" {
  default = "192.168.0.195"
}
