const {response} = require('express');
const bcrypt = require('bcrypt');
const { UserContainer } = require('../helpers/userContainer');
const userContainer=new UserContainer('users.json');  




const showLogin = (req,res=response) => {
    res.render('login', {})
}

const showRegister = (req,res=response) => {
    res.render('register', {})
}

const createUser = async (req,res=response) => {
    console.log(req.file, req.body)
    const user = {...req.body,avatar: `${req.file.destination}/${req.file.filename}.png`}  //hago que el request body ahora aparezca todo junto.

    try{

        // encriptar la constrasena con bcrypt.
        const salt = bcrypt.genSaltSync();  //metodo para encryptar, por defecto repita la encriptacion 10 veces.
        user.password = bcrypt.hashSync(user.password, salt);  //esto es lo mismo que decir bcrypt.encriptar. Salt por default es 10 veces.

        const newUser=await userContainer.createUser(user);
        return res.render('login',{});
    }catch(error){
        console.log(error);
        return error;
    }
}

const login = async (req,res=response) =>{
    try{
        const user = await userContainer.getUserByEmail(req.body.email);
        if(!user){
            return res.render('login', {errorMsg:'Invalid email'})
        }

        //confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(req.body.password,user.password) //esto me compara la contrasena ingresada con la contrasena encriptada y me devuelve true or false.
        if(validPassword){
            return res.render('home',{ user })
        }else{
            return res.render('login', {errorMsg: 'Invalid password' })
        }


    }catch{
        console.log(error);
        return res.render('login', {errorMsg: 'server error'})

    }
}

module.exports = {
    showLogin,showRegister,createUser,login
}