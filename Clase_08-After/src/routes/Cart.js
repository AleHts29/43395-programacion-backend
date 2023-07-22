const express = require('express')
const router = express.Router()

const CartManager = require('../managers/CartManager.js')
const CartService = new CartManager()
const ProductManager = require('../managers/ProductManager')
const ProductService = new ProductManager()

router.post('/', (req, res) => {
    CartService.create().then(result => res.send(result))
})
router.delete('/:id', (req, res) => {
    let param = req.params.id
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    CartService.deleteById(id).then(result => res.send(result))
})
router.post('/:id/products', async (req, res) => {
    let param = req.params.id
    let productsId = req.body
    let realProducts = []
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    await Promise.all(productsId.map(async (products) => {
        console.log(products)
        let verifier = await ProductService.getById(products)
        console.log(verifier)
        if (!verifier.error) {
            realProducts.push(products)
        }
    })).then(CartService.addProduct(id, realProducts).then(result => res.send(result)))

})
router.get('/:id/products', async (req, res) => {
    let param = req.params.id
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    let cart = await CartService.getById(id)
    let productsId = cart.products
    let cartProducts = []
    await Promise.all(productsId.map(async (products) => {
        let newProduct = await ProductService.getById(products)
        cartProducts.push(newProduct)
    }))
    res.send(cartProducts)
})
router.delete('/:id/products/:id_prod', (req, res) => {
    let cartIdParam = req.params.id
    let prodIdParam = req.params.id_prod
    if (isNaN(cartIdParam || prodIdParam)) return (res.status(400).send({ error: "No es un numero" }))
    let cartId = parseInt(cartIdParam)
    let prodId = parseInt(prodIdParam)
    CartService.deleteProduct(cartId, prodId).then(result => res.send(result))
})
module.exports = router 