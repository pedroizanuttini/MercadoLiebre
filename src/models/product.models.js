const { DataTypes } = require("sequelize");
const db=require ("../data/config");


const Product = db.define("products",{

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    image:{
        type:DataTypes.TEXT('long'),
        allowNull:false,
    },
    price:{
        type: DataTypes.DOUBLE,
        allowNull:false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    createdAt:{
        type: DataTypes.DATE,
    },
    updatedAt:{
        type: DataTypes.DATE,
    }

})

// db.sync().then(()=>{
//     console.log('Roles table created successfully');
// }).catch((error)=>{
//     console.error('Unable to create table: ', error);
// })

module.exports = Product;