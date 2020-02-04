resource "docker_container" "mqtt2http" {
  name  = "mqtt2http"
  image = "docker-registry.kabala.tech/home/mqtt2http:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "API_HOST=home.kabala.tech",
      "API_TOKEN=${var.API_TOKEN}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883"
  ]
  dns = [
    "192.168.0.10"
  ]
}
