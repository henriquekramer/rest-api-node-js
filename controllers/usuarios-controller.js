const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.cadastrarUsuario = async (req, res, next) => {
  try {
    var query = 'SELECT * FROM usuarios WHERE email = ?';
    var result = await mysql.execute(query, [req.body.email]);

    if (result.length > 0) {
      res.status(409).send({ mensagem: 'Usuários já cadastrado'})
    };

    const hash = await bcrypt.hashSync(req.body.senha, 10);

    query = `INSERT INTO usuarios (email, senha) VALUES (?,?)`
    const results = await mysql.execute(query, [req.body.email, hash]);

    const response = {
      mensagem: 'Usuário criado com sucesso',
      usuarioCriado: {
        id_usuario: results.insertId,
        email: req.body.email
      }
    }
    return res.status(201).send(response);

  } catch (error) {
    return res.status(500).send({error: error})
  }
};

exports.Login = async (req, res, next) => {
  try {
    const query = `SELECT * FROM usuarios WHERE email = ?`
    var results = await mysql.execute(query, [req.body.email]);

    if (results.length < 1) { // aqui é pra qnd o email não existe
      return res.status(401).send({ mensagem: 'Falha na autenticação'})
    }

    if (await bcrypt.compareSync(req.body.senha, results[0].senha)){
      const token = jwt.sign({
        id_usuario: results[0].id_usuario, //o result é a consulta da tabela "SELECT * .."
        email: results[0].email
      }, 
      process.env.JWT_KEY,
      {
        expiresIn: "10h"
      });
      return res.status(200).send({
         mensagem: 'Autenticado com sucesso',
         token: token
        });
    }
    return res.status(401).send({ mensagem: 'Falha na autenticação'})

  } catch (error) {
    return res.status(500).send({ error: error })
  }
 };