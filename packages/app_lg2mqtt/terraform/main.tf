resource "docker_container" "lg2mqtt" {
  name  = "lg2mqtt"
  image = "${var.DOCKER_REGISTRY}/home/lg2mqtt:${var.tag}"
  restart = "always"
  network_mode = "host"
  
  env = [
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
      "TV_KEYS=${var.TV_KEYS}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
