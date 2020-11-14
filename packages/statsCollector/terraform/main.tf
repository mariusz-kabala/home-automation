resource "docker_container" "statscollector" {
  name  = "statscollector"
  image = "${var.DOCKER_REGISTRY}/home/statscollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "MQTT_HOST=mqtt",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=home.kabala.tech",
      "STATS_DB_PORT=8086",
      "STATS_DB_ORGANISATION=home",
      "STATS_DB_BUCKET=sensors",
      "STATS_DB_USER=${var.STATS_DB_TOKEN}"
  ]
  dns = [
    "192.168.0.37",
    "192.168.0.10"
  ]
}
