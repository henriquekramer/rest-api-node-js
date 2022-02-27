const express = require('express') 
const app = express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // só vamos aceitar dados simples
app.use(bodyParser.json()); // só vamos aceitar em formato json de entrada

app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*'); //Permissão de origem de controle de acesso, para todos '*', mas poderia ser 'http://servidorespecifico.com.br', ai no caso a minha API só seria acessivel por esse servidor
  res.header('Acess-Control-Allow-Header',
  'Origin, X-Requested-With ,Content-Type, Accept, Authorization'); // Agora vamos definir quais propriedades de cabeçalho/header vamos aceitar 
  if (res.method === "OPTIONS") {  //Qnd o client chama a API, é como se ele executasse uma chamada OPTIONS
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //Aqui iremos dizer quais tipos de opções que são aceitas
    return res.status(200).send({});
  }

  next();
})

app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  });
});

module.exports = app;   