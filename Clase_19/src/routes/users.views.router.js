import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
    // Falta implementacion
});

router.get("/register", (req, res) => {
    // Falta implementacion
});

// Cuaando ya tenemos una session activa con los datos del user, renderizamos la vista profile
router.get("/", (req, res) => {
    // Falta implementacion
});

export default router;