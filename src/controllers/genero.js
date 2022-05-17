const Genero = require("../models/Genero")

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
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (genero) {
      return res.json(genero);  
    }

    res.status(404).json({
      message: "Gênero não encontrado",
    })

  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    
    const genero = await Genero.findByPk(id);

    if (!genero) { 
      res.status(404).json({
      message: "Gênero não encontrado",
      })
    }

    genero.nome = nome;
    await genero.save();

    res.json(genero);
  },
  
  destroy: async (req, res) => {
    const { id } = req.params;
    const genero = await Genero.findByPk(id);

    if (!genero) { 
      res.status(404).json({
      message: "Gênero não encontrado",
      })
    }

    await genero.destroy();
    res.status(204).send("");
  },
};

module.exports = GeneroController;
