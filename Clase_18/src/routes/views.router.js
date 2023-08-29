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






export default router;