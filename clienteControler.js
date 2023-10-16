const express = require('express');
const clienteModel=require('./clienteModel')

const app = express();
app.use(express.json());
app.use(express.static(__dirname+'/clienteView'));

// FRONTEND - Envia o HTML único
app.get('/cliente', async function(req, res) {
    res.sendFile(__dirname+'/clienteView/index.html');
});


//  BACKEND

//  busca os dados de um cliente se um id for passado ou
//  devolve todos os clientes caso para id seja recebido 'todos'
app.get('/cliente/:id', async function(req, res) {
  let clientes = await clienteModel.busca();
  res.status(200).send(clientes);
});

// insere um registro no BD
app.post('/cliente', async function(req, res) {
  try{
    let ret = await clienteModel.insere(req.body);
    res.sendStatus(201);
  }catch{
    res.sendStatus(500);
  }
});
  
// apaga um regitro.
app.delete('/cliente/:id', async function(req, res) {
  try{
    let ret = await clienteModel.delete(req.params.id);
    res.sendStatus(201);
  }catch{
    res.sendStatus(500);
  }
});

// altera um registro especifico 
app.put('/cliente', async function(req, res) {
  try{
    let ret = await clienteModel.altera(req.body);
    res.sendStatus(201);
  }catch{
    res.sendStatus(500);
  }
});

server = app.listen(8081,function (){
  var port = server.address().port;
  console.log('clienteControler escutando em http://localhost:%s', port);
});