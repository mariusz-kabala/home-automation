import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class ConsulService {
    @Field(() => ID)
    id: string

    @Field()
    node: string

    @Field()
    address: string
    
    @Field()
    datacenter: string

    @Field()
    serviceID: string

    @Field()
    serviceName: string
    
    @Field(() => [String])
    serviceTags: string[]
    
    @Field()
    serviceAddress: string
    
    @Field()
    servicePort: number
}
