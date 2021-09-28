import {
    Command,
    fiiClient
} from "@federation-interservices-d-informatique/fiibot-common";
import { argon2i } from "argon2-ffi";
import { randomBytes } from "crypto";
import { ApplicationCommandOptionChoice, CommandInteraction } from "discord.js";
import { CODENAMES, SERVERS } from "../utils/constants.js";
import { transformUserName } from "../utils/transformUserNames.js";
const getServersChoices = (): ApplicationCommandOptionChoice[] => {
    const choices = [];
    Object.entries(SERVERS).forEach((e) => {
        choices.push({
            name: e[1],
            value: e[0]
        });
    });

    return choices;
};
export default class IdCommand extends Command {
    constructor(client: fiiClient) {
        super(client, {
            name: "id",
            description: "Gérer son ID FII",
            options: [
                {
                    type: "SUB_COMMAND",
                    name: "create",
                    description: "Créer un id FII",
                    options: [
                        {
                            type: "STRING",
                            name: "username",
                            description: "Votre nom d'utilisateur",
                            required: true
                        },
                        {
                            type: "STRING",
                            name: "serveur",
                            description: "Le serveur auquel sera lié l'ID",
                            required: true,
                            choices: getServersChoices()
                        }
                    ]
                }
            ]
        });
    }
    async run(interaction: CommandInteraction): Promise<void> {
        if (interaction.options.getSubcommand() === "create") {
            const username = interaction.options.get("username")
                .value as string;
            const finalUserName = transformUserName(username);

            if (username !== finalUserName) {
                await interaction.reply({
                    content: `Votre nom d'utilisateur a été modifié car il contenait des espaces.\nNouveau nom d'utilisateur: ${finalUserName}`,
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    ephemeral: true,
                    content: `Nom d'utilisateur: ${username}`
                });
            }
            if (/<@(!|&)[0-9]{15,20}>/.test(finalUserName)) {
                await interaction.editReply({
                    content:
                        "Le nom d'utilisateur ne **DOIS PAS** être une mention."
                });
                return;
            }

            if (await this.client.dbclient.has(`id-${finalUserName}`)) {
                await interaction.editReply(
                    `Le nom d'utilisateur ${finalUserName} est déjà utilisé. Veuillez en choisir un autre.`
                );
                return;
            }
            const createdUsers =
                (await this.client.dbclient.get<string[]>("in-createdids")) ||
                [];
            if (createdUsers.includes(interaction.user.id)) {
                await interaction.editReply("Vous avez déjà créé un ID!");
                return;
            }
            const server = interaction.options.get("serveur").value as string;

            await interaction.followUp({
                ephemeral: true,
                content: `L'ID sera lié au serveur ${SERVERS[server]} (${CODENAMES[server]})`
            });

            const index =
                ((await this.client.dbclient.get<number>("in-index")) || 0) + 1;

            await this.client.dbclient.set("in-index", index);

            const random = Math.floor(
                Math.random() * (9999999999 - 1000000000) + 1000000000
            );
            const id = `FII-${CODENAMES[server]}-${index}-${random}-FII`;
            const salt = randomBytes(32);
            const hashedID = argon2i.hash(id, salt);
            await this.client.dbclient.set(`id-${finalUserName}`, hashedID);

            createdUsers.push(interaction.user.id);
            await this.client.dbclient.set("in-createdids", createdUsers);
            await interaction.followUp({
                ephemeral: true,
                content: `Votre ID sera ${id}. Notez le **en lieu sur**. Il sera automatiquement effacé lors du prochain redémarrage de Discord`
            });
        }
    }
}
