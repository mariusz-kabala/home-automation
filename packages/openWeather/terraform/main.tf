resource "docker_container" "openweather" {
  name  = "openweather"
  image = "docker-registry.kabala.tech/home/openweather:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "OPEN_WEATHER_API_KEY=${var.OPEN_WEATHER_API_KEY}",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
      "CITIES=Szczecin,PL Katowice,PL Miechow,PL Berlin,DE"
  ]
}
