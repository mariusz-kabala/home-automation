resource "docker_container" "ws2mqtt" {
  name  = "ws2mqtt"
  image = "docker-registry.kabala.tech/home/ws2mqtt:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "WS_HOST=home.kabala.tech",
      "WS_PORT=8081",
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883"
  ],
  dns = [
    "192.168.0.10"
  ]
}
