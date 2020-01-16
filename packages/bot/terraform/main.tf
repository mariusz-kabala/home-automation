resource "docker_container" "bot" {
  name  = "hal9000"
  image = "docker-registry.kabala.tech/home/bot:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "WS_HOST=home.kabala.tech",
      "WS_PORT=8081",
      "MQTT_HOST=home.kabala.tech",
      "MQTT_PORT=1883",
      "STATS_DB_HOST=home.kabala.tech",
      "STATS_DB_PORT=8086",
      "STATS_DB_USER=${var.STATS_DB_USER}",
      "STATS_DB_PASS=${var.STATS_DB_PASS}",
      "TELEGRAM_TOKEN=${var.TELEGRAM_TOKEN}",
      "NODE_ENV=production",
      "HTTP_PORT=9000",
      "TELEGRAM_WEBHOOK_URL=https://home.kabala.tech/bots/hal9000",
      "REDIS_HOST=redis",
      "REDIS_PORT=6379"
  ]
}
