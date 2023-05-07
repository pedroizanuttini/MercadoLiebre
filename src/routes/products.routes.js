const {Router} = require('express');
const{showProductsFormEdit, showProducts, showProductDetail, createProduct, updateProduct, deleteProduct}= require('../controllers/products.controllers');
const multer = require ('multer'); //instancio multer
const upload = multer({dest: './public/uploads' }) //defino la carpeta de destino donde pongo las imagenes.

const router = Router();


router.get('/', showProducts) //http://localhost:3000/products
router.get('/new', showProductsFormEdit) //http://localhost:3000/products/new
router.get('/:id', showProductDetail) //http://localhost:3000/products/:id

router.post('/', upload.single('avatar'), createProduct) //http://localhost:3000/products

router.get('/:id/edit', showProductsFormEdit) //http://localhost:3000/products/:id/edit
router.post('/:id/edit', updateProduct) //http://localhost:3000/products/:id
router.delete('/:id', deleteProduct) //http://localhost:3000/products/:id

 
module.exports = router;

