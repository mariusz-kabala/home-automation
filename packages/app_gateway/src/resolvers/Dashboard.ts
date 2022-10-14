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

  @Mutation(() => DashboardScreen)
  async saveScreenSetup(
    @Arg('section') section: string,
    @Arg('name') name: string,
    @Arg('setup') setup: string,
  ): Promise<DashboardScreen | null> {
    const dashboard = await DashboardScreenModel.findOne({
      section,
      name,
    })

    if (!dashboard) {
      return null
    }

    dashboard.setup = setup

    await dashboard.save()

    return dashboard
  }
}
