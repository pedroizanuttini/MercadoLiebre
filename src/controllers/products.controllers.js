const {response} = require('express');
const {Container} = require('../helpers/container');

const container =new Container('products.json');

const showProducts = async (req, res=response) =>{
    const products= await container.getAllProducts();
    console.log(products);
    res.render('./products/productlist', { products })
}

const showProductsFormEdit= (req,res) => {
    res.render('./products/productsform', {})
}

const showProductDetail= (req,res)=> {
    res.render('./products/productdetail', {})
}

const createProduct= (req, res)=> {
    return; 
}

const updateProduct= (req, res)=> {
    return; 
}

const deleteProduct= (req, res)=> {
    return; 
}



module.exports = {
   showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}