resource "docker_container" "tuyaPlugs" {
  name  = "tuyaplugs"
  image = "docker-registry.kabala.tech/home/tuyaplugs:${var.tag}"
  restart = "always"
  networks_advanced {
      name = "global"
  }
  env = [
      "SMART_PLUG_TV_KEY=${var.SMART_PLUG_TV_KEY}",
      "SMART_PLUG_3_KEY=${var.SMART_PLUG_3_KEY}",
      "SMART_PLUG_2_KEY=${var.SMART_PLUG_2_KEY}",
      "SMART_PLUG_1_KEY=${var.SMART_PLUG_1_KEY}",
      "MQTT_HOST=mqtt.kabala.tech",
      "MQTT_PORT=1883"
  ]
  dns = [
    "192.168.0.37",
    "192.168.0.10"
  ]
}
