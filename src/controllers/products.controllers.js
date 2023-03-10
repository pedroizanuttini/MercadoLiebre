const {response} = require('express');
const {Container} = require('../helpers/container');

const container =new Container('products.json');

const showProducts = async (req, res=response) =>{
    const products= await container.getAllProducts();
    console.log(products);
    res.render('./products/productlist', { products })
}

const showProductsFormEdit= async (req,res=response) => {
    const {id} =req.params

    if(id){ //para editar
        const product = await container.getProductById(id);  //si no existe el id devuelve undefined.
        console.log(product);
        if(!product){
            return res.redirect('/products');
        }
        res.render('./products/productsform',{ product }); 
    }else{ //para crear
        res.render('./products/productsform', { product:null});
    }
}

const showProductDetail= async(req,res)=> {
    res.render('./products/productdetail', {})
}



const createProduct= async(req, res)=> {
    const result=await container.createProduct(req.body);
    const products=await container.getAllProducts();
    
    if(result){
        console.log(products);
        return res.render('./products/productlist', { products });
    }else {
        return res.render('/products/productsform', {products:null});

    }
}







const updateProduct= (req, res)=> {
    return; 
}


//http://localhost:3000/products/:id
const deleteProduct= async(req, res)=> {
    
    const result=await container.deleteProductById(req.params.id);
    console.log(result)
    if(result){
        return res.status(200).json({
            ok:true,
            data: result
        })
    }else{
        return res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        })
    }
}



module.exports = {
   showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct
}