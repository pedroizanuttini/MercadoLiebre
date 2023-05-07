const {Router} = require('express');
const { check }=require('express-validator');
const{showLogin, showRegister, createUser, login}= require('../controllers/auth.controllers');
const multer = require ('multer'); //instancio multer
const upload = multer({dest: './public/uploads' }) //defino la carpeta de destino donde pongo las imagenes.
const { fieldValidator}=require('../middlewares/fields-validators');

const router = Router();

router.get('/login', showLogin) //http://localhost:3000/auth/login
router.get('/register',showRegister) //http://localhost:3000/auth/register

router.post('/new', upload.single('avatar'), createUser) //http://localhost:3000/auth/new    //upload.single() se usa para definir el nombre del campo donde viene el archivos. En este caso es el avatar.
router.post('/login',[
    check('email','el nombre del campo es obligatorio').not().isEmpty(),
    check('email','el valor ingresado no es un email valido').isEmail(),
    check('password','la contrasena es obligatoria').not().isEmpty(),
    check('password','la contasena debe tener entre 6 y 12 caracteres').isLength({ min: 6,max:12 }),
    fieldValidator
    ], login) //http://localhost:3000/auth/login

module.exports = router;