const { DataTypes } = require("sequelize");

const db = require("../database");
const Cliente = require("./Cliente");

const Endereco = db.define(
"Endereco",
{
codigo: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
},
logradouro: {
type: DataTypes.STRING,
allowNull: false,
},
numero: {
type: DataTypes.STRING,
allowNull: false,
},
bairro: {
type: DataTypes.STRING,
allowNull: false,
},
cidade: {
type: DataTypes.STRING,
allowNull: false,
},
estado: {
type: DataTypes.STRING,
allowNull: false,
},
cep: {
type: DataTypes.STRING,
allowNull: false,
},

cliente_codigo: {
    type: DataTypes.INTEGER,
    References: {
      model: Cliente,
      key: "codigo",
    },
    unique: true,
},
},
{ tableName: "endereco", timestamps: false, underscored: true, }
);

module.exports = Endereco; 
