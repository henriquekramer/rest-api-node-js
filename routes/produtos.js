const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProdutosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    let data = new Date().toISOString().replace(/:/g, '-') + '-';
    cb(null, data + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // até 5MB cada imagem
  },
  fileFilter: fileFilter
});

//RETORNA TODOS OS PRODUTOS
router.get('/', ProdutosController.getProdutos);

// INSERE UM PRODUTO
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProduto);

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', ProdutosController.getUmProduto);
      
// ALTERA UM PRODUTO
router.patch('/', login.obrigatorio, ProdutosController.updateProduto);

// DELETA UM PRODUTO
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

// IMAGENS
router.post('/:id_produto/imagem', login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postImagem);
router.get('/:id_produto/imagens', ProdutosController.getImagens);


module.exports = router; //para exportar o router