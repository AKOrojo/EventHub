const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const APIData = sequelize.define('APIData', {
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATE,
    },
    time: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    // Add other fields based on the external API data
});

module.exports = APIData;
