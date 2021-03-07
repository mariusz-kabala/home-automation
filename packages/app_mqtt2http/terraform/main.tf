resource "docker_container" "mqtt2http" {
  name  = "mqtt2http"
  image = "${var.DOCKER_REGISTRY}/home/mqtt2http:${var.tag}"
  restart = "always"
  
  networks_advanced {
      name = "homeAutomation"
  }
  
  env = [
      "API_HOST=192.168.0.34",
      "API_TOKEN=${var.API_TOKEN}",
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
