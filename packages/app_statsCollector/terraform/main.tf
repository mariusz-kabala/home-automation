resource "docker_container" "statscollector" {
  name  = "statscollector"
  image = "${var.DOCKER_REGISTRY}/home/statscollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = var.network_name
  }

  env = [
      "MQTT_HOST=${var.MQTT_HOST}",
      "MQTT_PORT=${var.MQTT_PORT}",
      "STATS_DB_HOST=${var.STATS_DB_HOST}",
      "STATS_DB_PORT=${var.STATS_DB_PORT}",
      "STATS_DB_ORGANISATION=${var.STATS_DB_ORGANISATION}",
      "STATS_DB_TOKEN=${var.STATS_DB_TOKEN}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]

  dns = var.dns_list
}
