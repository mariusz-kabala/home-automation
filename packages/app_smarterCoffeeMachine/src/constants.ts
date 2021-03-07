export const STR_DIVIDER = '\x7d'

export const STATUS_OK = 0x00
export const STATUS_ALREADY_BREWING = 0x01
export const STATUS_INVALID_ARGS = 0x04
export const STATUS_NO_CARAFFE = 0x05
export const STATUS_NO_WATER = 0x06
export const STATUS_LOW_WATER = 0x07

export const CMD_GET_WIFI_APS = 13
export const CMD_START_BREWING = 51
export const CMD_SET_STRENGTH = 53
export const CMD_SET_CUPS = 54
export const CMD_SET_CONFIG = 56
export const CMD_ENABLE_WARMING = 62
export const CMD_DISABLE_WARMING = 74
export const CMD_END = 126

export const BREW_ON = 0x33
export const BREW_OFF = 0x34
export const MSG_TERMINATOR = 0x7e
