resource "docker_container" "pollutionReports" {
  name  = "pollutionreports"
  image = "docker-registry.kabala.tech/home/pollutionreports:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "AQICN_ORG_API_KEY=${var.AQICN_ORG_API_KEY}",
      "AIR_VISUAL_API_KEY=${var.AIR_VISUAL_API_KEY}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883"
  ]
}
