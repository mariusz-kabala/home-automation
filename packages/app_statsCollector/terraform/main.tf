resource "docker_container" "statscollector" {
  name  = "statscollector"
  image = "${var.DOCKER_REGISTRY}/home/statscollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=192.168.0.195",
      "STATS_DB_PORT=8086",
      "STATS_DB_ORGANISATION=home",
      "STATS_DB_TOKEN=${var.STATS_DB_TOKEN}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.0.37",
    "192.168.0.10"
  ]
}
