import { logger } from '@home/logger'
import { sensorsAlerts } from './alerts/sensors'
import { forecastAlerts } from './alerts/forecast'
import { deviceAvailabilityAlerts } from './alerts/deviceAvailability'

sensorsAlerts()
forecastAlerts()
deviceAvailabilityAlerts()

logger.log({
    level: 'info',
    message: 'Alerting system started'
})
