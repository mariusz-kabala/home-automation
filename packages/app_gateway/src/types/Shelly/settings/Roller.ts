import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Roller {
    @Field()
    maxtime: number

    @Field()
    maxtime_open:  number
    
    @Field()
    maxtime_close: number
    
    @Field()
    default_state: string
    
    @Field()
    swap: boolean
    
    @Field()
    swap_inputs: boolean
    
    @Field()
    input_mode: string
    
    @Field()
    button_type: string
    
    @Field()
    btn_reverse: number
    
    @Field()
    state: string
    
    @Field()
    power: number
    
    @Field()
    is_valid: boolean
    
    @Field()
    safety_switch: boolean
    
    @Field()
    schedule: boolean
    
    @Field()
    schedule_rules: [] // no idea how it looks like, to check later
    
    @Field()
    obstacle_mode: string
    
    @Field()
    obstacle_action: string
    
    @Field()
    obstacle_power: number
    
    @Field()
    obstacle_delay: number
    
    @Field()
    ends_delay: number
    
    @Field()
    safety_mode: string
    
    @Field()
    safety_action: string
    
    @Field()
    safety_allowed_on_trigger: string
    
    @Field()
    off_power: number
    
    @Field()
    positioning: boolean
}
