resource "docker_container" "statscollector" {
  name  = "statscollector"
  image = "docker-registry.kabala.tech/home/statscollector:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "host"
  }
  env = [
      "WS_HOST=home.kabala.tech",
      "WS_PORT=8081",
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=192.168.0.185",
      "STATS_DB_PORT=8086",
      "STATS_DB_USER=${var.STATS_DB_USER}",
      "STATS_DB_PASS=${var.STATS_DB_PASS}"
  ]
   dns = [
    "192.168.0.10"
  ]
}
