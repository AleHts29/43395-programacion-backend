const express = require("express");
const routerProduct = require('./routes/product.router.js')


const app = express();
const PORT = 8080;
app.use(express.json());

// Router
app.use("/api", routerProduct)



app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})