resource "docker_container" "statsCollector" {
  name  = "statsCollector"
  image = "docker-registry.kabala.tech/home/statsCollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "WS_HOST=home.kabala.tech",
      "WS_PORT=8081",
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=home.kabala.tech",
      "STATS_DB_PORT=8086",
      "STATS_DB_USER=${var.STATS_DB_USER}",
      "STATS_DB_PASS=${var.STATS_DB_PASS}"
  ]
}