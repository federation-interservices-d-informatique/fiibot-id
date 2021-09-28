import { CommandInteraction } from "discord.js";
import {
    fiiClient,
    Command
} from "@federation-interservices-d-informatique/fiibot-common";
export default class PingCommand extends Command {
    constructor(client: fiiClient) {
        super(client, {
            name: "ping",
            description: "Get bot ping"
        });
    }
    async run(inter: CommandInteraction): Promise<void> {
        const base = Date.now();
        await inter.reply("Mesure...");
        await inter.editReply(
            `${
                Date.now() - base < 250 ? "🟢" : 500 < Date.now() ? "🔴" : "🟡"
            } Pong! 🏓 en ${Date.now() - base}ms`
        );
    }
}
