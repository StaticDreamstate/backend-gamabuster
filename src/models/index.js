const Filme = require("./Filme");
const Genero = require("./Genero");
const Endereco = require("./Endereco");
const Cliente = require("./Cliente");
const FilmeGenero = require ("./FilmeGenero");

Cliente.hasOne(Endereco);
Endereco.belongsTo(Cliente, {
    foreignkey: "cliente_codigo",
});

Filme.belongsToMany(Genero, { foreignkey: "filme_codigo", through: FilmeGenero });
Genero.belongsToMany(Filme, { foreignkey: "genero_codigo", through: FilmeGenero });

module.exports = {
    Filme,
    Genero,
    Endereco,
    Cliente,
};
