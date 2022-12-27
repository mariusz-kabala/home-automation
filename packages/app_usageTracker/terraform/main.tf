resource "docker_container" "usagetracker" {
  name  = "usage-tracker"
  image = "docker-registry.kabala.tech/home/usagetracker:${var.tag}"
  restart = "always"
  networks_advanced {
      name = var.network_name
  }

  env = [
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}",
      "HTTP_PORT=${var.http_port}",
      "MONGO_CONNECTION_STR=${var.mongo_connection_str}",
      "MQTT_HOST=${var.mqtt_host}",
      "MQTT_PORT=${var.mqtt_port}"
  ]

  dns = var.dns_list

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.usagetracker.rule"
    value = "Host(`${var.app_domain}`) && PathPrefix(`${var.app_prefix}`)"
  }

  # labels {
  #   label = "traefik.http.routers.usagetracker.tls"
  #   value = "true"
  # }

  # labels {
  #   label = "traefik.http.routers.usagetracker.tls.certresolver"
  #   value = "myresolver"
  # }

  labels {
    label = "traefik.http.services.usagetracker.loadbalancer.server.port"
    value = var.http_port
  }

  labels {
    label = "traefik.http.routers.usagetracker.middlewares"
    value = "usagetracker-stripprefix"
  }

  labels {
    label = "traefik.http.middlewares.usagetracker-stripprefix.stripprefix.prefixes"
    value = var.app_prefix
  }
}
