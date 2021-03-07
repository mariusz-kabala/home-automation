# @home/mqtt2http

Bridge between MQTT and Dresden Elektronik deCONZ (over HTTP) - https://phoscon.de/en/raspbee

![device](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/mqtt2http/docs/zigbee.jpg)

# FLOW:

![flow](https://raw.githubusercontent.com/mariusz-kabala/home-automation/master/packages/mqtt2http/docs/flow.png)

## MQTT TOPICS:

### Subscriptions

- `zigbee/groups/${groupID}/set`; changes a state of zigbee group (set of lights for example)
  payload:

      ```
      {
          [GroupStateFields.on]?: boolean;
          [GroupStateFields.toggle]?: boolean;
          [GroupStateFields.bri]?: number;
          [GroupStateFields.hue]?: number;
          [GroupStateFields.sat]?: number;
          [GroupStateFields.ct]?: number;
          [GroupStateFields.xy]?: number[];
          [GroupStateFields.alert]?: "none" | "select" | "lselect";
          [GroupStateFields.effect]?: "none" | "colorloop";
          [GroupStateFields.colorloopspeed]?: number;
          [GroupStateFields.transitiontime]?: number;
      }
      ```

- `zigbee/groups/${groupID}/toggle` - Toogle lights state in the group; _no payload_
- `zigbee/groups/${groupID}/turnOn` - Turn on lights in the group; _no payload_
- `zigbee/groups/${groupID}/turnOff` - Turn off lights in the group; _no payload_
- `zigbee/groups/${groupID}/dim` - Dim the group (-25 points); _no payload_
- `zigbee/groups/${groupID}/lighten` - Lighten the group (+25 points); _no payload_
