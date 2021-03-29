import { ObjectType, Field, ID } from 'type-graphql'
import { ConsulService } from './Service'

@ObjectType()
export class ConsulNode {
    @Field(() => ID)
    id: string

    @Field()
    node: string

    @Field()
    address: string
    
    @Field()
    datacenter: string

    @Field(() => [ConsulService])
    services: ConsulService[]
}
