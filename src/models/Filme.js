
const { DataTypes } = require("sequelize");
const db = require("../database");

const Filme = db.define("Filme", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ano_lancamento: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    duracao: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },

    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0,

    },

    createdAt: { type: DataTypes.DATE },

    updatedAt: { type: DataTypes.DATE },

    tableName: "filme",

});

module.exports = "Filme";