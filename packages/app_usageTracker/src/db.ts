import { ShellyModel } from '@home/models'

export async function findShellyDevice(id: string) {
  return await ShellyModel.findOne({ name: id })
}
