const { DataTypes } = require("sequelize");
const db=require ("../data/config");


const User = db.define("users",{

    fname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lname:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    remember:{
        type: DataTypes.STRING,
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

module.exports = User;

