const {Router} = require('express');
const{showCart}= require('../controllers/carrito.controllers');

const router = Router();

router.get('/', showCart) //http://localhost:3000/cart

module.exports = router;