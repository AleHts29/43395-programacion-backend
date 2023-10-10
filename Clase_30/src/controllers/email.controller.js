import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
})

// verifica si la coxion con transporter esta Ok
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
})



const mailOptions = {
    from: 'Coder ' + config.gmailAccount,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHouse Programacion Backend clase30",
    html: `<div>
                <h1>Esto es un Test</h1>
                <p>Hola Coders</p>
            </div>`,
    attachments: []
}


const mailOptionsWithAttachments = {
    from: 'Coder ' + config.gmailAccount,
    to: config.gmailAccount,
    subject: "Correo de prueba CoderHouse Programacion Backend clase30",
    html: `<div>
                <h1>Esto es un Test</h1>
                <p>Ahora usando imagenes</p>
                
            </div>`,
    attachments: [
        {
            filename: 'Meme de programacion.png',
            path: __dirname + '/public/images/meme.png',
            cid: 'meme'
        },
        {
            filename: 'Meme de programacion2.png',
            path: __dirname + '/public/images/meme.png',
            cid: 'meme2'
        }
    ]
}



export const sendEmail = (req, res) => {
    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ msg: "Eror", payload: error })
            }

            console.log('Message sent: %s', info.messageId);
            res.send({ message: 'Success!', payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}


export const sendEmailWithAttachments = (req, res) => {
    try {
        transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ msg: "Eror", payload: error })
            }

            console.log('Message sent: %s', info.messageId);
            res.send({ message: 'Success!', payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }
}