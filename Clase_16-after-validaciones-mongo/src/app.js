import express from "express";
import morgan from "morgan";
import "./db.js"

import UsersRoutes from "./routes/usersRoutes.js";

// variables de entorno
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Midlewares
app.use(express.json())
// middleware para mostrar por consola los status code
app.use(morgan("dev"));

// Router
app.use("/user", UsersRoutes)


const PORT = process.env.PORT
// Listen
app.listen(PORT, () => {
    console.log("Server ok!! - port:", PORT);
})


