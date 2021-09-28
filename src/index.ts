import { fiiClient } from "@federation-interservices-d-informatique/fiibot-common";
import { getDirname } from "./utils/getdirname.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const client = new fiiClient(
    {
        intents: ["GUILDS"]
    },
    {
        commandManagerSettings: {
            commandsPath: [`${getDirname(import.meta.url)}/commands`]
        },
        owners: process.env.OWNERS.split(",").map((o) => parseInt(o)),
        token: process.env.BOT_TOKEN
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
