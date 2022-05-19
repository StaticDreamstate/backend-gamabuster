const { Op } = require("sequelize");

const { Filme, Genero } = require("../models");

const FilmeController = {
  index: async (req, res) => {
    try {
      const allFilmes = await Filme.findAll({ include: Genero });

      res.json(allFilmes);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  store: async (req, res) => {
    try {
      const { nome, ano_lancamento, estoque, duracao, generos = [] } = req.body;

      const novoFilme = await Filme.create({
        nome,
        ano_lancamento,
        estoque,
        duracao,
      });

      const generosData = await Genero.findAll({
        where: { codigo: { [Op.in]: generos } },
      });

      await novoFilme.setGeneros(generosData);

      const filmeCriado = await Filme.findByPk(novoFilme.codigo);

      res.json(filmeCriado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },

  show: async (req, res) => {
    try {
      const { codigo } = req.params;

      const filme = await Filme.findByPk(codigo, { include: Genero });

      if (filme) {
        return res.json(filme);
      }

      res.status(404).json({
        message: "Filme não encontrado",
      });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  
  update: async (req, res) => {
    try {
      const { codigo } = req.params;
      const { nome, ano_lancamento, estoque, duracao, generos } = req.body;

      const filme = await Filme.findByPk(codigo);

      if (!filme) {
        res.status(404).json({
          message: "Filme não encontrado",
        });
      }

      await Filme.update(
        { nome, ano_lancamento, estoque, duracao },
        { where: { codigo: codigo } }
      );

      if (Array.isArray(generos)) {
        const generosData = await Genero.findAll({
          where: { codigo: { [Op.in]: generos } },
        });

        await filme.setGeneros(generosData);
      }

      const filmeAtualizado = await Filme.findByPk(codigo, { include: Genero });

      res.json(filmeAtualizado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  destroy: async (req, res) => {
    const { codigo } = req.params;
    const filme = await Filme.findByPk(codigo);

    if (!filme) {
      res.status(404).json({
        message: "Filme não encontrado",
      });
    }

    await filme.destroy();

    res.status(204).send("");
  },
};


module.exports = FilmeController;
