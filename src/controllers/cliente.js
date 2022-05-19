const { Cliente, Endereco } = require("../models");

const ClienteController = {
  index: async (req, res) => {
    try {
      const allClientes = await Cliente.findAll({ include: Endereco });

      res.json(allClientes);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  store: async (req, res) => {
    try {
      const {
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        data_nascimento,
        endereco = {},
      } = req.body;

      const { logradouro, numero, bairro, cidade, estado, cep } = endereco;

      const novoCliente = await Cliente.create(
        {
          nome,
          sobrenome,
          cpf,
          telefone,
          email,
          data_nascimento,
          Endereco: {
            logradouro,
            numero,
            bairro,
            cidade,
            estado,
            cep,
          },
        },
        { include: [Endereco] }
      );

      // await Endereco.create({
      //   logradouro,
      //   numero,
      //   bairro,
      //   cidade,
      //   estado,
      //   cep,
      //   cliente_id: novoCliente.codigo,
      // });

      res.json(novoCliente);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  show: async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await Cliente.findByPk(id, { include: Endereco });

      if (cliente) {
        return res.json(cliente);
      }

      res.status(404).json({
        message: "Cliente não encontrado",
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nome,
        sobrenome,
        cpf,
        telefone,
        email,
        data_nascimento,
        endereco = {},
      } = req.body;

      const { logradouro, numero, bairro, cidade, estado, cep } = endereco;

      const cliente = await Cliente.findByPk(id, { include: Endereco });

      if (!cliente) {
        res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      await Cliente.update(
        { nome, sobrenome, cpf, telefone, email, data_nascimento },
        { where: { codigo: id } }
      );

      if (cliente.Endereco?.codigo) {
        await Endereco.update(
          { logradouro, numero, bairro, cidade, estado, cep },
          { where: { codigo: cliente.Endereco.codigo } }
        );
      } else {
        await Endereco.create({
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          cep,
          cliente_codigo: id,
        });
      }

      const clienteAtualizado = await Cliente.findByPk(id, {
        include: Endereco,
      });

      res.json(clienteAtualizado);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
  destroy: async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        res.status(404).json({
          message: "Cliente não encontrado",
        });
      }

      await cliente.destroy();

      res.status(204).send("");
    } catch (error) {
      res
        .status(500)
        .json({ error: "Oops, tivemos um erro, tente novamente." });
    }
  },
};

module.exports = ClienteController;
