import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DEV_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  ENV,
  POSTGRES_TEST_DB,
} = process.env;

let config;

if (ENV === "dev") {
  config = {
    host: POSTGRES_HOST,
    database: POSTGRES_DEV_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
}

if (ENV === "TEST") {
  config = {
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  };
}

const db = new Pool(config);
export default db;
