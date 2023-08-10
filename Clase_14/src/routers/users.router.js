import { Router } from "express";



const router = Router();

router.get('/', (req, res) => {
    res.send("Todo ok!!")
})


export default router;