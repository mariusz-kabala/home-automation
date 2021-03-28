resource "docker_container" "pollutionReports" {
  name  = "pollutionreports"
  image = "${var.DOCKER_REGISTRY}/home/pollutionreports:${var.tag}"
  restart = "always"

  networks_advanced {
      name = "global"
  }

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.pollutionReports.rule"
    value = "Host(`home.kabala.tech`) && PathPrefix(`/api/pollution-reports`)"
  }

  labels {
    label = "traefik.http.services.pollutionReports.loadbalancer.server.port"
    value = "3000"
  }

  labels {
    label = "traefik.http.routers.pollutionReports.middlewares"
    value = "pollutionReports-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.pollutionReports-stripprefix.stripprefix.prefixes"
    value = "/api/pollution-reports"
  }

  dns = [
    "192.168.0.37",
    "192.168.0.10"
  ]

  env = [
      "AQICN_ORG_API_KEY=${var.AQICN_ORG_API_KEY}",
      "AIR_VISUAL_API_KEY=${var.AIR_VISUAL_API_KEY}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}",
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883"
  ]
}
