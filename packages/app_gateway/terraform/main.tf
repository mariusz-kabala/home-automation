resource "docker_container" "apollo" {
  name  = "apollo"
  image = "${var.DOCKER_REGISTRY}/home/serviceapollo:${var.tag}"
  restart = "always"

  networks_advanced {
      name = "homeAutomation"
  }

  labels = [
    {
        label = "traefik.enable"
        value = "true"
    },
    {
        label = "traefik.http.routers.homeGateway.rule"
        value = "Host(`home.kabala.tech`) && PathPrefix(`/graphql`)"
    },
    {
        label = "traefik.http.services.homeGateway.loadbalancer.server.port"
        value = "3000"
    },
    {
        label = "traefik.http.routers.homeGateway.middlewares"
        value = "homeGateway-stripprefix"
    },
    {
        label = "traefik.http.middlewares.homeGateway-stripprefix.stripprefix.prefixes"
        value = "/graphql"
    }
]

  env = [
      "API_HOST=192.168.0.34",
      "API_TOKEN=${var.API_TOKEN}",
      "CONSUL_HOST=${var.consul_host}",
      "CONSUL_PORT=${var.consul_port}"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
