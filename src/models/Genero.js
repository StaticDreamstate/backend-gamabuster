//Tabela "Produtos" do Bando de Dados

const db = require("../database");
const { DataTypes } = require("sequelize");

const Genero = db.define("Genero", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },

    nome: {
        type: DataTypes.STRING,
      
    },

    createdAt: { type: DataTypes.DATE },

    updatedAt: { type: DataTypes.DATE },

    tableName: "genero",

});

module.exports = "Genero";