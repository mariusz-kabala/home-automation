resource "docker_container" "mqtt" {
  name  = "mqtt"
  image = "vernemq/vernemq"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "DOCKER_VERNEMQ_ALLOW_ANONYMOUS=on",
      "DOCKER_VERNEMQ_ACCEPT_EULA=yes"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
