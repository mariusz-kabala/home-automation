# DeviceDiscovery Service

![flow](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/deviceDiscovery/docs/flow.png "Flow")

Simple service that checks if devices (ar services) are available in local network

It subscribes for updates from OpenWRT router that contains list of connected devices; **topic**:

```
openwrt/clients
```

**example payload**:

```
[
    "f0:b4:29:9f:d5:b0",
    "cc:50:e3:cf:97:57",
    "78:11:dc:82:62:e9",
    "a8:db:03:2b:f1:05",
    "48:bf:6b:09:66:b2",
    "50:c7:bf:c8:5e:89",
    "52:c7:bf:c8:5e:8a",
    "6c:56:97:68:1d:f0",
    "d4:11:a3:19:91:0b",
    "52:c7:bf:91:60:ce"
]
```

Service uses _ping_ to check if device is online. If device does not anwser to ping packages service can return device avability status base on response from OpenWRT. If port number is speficied service will try to connect to that port to confirm avability

## Example configuration

```
devices: [
    {
        name: 'mariusz-phone',
        address: '192.168.0.157', // ping will be used to confirm the status of device
        checkInterval: 180000 // how often service will check the device status
    },
    {
        name: 'weronika-phone',
        address: '192.168.0.192',
        mac: '48:BF:6B:09:66:B2', // openWRT will be used to check the device status
        checkInterval: 180000 // 3min
    },
    {
        name: 'home-srv',
        address: '192.168.0.33',
        port: 22, // will try connect to that port in order to confirm the status
        checkInterval: 60000 // 1min
    },
]
```

## MQTT TOPICS:

1. `devices/${device.name}/status` - publishes device status

   Payload:

   ```
   { isReachable: true|false }
   ```

2. `devices/${device.name}/checkStatus` - subscribe to that topic, allows to manually trigger the device check
