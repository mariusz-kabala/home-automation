resource "docker_container" "openweather" {
  name  = "openweather"
  image = "${var.DOCKER_REGISTRY}/home/openweather:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.openWeather.rule"
    value = "Host(`home.kabala.tech`) && PathPrefix(`/api/open-weather`)"
  }

  labels {
    label = "traefik.http.services.openWeather.loadbalancer.server.port"
    value = "3000"
  }

  labels {
    label = "traefik.http.routers.openWeather.middlewares"
    value = "openWeather-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.openWeather-stripprefix.stripprefix.prefixes"
    value = "/api/open-weather"
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
