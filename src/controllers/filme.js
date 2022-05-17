const Filme = require("../models/Filme");

const FilmeController = {
  
  index: async (req, res) => {
    const allFilmes = await Filme.findAll();
    res.json(allFilmes);
  },

  store: async (req, res) => {
    
    const { nome, ano_lancamento, duracao, estoque } = req.body;
    const novoFilme = await Filme.create({ nome, ano_lancamento, duracao, estoque });

    res.json(novoFilme);
 
  },

  show: async (req, res) => {
    const { codigo } = req.params;
    const filme = await Filme.findByPk(codigo);

    if (filme) {
      return res.json(filme);
    }
    res.status(404).json({
      message: "Filme não encontrado",
    });
  },

  update: async (req, res) => {
    const { codigo } = req.params;
    const { nome, ano_lancamento, duracao, estoque } = req.params;

    const filme = await Filme.findByPk(codigo);

    if (!filme) { 
      res.status(404).json({
      message: "Filme não encontrado",
      })
    }

    await Filme.update(
      {nome, ano_lancamento, duracao, estoque},
      {where: {codigo: codigo}},
    );
    
    const filmeAtualizado = await Filme.findByPk(codigo);
    res.json(filmeAtualizado);
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
