resource "docker_container" "apollo" {
  name  = "apollo"
  image = "${var.DOCKER_REGISTRY}/home/serviceapollo:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "API_HOST=192.168.0.34",
      "API_TOKEN=${var.API_TOKEN}",
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
