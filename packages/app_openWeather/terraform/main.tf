resource "docker_container" "openweather" {
  name  = "openweather"
  image = "${var.DOCKER_REGISTRY}/home/openweather:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "OPEN_WEATHER_API_KEY=${var.OPEN_WEATHER_API_KEY}",
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
      "CITIES=Szczecin,PL Katowice,PL Miechow,PL Berlin,DE",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
