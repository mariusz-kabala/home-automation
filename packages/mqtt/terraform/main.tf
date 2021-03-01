resource "docker_container" "mqtt" {
  name  = "mqtt"
  image = "vernemq/vernemq"
  restart = "always"
  networks_advanced {
      name = "homeAutomation"
  }
  env = [
      "DOCKER_VERNEMQ_ALLOW_ANONYMOUS=on",
      "DOCKER_VERNEMQ_ACCEPT_EULA=yes"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
  ports {
    internal = 1883
    external = 1883
  }
  # ports {
  #   internal = 8888
  #   external = 8888
  # }
  ports {
    internal = 8080
    external = 8080
  }
  ports {
    internal = 4369
    external = 4369
  }
  ports {
    internal = 44053
    external = 44053
  }
  volumes {
    volume_name    = "mqtt-data"
    container_path = "/data"
  }
}
