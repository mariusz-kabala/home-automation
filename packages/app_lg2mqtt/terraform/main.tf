resource "docker_container" "lg2mqtt" {
  name  = "lg2mqtt"
  image = "${var.DOCKER_REGISTRY}/home/lg2mqtt:${var.tag}"
  restart = "always"
  # network_mode = "host"

  networks_advanced {
      name = "global"
  }

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.lgtv.rule"
    value = "Host(`home.kabala.tech`) && PathPrefix(`/api/lgtv`)"
  }

  labels {
    label = "traefik.http.services.lgtv.loadbalancer.server.port"
    value = "3000"
  }

  labels {
    label = "traefik.http.routers.lgtv.middlewares"
    value = "lgtv-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.lgtv-stripprefix.stripprefix.prefixes"
    value = "/api/lgtv"
  }
  
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
