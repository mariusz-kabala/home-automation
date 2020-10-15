resource "docker_container" "ws2mqtt" {
  name  = "ws2mqtt"
  image = "${var.DOCKER_REGISTRY}/home/ws2mqtt:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "WS_HOST=192.168.0.34",
      "API_HOST=192.168.0.34",
      "WS_PORT=8081",
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=mqtt",
      "MQTT_PORT=1883"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
