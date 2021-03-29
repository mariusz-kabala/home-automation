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
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]

  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.deviceDiscovery.rule"
    value = "Host(`home.kabala.tech`) && PathPrefix(`/api/device-discovery`)"
  }

  labels {
    label = "traefik.http.services.deviceDiscovery.loadbalancer.server.port"
    value = "3000"
  }

  labels {
    label = "traefik.http.routers.deviceDiscovery.middlewares"
    value = "deviceDiscovery-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.deviceDiscovery-stripprefix.stripprefix.prefixes"
    value = "/api/device-discovery"
  }
}
