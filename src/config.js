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
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});

export default {
    mongodb_password: process.env.MONGODB_PASSWORD,
    mongodb_user: process.env.MONGODB_USER,
    mongodb_cluster: process.env.MONGODB_CLUSTER,
    mongodb_dbname: process.env.MONGODB_DBNAME,
    mongodb_uri: process.env.MONGODB_URI,
    port: parseInt(process.env.PORT, 10),
    environment: environment,

    //mailer
    email: process.env.EMAIL,
    password_email: process.env.PASSWORD_EMAIL,

    //github
    clientid_github: process.env.CLIENTID_GITHUB,
    clientsecret_github: process.env.CLIENTSECRET_GITHUB,

    //key_secret_token
    secret_token: process.env.SECRET_TOKEN,

    //Claves de stripe
    public_key_stripe: process.env.PUBLIC_KEY_STRIPE,
    private_key_stripe: process.env.PRIVATE_KEY_STRIPE,

    //Rutas raiz segun entorno
    route_root: process.env.ROUTE_ROOT
}