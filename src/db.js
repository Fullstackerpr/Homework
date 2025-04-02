import pg from 'pg';
const { Client } = pg;


const client = new Client({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "homework27",
    password: process.env.PG_PASSWORD || "root", 
    port: process.env.PG_PORT || 5432,
});

await client.connect()
    .then(() => console.log("PostgreSQL ga muvaffaqiyatli ulandik!"))
    .catch(err => console.error("Ulanishda xatolik:", err));





export default client;