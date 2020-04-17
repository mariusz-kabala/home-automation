resource "docker_container" "authService" {
  name  = "authService"
  image = "docker-registry.kabala.tech/home/authservice:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883",
      "DB_HOST=redis",
      "REDIS_HOST=mongo",
      "GOOGLE_CONSUMER_KEY=${var.GOOGLE_CONSUMER_KEY}",
      "GOOGLE_CONSUMER_SECRET=${var.GOOGLE_CONSUMER_SECRET}",
      "GITHUB_CLIENT_ID=${var.GITHUB_CLIENT_ID}",
      "GITHUB_CLIENT_SECRET=${var.GITHUB_CLIENT_SECRET}",
      "APP_DOMAIN=https://home.kabala.tech",
      "JWT_SECRET=${var.JWT_SECRET}",
      "JWT_REFRESH_TOKEN_SECRET=${var.JWT_REFRESH_TOKEN_SECRET}",
      "SESSION_SECRET=${var.SESSION_SECRET}"
  ]
  dns = [
    "192.168.0.10",
    "192.168.0.37"
  ]
}
