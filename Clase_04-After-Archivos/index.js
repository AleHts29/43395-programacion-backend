const ProductManager = require("./ProductManager.js");
let productManager = new ProductManager();
console.log(productManager);

let persistirProduct = async () => {
    let product = await productManager.createProduct('Cafe', 'Cafe tostado Juan Valdez', 2000, "http://cafe.png", "CA45CO", 35);


    let products = await productManager.productList();
    console.log(`Productos encontrados en Product Manager: ${products.length}`);
    console.log(products);
};
persistirProduct();