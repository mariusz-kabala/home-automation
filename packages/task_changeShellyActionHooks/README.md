# [Task] Change shelly action hooks

Task is updating shelly device hook settings. It allows to quickly update button's hook (like turn on/off hook) for multiple devices

Task makes a call to `http://${DEVICE-IP-ADDRESS}/settings/actions/`

with a payload like this:

```
index: 0
enabled: true
name: btn_on_url
urls[]: http://192.168.50.190:1880/light-status?name=lights-sconce-living-room&on=1
```

## Params:

`DEVICES` - comma separated list of shelly devices to update

`HOOK` - hook name

`URLS` - webhook url, placeholders possible to use :name, :relay; also comma separated

`ENABLED` - enable/disable the webhook
