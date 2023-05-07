const {response} = require('express');

const showHome = (req,res) => {
    console.log(`Se ejecuta controlador`)
    return res.render('home', {})
}

module.exports = {
    showHome,
}