const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const produtos = require('../database/produtos.json');

module.exports = {
  create(req, res) {
    const { nome, descricao, estoque, preco, foto } = req.body;
    produtos.push({
      id: randomUUID(),
      nome,
      descricao,
      estoque,
      preco,
      foto,
    });
    fs.writeFileSync(path.join(__dirname, '../database/produtos.json'), JSON.stringify(produtos));

    res.status(201).send();
  },

  find(req, res) {
    const { id } = req.params
    const produto = produtos.find(produto => produto.id === id);

    res.json(produto);
  },

  list(req, res) {
    res.json(produtos);
  },

  update(req, res) {
    const { id } = req.params;

    let produtoAtualizado = {};

    const listaAtualizada = produtos.map(produto => {
      if (produto.id === id) {
        produtoAtualizado = { ...produto, ...req.body };
        return produtoAtualizado;
      }

      return produto;
    });

    fs.writeFileSync(path.join(__dirname, '../database/produtos.json'), JSON.stringify(listaAtualizada));

    res.send(produtoAtualizado);
  },

  delete(req, res) {
    const { id } = req.params;

    const filtered = produtos.filter(produto => !(produto.id === id));

    fs.writeFileSync(path.join(__dirname, '../database/produtos.json'), JSON.stringify(filtered));

    res.send();
  }
}
