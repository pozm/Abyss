import {Command, CommandArgTypes, CommandArgument} from "../../m/class";
import {Client, Message, MessageEmbed} from "discord.js";
import {inspect} from "util";
import vm from "vm"

function FitStr(s:string,max:number){
    if (s.length-1 > max){
        return s.slice(0,max-3) + "..."
    }
    return s;
}

module.exports = class Rex extends Command
{

    constructor(  ) 
    {

        super
        ( 
            { 
                Name : 'rex',
                Desc : 'Execute javascript.',
                Guild : false,
                Owner : false,
                Hidden : false,
                Args : [new CommandArgument({
                    Name : 'code',
                    Needed : true,
                    Type : "str" as keyof CommandArgTypes,
                    Perms : null,
                })]
            }
        )

    }

    public run = async (message : Message, client : Client, args: {[x:string]:any} ) => {
        try {
            console.log(this.GetArg("code",args))
            new Function(this.GetArg("code",args))
            let context = {
                // console : { log : undefined }
            }

            vm.createContext(context)
            let script = new vm.Script(this.GetArg("code",args), {
                displayErrors:true,
            })
            let output = script.runInNewContext(context, {
                filename: "index.js",
                timeout:1e3,
                displayErrors:true
            })
            let Embed = new MessageEmbed()
                .setAuthor(message.author.username,message.author.avatarURL({dynamic:true,size:512}) ?? "")
                .addField("**Last Statement**", `\`\`\`js\n${FitStr(inspect(output).replace(/``/gmi, "`` "),400)}\`\`\``,true)
                .addField("**Entered Code**", `\`\`\`js\n${FitStr(inspect(this.GetArg("code",args).replace(/``/gmi, "`` "),),400)}\`\`\``,true)
                .addField("**Context**", `\`\`\`js\n${FitStr(inspect(context).replace(/\`\`/gmi, "\`\` "),1000)}\`\`\``,false)
                .setColor("#9ae28b")
            message.channel.send(Embed);
        }
        catch (e) {
            return {Worked :false, Error:FitStr(e.toString(),500)}
        }

        return {Worked : true}
    }

}