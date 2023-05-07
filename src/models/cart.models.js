const { DataTypes } = require("sequelize");
const db=require ("../data/config");

const Cart = db.define("cart",{

    price:{
        type:DataTypes.STRING,
        allowNull:false
    },

})

module.exports = Cart;
