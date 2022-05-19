const Genero = require("../models/Genero");

const GeneroController = {
  
  index: async (req, res) => {
    const allGeneros = await Genero.findAll();

    res.json(allGeneros);
  },

  store: async (req, res) => {
    const { nome } = req.body;
    const novoGenero = await Genero.create({ nome });

    res.json(novoGenero);
  },
  
  show: async (req, res) => {
    const { codigo } = req.params;

    const genero = await Genero.findByPk(codigo);

    if (genero) {
      return res.json(genero);
    }

    res.status(404).json({
      message: "Genero não encontrado",
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;

    const genero = await Genero.findByPk(id);

    if (!genero) {
      res.status(404).json({
        message: "Genero não encontrado",
      });
    }

    genero.nome = nome;
    await genero.save();

    res.json(genero);

    // await Genero.update({ nome }, { where: { codigo: id } });

    // res.json({ message: "Gênero atualizado com sucesso" });
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (!genero) {
      res.status(404).json({
        message: "Genero não encontrado",
      });
    }

    await genero.destroy();

    res.status(204).send("");
  },
};

module.exports = GeneroController;
