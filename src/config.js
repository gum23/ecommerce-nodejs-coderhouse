import { config } from 'dotenv';
config();

export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "7zrPwBUSYfhVYqPj";
export const MONGODB_USER = process.env.MONGODB_USER || "ecommerce";
export const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER || "practicaintegradoraclus.ghxzurn.mongodb.net";
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME || "ecommerce";
export const PORT = process.env.PORT || 4000;

//mailer
export const EMAIL = process.env.EMAIL || "gum23coder@gmail.com";
export const PASSWOERD_EMAIL = process.env.PASSWOERD_EMAIL || "gpyokleeyfldcuuw";