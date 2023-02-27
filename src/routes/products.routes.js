const {Router} = require('express');
const{showProductsForm}= require('../controllers/products.controllers');

const router = Router();

router.get('/new', showProductsForm) //http://localhost:3000/products

module.exports = router;

