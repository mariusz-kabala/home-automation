export interface IStatus {
  isOn: boolean
  isBrewing: boolean
  isCarafeDetected: boolean
  isGrind: boolean
  isHotplateOn: boolean
  waterLevel: number
  strength: number
  cups: number
  isReady: boolean
  isCycleComplete: boolean
}
