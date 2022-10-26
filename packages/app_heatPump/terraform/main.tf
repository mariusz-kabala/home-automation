resource "docker_container" "heatpump" {
  name  = "heatpump"
  image = "${var.DOCKER_REGISTRY}/home/heatpump:${var.tag}"
  restart = "always"
  networks_advanced {
      name = var.network_name
  }

  env = [
      "MQTT_HOST=${var.MQTT_HOST}",
      "MQTT_PORT=${var.MQTT_PORT}",
      "MONGO_CONNECTION_STR=${var.mongo_connection_str}",
      "STATS_DB_HOST=${var.STATS_DB_HOST}",
      "STATS_DB_PORT=${var.STATS_DB_PORT}",
      "STATS_DB_ORGANISATION=${var.STATS_DB_ORGANISATION}",
      "STATS_DB_TOKEN=${var.STATS_DB_TOKEN}",
      "STATS_DB_BUCKET=${var.STATS_DB_BUCKET}",
      "HEAT_PUMP_USERNAME=${var.HEAT_PUMP_USERNAME}",
      "HEAT_PUMP_PASSWORD=${var.HEAT_PUMP_PASSWORD}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]

  dns = var.dns_list
}
