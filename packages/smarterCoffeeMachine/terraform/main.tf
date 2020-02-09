resource "docker_container" "smarterCoffeeMachine" {
  name  = "smarterCoffeeMachine"
  image = "docker-registry.kabala.tech/home/smartercoffeemachine:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883"
  ]
}
