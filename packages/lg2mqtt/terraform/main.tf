resource "docker_container" "lg2mqtt" {
  name  = "lg2mqtt"
  image = "docker-registry.kabala.tech/home/lg2mqtt:${var.tag}"
  restart = "always"
  network_mode = "host"
  
  env = [
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
      "TV_KEYS=${var.TV_KEYS}"
  ]
  dns = [
    "192.168.0.10"
  ]
}
