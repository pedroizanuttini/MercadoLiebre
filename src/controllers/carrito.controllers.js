const {response} = require('express');

const showCart= (req,res) => {
    res.render('carrito', {})
}


module.exports = {
    showCart
}