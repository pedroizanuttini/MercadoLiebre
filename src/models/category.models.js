const { DataTypes } = require("sequelize");
const db=require ("../data/config");

const Category = db.define("categories",{

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

// db.sync().then(()=>{
//     console.log('Roles table created successfully');
// }).catch((error)=>{
//     console.error('Unable to create table: ', error);
// })


module.exports = Category;