resource "docker_container" "devicediscovery" {
  name  = "devicediscovery"
  image = "docker-registry.kabala.tech/home/devicediscovery:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
