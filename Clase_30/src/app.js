import express from 'express';
import config from './config/config.js';

//Passport imports

//import Routers
import emailRouter from './routers/email.router.js';
import smsRouter from './routers/sms.router.js';

const app = express();

//JSON settings:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Declare routers:
app.use("/api/email", emailRouter); // aqui usamos Gmail
app.use("/api/sms", smsRouter); // aqui usamos Twlio

const SERVER_PORT = config.port;
app.listen(SERVER_PORT, () => {
    console.log("Servidor escuchando por el puerto: " + SERVER_PORT);
});