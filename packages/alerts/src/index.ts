import { logger } from '@home/logger'
import { sensorsAlerts } from './alerts/sensors'
import { forecastAlerts } from './alerts/forecast'

sensorsAlerts()
forecastAlerts()

logger.log({
    level: 'info',
    message: 'Alerting system started'
})
