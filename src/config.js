import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command();

program
    .option('-d', 'Variable de debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'modo de trabajo', 'develop')
program.parse();

console.log("Mode option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "production" 
        ? "./src/config/.env.production" 
        : environment === "testing" 
        ? "./src/config/.env.testing" 
        : "./src/config/.env.development"
});

export default {
    mongodb_password: process.env.MONGODB_PASSWORD,
    mongodb_user: process.env.MONGODB_USER,
    mongodb_cluster: process.env.MONGODB_CLUSTER,
    mongodb_dbname: process.env.MONGODB_DBNAME,
    port: parseInt(process.env.PORT, 10),
    environment: environment,

    //mailer
    email: process.env.EMAIL,
    password_email: process.env.PASSWORD_EMAIL,

    //
    secret_token: process.env.SECRET_TOKEN,

    //Claves de stripe
    public_key_stripe: process.env.PUBLIC_KEY_STRIPE,
    private_key_stripe: process.env.PRIVATE_KEY_STRIPE
}