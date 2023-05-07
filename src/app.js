const express = require('express'); //importo express y traerme la libreria.
const path=require('path');
const cookieParser = require('cookie-parser');
const db=require('./data/config');
const { Sequelize } = require('sequelize');
const Role=require('./models/roles.models')

class App{
    app;
    port;
    apiPaths = {
        home:"/home",
        cart:"/cart",
        auth:"/auth",
        prod:"/products"
    };

    constructor(){
        this.app = express();
        this.port = 3000;

        // conexion con base de datos.
        // this.connectDDBB();

        //ejecucion de middlewares
        this.middlewares();
        this.routes();
        this.views();
    }

    // async connectDDBB(){
    //     try{
    //         await db.authenticate();
    //         await db.sync({ force:false }).then(()=>{
                // console.log('Roles table created successfully');
                // const roles= ['ADMIN_ROLE','USER_ROLE'];
                // roles.forEach((role)=>{
                //     Role.create({name:role})
                // const categories=['','',''];
                // });

            
            
//         }).catch((error)=> {
//             console.error('Unable to create table', error);
//         })
//         console.log('Connection has been established successfully.');
//     }   catch (error){
//         console.error('unable to connect to the database:', error);
//     }
// }

    middlewares(){
        // Esto es para la lectura del body.
        this.app.use(express.json());

        //parseo del body JSON ---> javascript.
        this.app.use(express.urlencoded({extended: true}));

        // parseo de las cookies
        this.app.use(cookieParser());

        //directorio publico
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.home, require('./routes/index.routes'));
        this.app.use(this.apiPaths.auth, require('./routes/auth.routes'));
        this.app.use(this.apiPaths.cart, require('./routes/carrito.routes'));
        this.app.use(this.apiPaths.prod, require('./routes/products.routes'));
    }


    views(){
        //Ubicacion de las vistas.
        this.app.set("views", path.join(__dirname, "../views"));
        //definicion del motor de plantillas
        this.app.set("view engine","ejs");
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = {
    App
}



//const express = require('express'); //importo express y traerme la libreria.
//const app= express();  //devuelve una aplicacion express que se guarda en esta constante app.

//app.use(express.static('public'));

//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/views/home.html')
//});

//app.get('/registration', (req, res) => {
//    res.sendFile(__dirname + '/views/registration.html')
//});

//app.get('/login', (req, res) => {
  //  res.sendFile(__dirname + '/views/login.html')
//});

//app.get('/carrito', (req, res) => {
  //  res.sendFile(__dirname + '/views/carrito.html')
//});

//app.listen(3000, () => {
  //  console.log('Servidor corriendo en el puerto 3000')
//});  //le voy a decir a la aplicacion que estoy levantando el servidor en un puerto.
