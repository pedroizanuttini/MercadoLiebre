const {Router} = require('express');
const{showLogin, showRegister, createUser, login}= require('../controllers/auth.controllers');
const multer = require ('multer'); //instancio multer
const upload = multer({dest: './public/uploads' }) //defino la carpeta de destino donde pongo las imagenes.


const router = Router();

router.get('/login', showLogin) //http://localhost:3000/auth/login
router.get('/register',showRegister) //http://localhost:3000/auth/register

router.post('/new', upload.single('avatar'), createUser) //http://localhost:3000/auth/new    //upload.single() se usa para definir el nombre del campo donde viene el archivos. En este caso es el avatar.
router.post('/login', login) //http://localhost:3000/auth/login

module.exports = router;