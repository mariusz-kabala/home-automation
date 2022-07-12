import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { DashboardScreen } from 'models/DashboardScreen'

@Service()
@Resolver(() => DashboardScreen)
export class DashboardResolver {
  @Query(() => [DashboardScreen])
  screens(): DashboardScreen[] {
    return []
  }
}
