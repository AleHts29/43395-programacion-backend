import { Router } from "express";
import calulator from 'calculator-app_c33'

const router = Router();

router.post("/sum", (req, res) => {
    const { num1, num2 } = req.body
    const result = calulator.sum(num1, num2)
    res.send({ status: 'success', result: result })
});

router.post("/divide", (req, res) => {
    try {
        const { num1, num2 } = req.body
        const result = calulator.divide(num1, num2)
        res.send({ status: 'success', result: result })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

export default router;