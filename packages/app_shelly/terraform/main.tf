resource "docker_container" "shelly" {
  name  = "shelly"
  image = "docker-registry.kabala.tech/home/shelly:${var.tag}"
  restart = "always"
  networks_advanced {
      name = var.network_name
  }

  env = [
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}",
      "MONGO_CONNECTION_STR=${var.mongo_connection_str}",
      "MQTT_HOST=${var.mqtt_host}",
      "MQTT_PORT=${var.mqtt_port}"
  ]

  dns = [
    "192.168.50.160",
  ]

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.shelly.rule"
    value = "Host(`${var.app_domain}`) && PathPrefix(`${var.app_prefix}`)"
  }

  labels {
    label = "traefik.http.routers.shelly.tls"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.shelly.tls.certresolver"
    value = "myresolver"
  }


  labels {
    label = "traefik.http.services.shelly.loadbalancer.server.port"
    value = var.http_port
  }

  labels {
    label = "traefik.http.routers.shelly.middlewares"
    value = "shelly-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.shelly-stripprefix.stripprefix.prefixes"
    value = var.app_prefix
  }
}
