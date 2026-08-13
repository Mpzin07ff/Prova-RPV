import knexLib from "knex";
import config from "./knexfile";

const db = knexLib(config.development);

export default db;
