variable "tag" {}

variable "mongo_connection_str" {}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "DOCKER_REGISTRY" {
    default = "docker-registry.kabala.tech"
}

variable "app_domain" {}

variable "docker_host" {}

variable "consul_host" {}

variable "consul_port" {
  default = "8500"
}
