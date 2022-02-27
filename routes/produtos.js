const express = require('express');
const router = express.Router();

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next)=> {
  res.status(200).send({   // 200 OK
    mensagem: 'Retorna todos os produtos'
  })
});

// INSERE UM PRODUTO
router.post('/', (req, res, next)=> {
  const produto = {
    nome: req.body.nome,
    preco: req.body.preco
  }

  res.status(201).send({     // 201 = created
    mensagem: 'Insere um produto',
    produtoCriado: produto
  })
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next)=> {
  const id = req.params.id_produto // ele irá captar o id do produto que eu passei

  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Você está usando um ID especial', 
      id: id // vai retornar o id
    });
  } else {
    res.status(200).send({
      mensagem: 'Usando o GET de um produto exclusivo', 
      id: id // vai retornar o id
    });
  }
});
      
// ALTERA UM PRODUTO
router.patch('/', (req, res, next)=> {
  res.status(200).send({     
    mensagem: 'Produto alterado'
  })
});


// DELETA UM PRODUTO
router.delete('/', (req, res, next)=> {
  res.status(200).send({     
    mensagem: 'Produto excluído'
  })
});

module.exports = router; //para exportar o router