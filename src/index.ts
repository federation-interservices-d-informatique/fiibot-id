import {
    FiiClient,
    getDirname
} from "@federation-interservices-d-informatique/fiibot-common";
import { GatewayIntentBits } from "discord.js";

new FiiClient(
    {
        intents: [GatewayIntentBits.Guilds]
    },
    {
        managersSettings: {
            interactionsManagerSettings: {
                interactionsPaths: [`${getDirname(import.meta.url)}/commands`]
            },
            eventsManagerSettings: { eventsPaths: [] }
        },
        token: process.env.BOT_TOKEN ?? ""
    },
    {
        dbConfig: {
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.DB_HOST
        }
    }
);
