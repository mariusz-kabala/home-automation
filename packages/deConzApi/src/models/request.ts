export enum GroupStateFields {
    on = "on",
    toggle = "toggle",
    bri = "bri",
    hue = "hue",
    sat = "sat",
    ct = "ct",
    xy = "xy",
    alert = "alert",
    effect = "effect",
    colorloopspeed = "colorloopspeed",
    transitiontime = "transitiontime"
  }
  
  export interface IGroupState {
    [GroupStateFields.on]?: boolean; // Set to true to turn the lights on, false to turn them off.
    [GroupStateFields.toggle]?: boolean; // Set to true toggles the lights of that group from on to off or vice versa, false has no effect
    [GroupStateFields.bri]?: number; // brightness (0..255)
    [GroupStateFields.hue]?: number; // (0..65535) Set the color hue of the group. The hue parameter in the HSV color model is between 0°-360° and is mapped to 0..65535 to get 16-bit resolution.
    [GroupStateFields.sat]?: number; // (0..255) Set the color saturation of the group. There 0 means no color at all and 255 is the highest saturation of the color.
    [GroupStateFields.ct]?: number; // (153..500) Set the Mired color temperature of the group. (2000K - 6500K)
    [GroupStateFields.xy]?: number[]; // Set the CIE xy color space coordinates as array [x, y] of real values (0..1).
    [GroupStateFields.alert]?: "none" | "select" | "lselect"; // Trigger a temporary alert effect
    [GroupStateFields.effect]?: "none" | "colorloop"; // Trigger an effect of the group
    [GroupStateFields.colorloopspeed]?: number; // (1..255) Specifies the speed of a colorloop. 1 = very fast, 255 = very slow (default: 15).
    [GroupStateFields.transitiontime]?: number; // Transition time in 1/10 seconds between two states.
  }
