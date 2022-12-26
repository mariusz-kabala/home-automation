variable "tag" {}
variable "DOCKER_REGISTRY" {
    default = "docker-registry.kabala.tech"
}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "mongo_connection_str" {}

variable "mqtt_host" {}

variable "mqtt_port" {}

variable "app_domain" {}

variable "app_prefix" {
  default = "/api/usage"
}
variable "docker_host" {
}

variable "network_name" {
  
}

variable "consul_host" {}

variable "consul_port" {
  default = "8500"
}

variable "http_port" {
  default = "3000"
}
