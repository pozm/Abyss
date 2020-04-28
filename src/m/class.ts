import {Permissions, Message, Client, GuildMember, User} from 'discord.js'

interface CommandArgTypes {
    member? : GuildMember,
    bool?   : Boolean,
    num?    : Number,
    str?    : String,

}

interface CommandData {
    Name   : string
    Desc   : string
    Alias? : string[]
    Perms? : Permissions
    Args?  : CommandArgument[]
    Guild  : boolean
    Owner  : boolean
    Hidden : boolean
}
interface CommandAData {
    Name        : string
    Type        : keyof CommandArgTypes
    prefix?     : string
    Needed      : boolean
    Position    : number[]      |   string
    Perms?       : Permissions  |   null
}

class CommandArgument {

    readonly Name       : string
    readonly Needed     : boolean
    readonly Perms?     : Permissions   |   null
    readonly prefix?    : string
    readonly Position   : number[]      |   string
    readonly Type       : keyof CommandArgTypes
    constructor (Data   : CommandAData) {

        this.Name       = Data.Name
        this.Needed     = Data.Needed
        this.Perms      = Data.Perms    ?? null
        this.prefix     = Data.prefix   ?? ''
        this.Type       = Data.Type as keyof CommandArgTypes
        this.Position   = Data.Position
        
    }
}

class Command {
    readonly Name   : string
    readonly Desc   : string
    readonly Alias? : string[]              |   null
    readonly Perms? : Permissions           |   null
    readonly Args?  : CommandArgument[]    |   undefined
    readonly Guild  : boolean
    readonly Owner  : boolean
    readonly Hidden : boolean

    constructor(Data: CommandData) {
        this.Name   = Data.Name  
        this.Desc   = Data.Desc  
        this.Alias  = Data.Alias ?? null
        this.Perms  = Data.Perms ?? null
        this.Args   = Data.Args  ?? undefined
        this.Guild  = Data.Guild 
        this.Owner  = Data.Owner 
        this.Hidden = Data.Hidden
    }

    protected GetArg = ( name : string , args : {name : string, value : CommandArgTypes}[]) : any => {
        if (!args) return 
        let filt = args.filter(v => v.name === name)[0]
        if(!filt) return
        return filt.value;

    }

    run = async (message : Message, client : Client, args?: {name : string, value : CommandArgTypes}[] ): Promise<{Worked : boolean, Error? : Error}> => {

        return {Worked : false, Error : new Error('There is no run function!')}
    }

}
export {Command, CommandArgument, CommandArgTypes}