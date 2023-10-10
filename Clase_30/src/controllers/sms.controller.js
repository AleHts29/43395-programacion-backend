import config from "../config/config.js";
import twilio from 'twilio';


const twilioClient = twilio(config.twilioAccountSID, config.twilioAuthToken)

const twilioSMSOPtions = {
    body: 'Esto es un mensaje SMS de prueba usando Twilio desde CoderHouse',
    from: config.twilioSmsNumber,
    to: config.twilioToSmsNumber
}


export const sendSMS = async (req, res) => {
    try {
        console.log('Enviando SMS usando Twilio');
        console.log(twilioClient);
        const result = await twilioClient.messages.create(twilioSMSOPtions)
        res.send({ msg: 'Success', payload: result })
    } catch (error) {
        console.error("Hubo un problema enviando el SMS usando Twilio.");
        res.status(500).send({ error: error });
    }
}