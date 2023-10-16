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
  let clientes = await clienteModel.busca(req.params.id);
  res.status(200);
  res.send(clientes);
});

// insere um registro no BD
app.post('/cliente', async function(req, res) {
  let ret = await clienteModel.insere(req.body);
  if(ret.affectedRows<1) {
    res.sendStatus(500);
  }else{
    res.sendStatus(201);
  }
});
  
// apaga um regitro.
app.delete('/cliente/:id', async function(req, res) {
  let ret = await clienteModel.delete(req.params.id);
  if(ret.affectedRows<1) {
    console.log(ret); // results contains rows returned by server
    res.sendStatus(500);
  }else{
    res.sendStatus(201);
  }
});

// altera um registro especifico 
app.put('/cliente', async function(req, res) {

  let ret = await clienteModel.altera(req.body);
  if(ret.affectedRows<1) {
    console.log(ret); // results contains rows returned by server
    res.sendStatus(500);
  }else{
    res.sendStatus(201);
  }
});

server = app.listen(8081,function (){
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});