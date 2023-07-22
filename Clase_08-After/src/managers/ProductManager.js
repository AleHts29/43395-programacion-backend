const fs = require('fs')
const pathToData = 'src/data/data.json'


class Container{
    add = async(product) => {
        if(!product.name || !product.price || !product.thumbnail || !product.stock || !product.description){
            return{status:"error", error:"faltan completar datos"}
        }
        try{
            if(fs.existsSync(pathToData)){
                let data = await fs.promises.readFile(pathToData,'utf-8')
                let products = JSON.parse(data)
                if(products.length===0){
                    let newProduct = Object.assign({id:1, timestamp:Date.now()},product)
                    await fs.promises.writeFile(pathToData, JSON.stringify([newProduct], null, 2)) 
                    return{status:"success", message:"New Product Created", id:1}
                }else{
                    let newId = products[products.length-1].id+1
                    product.id = newId
                    product.timestamp=Date.now()
                    products.push(product)
                    await fs.promises.writeFile(pathToData, JSON.stringify(products,null,2))
                    return{status:"success", message:"New Product Created", id:newId} 
                }
            }else{
                let newProduct = Object.assign({id:1, timestamp:Date.now()},product)
                await fs.promises.writeFile(pathToData, JSON.stringify([newProduct], null, 2)) 
                return{status:"success", message:"New Product Created", id:1}
            }
        }
        catch(error){
            return{status:"error", message:error}
        }
    }
    overwrite = async(product, id)=>{
        let data = await fs.promises.readFile(pathToData,'utf-8')
        let products = JSON.parse(data)
        let productsNotId = products.filter(u => u.id !== id)
        let newProduct = Object.assign({id:id},product)
        productsNotId.push(newProduct)
        await fs.promises.writeFile(pathToData, JSON.stringify(productsNotId,null,2))
        return{status:"success", message:"Product Modified", id:id}
    }
    getById = async(id)=>{
        if(fs.existsSync(pathToData)){
            let data = await fs.promises.readFile(pathToData,'utf-8')
            let products = JSON.parse(data)
            let product = products.find(u => u.id === id)
            if(product){
                return(product)
            }
            else{
                return{status:"error", error:"Product not found"}
            }
        }
    }
    getAll = async () =>{
        if(fs.existsSync(pathToData)){
            let data = await fs.promises.readFile(pathToData,'utf-8')
            let products = JSON.parse(data)
            return(products)
        }
    }
    deleteById = async (id) =>{
        if(!id){
            return{status:"error", error:"Id needed"}
        }
        if(fs.existsSync(pathToData)){
            let data = await fs.promises.readFile(pathToData,'utf-8')
            let products = JSON.parse(data)
            let newProducts = products.filter(u => u.id !== id)
            await fs.promises.writeFile(pathToData,JSON.stringify(newProducts,null,2))
            return{status:"success",message:"Product Deleted"}
        }
    }
    deleteAll = async () =>{
        if(fs.existsSync(pathToData)){
            let data = await fs.promises.readFile(pathToData,'utf-8')
            let products = JSON.parse(data)
            if(products==''){
                return{status:"error", error:"There are no Products"}
            }else{
                await fs.promises.writeFile(pathToData,'')
                return{status:"success",message:"All Products Deleted"}
            }
        }else{
            return{status:"error", error:"The file doesnt exist"}
        }
        
    }
}
module.exports = Container