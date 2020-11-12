resource "docker_container" "statscollector" {
  name  = "statscollector"
  image = "${var.DOCKER_REGISTRY}/home/statscollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=mqtt",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=home.kabala.tech",
      "STATS_DB_PORT=8086",
      "STATS_DB_USER=${var.STATS_DB_USER}",
      "STATS_DB_PASS=${var.STATS_DB_PASS}"
  ]
  dns = [
    "192.168.0.37",
    "192.168.0.10"
  ]
}
