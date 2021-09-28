import { CommandInteraction } from "discord.js";
import {
    fiiClient,
    Command
} from "@federation-interservices-d-informatique/fiibot-common";
export default class PingCommand extends Command {
    constructor(client: fiiClient) {
        super(client, {
            name: "botinfo",
            description: "Obtenir les informations du bot",
            options: []
        });
    }
    async run(inter: CommandInteraction): Promise<void> {
        inter.reply({
            embeds: [
                {
                    title: `Informations de ${this.client.user.username}`,
                    color: "RANDOM",
                    fields: [
                        {
                            name: "Source",
                            value: "Mon code est disponible sur [GitHub](https://github.com/federation-interservices-d-informatique/), n'hésitez pas à contribuer!"
                        },
                        {
                            name: "License",
                            value: "Ce projet est sous license [MIT](https://github.com/federation-interservices-d-informatique/fiibot-logger/blob/main/LICENSE)"
                        }
                    ]
                }
            ]
        });
    }
}
