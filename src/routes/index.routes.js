const {Router} = require('express');
const{showHome}= require('../controllers/index.controllers');

const router = Router();


console.log('se inicia ruta de home')

router.get('', showHome) //http://localhost:3000/home GET


module.exports = router;
