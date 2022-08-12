import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { DashboardScreen, DashboardScreenModel } from 'models/DashboardScreen'

@Service()
@Resolver(() => DashboardScreen)
export class DashboardResolver {
  @Query(() => [DashboardScreen])
  async screens(@Arg('section', { nullable: true }) section?: string): Promise<DashboardScreen[]> {
    const query: { section?: string } = {}

    if (section) {
      query.section = section
    }

    return await DashboardScreenModel.find(query)
  }

  @Query(() => [String])
  async screenSections(): Promise<string[]> {
    return await DashboardScreenModel.distinct('section')
  }
}
