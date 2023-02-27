const {response} = require('express');

const showHome = (req,res) => {
    res.render('home', {})
}

module.exports = {
    showHome,
}