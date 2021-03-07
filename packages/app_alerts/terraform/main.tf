resource "docker_container" "alerts" {
  name  = "alerts"
  image = "${var.DOCKER_REGISTRY}/home/alerts:${var.tag}"
  restart = "always"

  networks_advanced {
      name = "homeAutomation"
  }

  env = [
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]

  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
