const { DataTypes } = require("sequelize");
const db=require ("../data/config");


const Role = db.define("roles",{

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    
    
});

    // db.sync().then(()=>{
    //     console.log('Roles table created successfully');
    // }).catch((error)=>{
    //     console.error('Unable to create table: ', error);
    // })

module.exports=Role;