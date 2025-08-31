import { Client } from "ts-postgres";

const sleep = async (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

(async () => {
    const client = new Client({
        host: process.env.DB_HOST,
        user: process.env.POSTGRES_USER,
        port: parseInt(process.env.POSTGRES_PORT) ?? 5432,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD
    });
    console.log("Waiting for postgresql");
    let error = false;
    do {
        try {
            error = false;
            await client.connect();
        } catch (e) {
            console.log("Failed to connect... retrying");
            error = true;
            await sleep(2500);
        }
    } while (error);
    console.log("Conected!");

    process.exit(0);
})();
