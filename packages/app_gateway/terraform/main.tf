resource "docker_container" "apollo" {
  name  = "gateway"
  image = "${var.DOCKER_REGISTRY}/home/gateway:${var.tag}"
  restart = "always"

  networks_advanced {
      name = var.network_name
  }

  labels {
    label = "traefik.enable"
    value = "true"
  }

  labels {
    label = "traefik.http.routers.homeGateway.rule"
    value = "Host(`${var.app_domain}`) && PathPrefix(`/graphql`)"
  }

  labels {
    label = "traefik.http.services.homeGateway.loadbalancer.server.port"
    value = "3000"
  }

  env = [
      "MONGO_CONNECTION_STR=${var.mongo_connection_str}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.50.160"
  ]
}
