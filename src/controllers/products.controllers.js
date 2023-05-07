const {response} = require('express');
const {Container} = require('../helpers/container');
const Product = require('../models/product.models');

const container =new Container('products.json');

const showProducts = async (req, res=response) =>{
    // const {id} =req.params;

    // const products= await container.getAllProducts(id);
    // console.log(products);
    // res.render('./products/productlist', { products });
    try{
        const products=findAll(Product);
        res.render("./products/productdetail",{products}); 
    }catch(error){
        return res.status(500).json({
            error:'Internal server error'
        })
    }
    
}

const showProductDetail= async (req,res=response) => {
    const {id} =req.params;

    const product= await container.getProductById(id);
    res.render('./products/productdetail', { product })
}

const showProductsFormEdit= async (req,res=response) => {
    const {id} =req.params

    if(id){ //para editar
        const product = await container.getProductById(id);  //si no existe el id devuelve undefined.
        console.log(product);
        
        if(product){
           return res.render('./products/productsform',{ product }); 
        }

        return res.render('./products/productsform', { product:null}); 
    }else{ //para crear
        return    res.render('./products/productsform', { product:null});
    }
}




const createProduct= async(req, res=response)=> {
    
    console.log(req.file,req.body);
    const product={...req.body,avatar:`${req.file.destination}/${req.file.filename}.png`};
    
    // const result=await container.createProduct(req.body);
    // const products=await container.getAllProducts();
    
    // if(result){
    //     console.log(products);
    //     return res.render('./products/productlist', { products });
    // }else {
    //     return res.render('./products/productlist', {products:null});

    // }
}



const updateProduct= async(req, res)=> {
    const products=await container.getAllProducts();
    
    const { id } = req.params;
    if(!id) return res.redirect('/products'); //este es el caso en que no ponga en la ruta el id.
    
    const result = await container.updateProduct(id, req.body);
    
    if(result){
        return res.redirect('/products');
    }else{
        return res.render('./products/productsform', { product:null});
    }
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