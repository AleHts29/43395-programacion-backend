import { Router } from 'express';
import cookieParser from 'cookie-parser';

const router = Router();

// // Sin firma
// router.use(cookieParser())

// Con firma
router.use(cookieParser("CoderS3cr3tC0d3"))

router.get('/', (req, res) => {
    res.render('index', {})
});


// setCookie
router.get("/setCookie", (req, res) => {
    // Sin Firma
    // res.cookie("CoderCookie", "Esta es una cookie - clase18", { maxAge: 30000 }).send("Cookie asiugnada con exito!!")

    // Con firma
    res.cookie("CoderCookie", "Esta es una cookie - clase18", { maxAge: 30000, signed: true }).send("Cookie asiugnada con exito!!")
})

// getCookies
router.get("/getCookies", (req, res) => {
    // res.send(req.cookies)

    res.send(req.signedCookies)
})

// deleteCookie
router.get("/deleteCookie", (req, res) => {
    res.clearCookie("CoderCookie").send("cookie borrada!!")
})


/*=============================================
=                   2da Parte                 =
=============================================*/

//Session management:
router.get("/session", (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
        res.send(`Se ha visitado este sitio ${req.session.counter} veces.`)
    } else {
        req.session.counter = 1;
        res.send("Bienvenido!!")
    }
})

// destruir la session
router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.json({ error: "error de logout", msg: "Error al cerrar la sesion" })
        }
        res.send("Sesion cerrada correctamente!!")
    })
})

// login
router.get('/login', (req, res) => {
    // Logica
    const { username, password } = req.query;
    if (username !== 'pepe' || password !== '123qwe') {
        return res.status(401).send("Login Failed, check your username and password")
    } else {
        req.session.user = username;
        req.session.admin = true;
        res.send("Login Success!")
    }
})

//Auth middleware:
function auth(req, res, next) {
    if (req.session.user === 'pepe' && req.session.admin) {
        return next()
    } else {
        return res.status(403).send('Usuario no autorizado para ingresar a este recurso..')
    }
}


router.get("/private", auth, (req, res) => {
    // Logica
    res.send("Si estas viendo esto, es porque pasaste la autorizacion y sos un ADMIN!!")
})


export default router;