resource "docker_container" "devicediscovery" {
  name  = "devicediscovery"
  image = "docker-registry.kabala.tech/home/devicediscovery:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
  ]
}
