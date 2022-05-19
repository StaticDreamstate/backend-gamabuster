const { DataTypes } = require("sequelize");

const db = require("../database");

const FilmeGenero = db.define(
  "filme_genero",
  {},
  { tableName: "filme_genero", timestamps: false, underscored: true }
);

module.exports = FilmeGenero;
