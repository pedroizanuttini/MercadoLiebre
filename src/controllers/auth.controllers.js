const {response} = require('express');


const showLogin = (req,res) => {
    res.render('login', {})
}

const showRegister = (req,res) => {
    res.render('register', {})
}

module.exports = {
    showLogin,showRegister
}