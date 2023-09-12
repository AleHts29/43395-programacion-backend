// Funciona con las versiones de redis --> redis@3.0.2 connect-redis@5.1.0

import express from 'express';
import session from 'express-session';


// Redis Local 
// import redis from 'redis'
// const client = redis.createClient();

//Redis Cloud
import redis from 'redis'
const client = redis.createClient(18541, 'redis-18541.c261.us-east-1-4.ec2.cloud.redislabs.com');
client.AUTH('XXXXXXXXXXXXXXXX', (err) => {
    if (err) throw err;
});

import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);

const app = express();
const PORT = 8080

// confi sessions
app.use(session({
    store: new RedisStore({
        // Local
        // client: 'localhost',
        // port: 6379,

        client: client,
        ttl: 60
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))



/*=============================================
=                   Routers                   =
=============================================*/
app.get('/', (req, res) => {
    res.send('Server express ok!!')
})

app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`)
    } else {
        req.session.contador = 1
        res.send(`Bienvenido!!`)
    }
})

app.get('/logout', (req, res) => {
    res.session.destroy(err => {
        if (!err) res.send('Logout!!')
        else res.send({ status: 'Logout Error', body: err })
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Server run on port: ${PORT}`);
})



