import { ShellyModel } from '@home/models'
import { subscribe } from '@home/mqtt'
import { logger } from '@home/logger'

function onStatusChange(topic) {

}


export async function start() {
    const devices = await ShellyModel.find({category: 'lights'})

    for (const device of devices) {

    }
}