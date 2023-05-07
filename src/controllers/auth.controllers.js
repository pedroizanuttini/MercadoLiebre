const {response} = require('express');
const bcrypt = require('bcrypt');
const { UserContainer } = require('../helpers/userContainer');
const userContainer=new UserContainer('users.json');  

const User=require('../models/user.models');

const showLogin = (req,res=response) => {

    //si en las cookies ya existe la informacion del usuario.
    if(req.cookies.user){
        res.render('login', {user: req.cookies.user});
    }
    
    //si el usuario nunca antes se logeo o no selecciono el checkbox de "recordar usuario".
    return res.render('login',{user:null});
}

const showRegister = (req,res=response) => {
    res.render('register', {})
}

const createUser = async (req,res=response) => {
    console.log(req.file, req.body)
    const user = {...req.body,avatar: `${req.file.destination}/${req.file.filename}.png`}  //hago que el request body ahora aparezca todo junto.

    try{
        // validar Role
        const role=await Role.findOne({where:{name:req.body.role}})
        if(!role) return res.json({error:'El role no existe'})

        // encriptar la constrasena con bcrypt.
        const salt = bcrypt.genSaltSync();  //metodo para encryptar, por defecto repita la encriptacion 10 veces.
        user.password = bcrypt.hashSync(user.password, salt);  //esto es lo mismo que decir bcrypt.encriptar. Salt por default es 10 veces.

        const newUser=await User.create({
            ...user,
            roleId: role.id,
        });

        fs.unlinkSync(req.file.path); //unlinkSync va a buscar el archivo y lo elimina. Definimos donde se aloja el req.body.file con multer en el route.
        
        res.render('login',{user:null});

    }catch(error){
        console.log(error);
        return error;
    }
}

const login = async (req,res=response) =>{
    try{
        const user = await User.findOne({ where:{email}});   
        if(!user){
            return res.render('login', {errorMsg:'Invalid email'})   //como el atributo email se llama email pongo directamente email (sino seria email:email)
        }

        //confirmar si el password coincide con el password encriptado
        const validPassword = bcrypt.compareSync(req.body.password,user.password); //esto me compara la contrasena ingresada con la contrasena encriptada y me devuelve true or false.
        
        if(validPassword){
            // creamos una cookie, la mandamos al navegar y luego redireccionamos a /home.
            return res.cookie('user', {email:req.body.email, password: req.body.password}).redirect('/home');  //guardo el email y el password del user.
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