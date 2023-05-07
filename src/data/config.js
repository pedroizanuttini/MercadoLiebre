//Aca hacemos toda la conexion que nos va a requerir sequilize.

const { Sequelize } = require("sequelize");

const db = new Sequelize('Mercadoliebre', 'root',null, {
    host:'localhost',
    dialect:'mysql',
})


module.exports= db


//Associations
 const User=require('../models/user.models');
 const Product= require('../models/product.models');
 const Category= require('../models/category.models');
 const Role = require('../models/roles.models');
 const Cart = require('../models/cart.models');

User.belongsTo(Role);
Product.belongsTo(Category);

// Role.hasMany(User),
// User.belongsTo(Role,{
//     foreignKey:'RoleId',
//     as:"role"
// });

// Category.hasMany(Product),
// Product.belongsTo(Category,{
//     foreignKey:'categoryId',
//     as:"category"
// });



