const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: true, 
});

module.exports = Event;
