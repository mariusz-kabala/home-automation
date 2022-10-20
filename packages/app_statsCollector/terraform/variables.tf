variable "tag" {}

variable "STATS_DB_HOST" {}

variable "STATS_DB_PORT" {
  default = 8086
}

variable "STATS_DB_ORGANISATION" {
  default = "home"
}

variable "MQTT_HOST" {}

variable "MQTT_PORT" {
  default = 1883
}

variable "STATS_DB_TOKEN" {}

variable "DOCKER_REGISTRY_USERNAME" {}

variable "DOCKER_REGISTRY_PASSWORD" {}

variable "DOCKER_REGISTRY" {
    default = "docker-registry.kabala.tech"
}

variable "mongo_connection_str" {}

variable "docker_host" {}

variable "consul_host" {}

variable "consul_port" {
  default = 8500
}

variable "dns_list" {
  type = list(string)
  default = [ "8.8.8.8", "8.8.4.4" ]
}

variable "network_name" {}
