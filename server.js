const http = require('http'); // importar para o nosso projeto o http

const app = require('./app') // estou importando o app, não precisamos por .js, o próprio Node entende, agora vamos jogar esse app dentro do const server = http.createServer(app)

const port = process.env.PORT || 3000  // variável para armazenar a porta do nosso serviço, se a variável não tiver preenchida ela pegará por padrão a 3000
 const server = http.createServer(app); //agora criamos nosso server
 
 server.listen(port); // ele ficará ouvindo nossa porta

 