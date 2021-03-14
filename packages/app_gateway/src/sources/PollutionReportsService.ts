import { Service } from 'typedi'
import { ConsulService } from './consulService'

@Service()
export class PollutionReportsService extends ConsulService {}
