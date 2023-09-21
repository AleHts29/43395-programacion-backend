import dotenv from 'dotenv';
import program from '../process.js';


// TODO: REVISAR -- todo ok

const enviroment = program.opts().mode;
console.log("Modo Opt: ", program.opts().mode);

// const enviroment = 'dev'


// dotenv.config()
dotenv.config({
    path: enviroment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
})



export default {
    port: process.env.PORT,
    mongoUrl: process.env.URL_MONGO,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
}