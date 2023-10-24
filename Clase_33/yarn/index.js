import express from 'express';


const app = express();


app.get('/ping', (req, res) => {
    res.send({ ok: 'ok' })
})


const PORT = 8082;

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`);
})