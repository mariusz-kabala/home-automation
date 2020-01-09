resource "docker_container" "alerts" {
  name  = "alerts"
  image = "docker-registry.kabala.tech/home/alerts:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "WS_HOST=home.kabala.tech",
      "WS_PORT=8081",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883"
  ]
  dns = [
    "192.168.0.10"
  ]
}
