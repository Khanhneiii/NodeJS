const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_db','root','khanh54264',{dialect: 'mysql',host:'localhost'})

module.exports = sequelize;