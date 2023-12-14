const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('eventhub', 'appuser', 'app2027', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

