import { Router } from "express";

const router = Router();

// TODO: Routers de vistas
router.get('/login', (req, res) => {
    res.render('github-login')
})

router.get('/error', (req, res) => {
    res.render('error', { error: "No se pudo autenticar usando gitHub" })
})



export default router;