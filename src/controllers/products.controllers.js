const {response} = require('express');

const showProductsForm= (req,res) => {
    res.render('./products/productsform', {})
}

module.exports = {
   showProductsForm
}