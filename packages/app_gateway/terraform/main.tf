resource "docker_container" "apollo" {
  name  = "apollo"
  image = "${var.DOCKER_REGISTRY}/home/gateway:${var.tag}"
  restart = "always"

  networks_advanced {
      name = "global"
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
      "MONGO_CONNECTION_STR=${var.MONGO_CONNECTION_STR}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.50.160"
  ]
}
