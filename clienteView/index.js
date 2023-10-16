var clientes;

async function buscaTabClientes(){
    let ret = await fetch('/cliente/todos', {method: 'GET'});
    ret.json().then(function (clientesRet){
        clientes=[];
        let tab = '';
        clientesRet.forEach(cliente => {
            tab += '<tr>';
            tab += '<td>'+cliente.nome+'</td>';
            tab += '<td>'+cliente.idade+'</td>';
            tab += '<td><button onClick="deleta('+cliente.id+')">APAGA</button></td>';
            tab += '<td><button onClick="altMostraJanela('+cliente.id+')">ALTERA</button></td>';
            clientes[cliente.id]=cliente;
        });
        let tabClientes=document.getElementById('tabClientes');
        tabClientes.innerHTML=tab;
    });
}

function altMostraJanela(id){
    iptId.value=id;
    iptNome.value=clientes[id].nome;
    iptIdade.value=clientes[id].idade;
    divAltera.style.display='block';
}

function altDesiste(){
    document.getElementById('divAltera').style.display='none'
}

async function altEnvia(){
    let cliente={
        id : iptId.value,
        nome : iptNome.value,
        idade : iptIdade.value
    };
    
    let ret = await fetch('/cliente',  {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente),
    })
    if(ret.status<300){
        alert('Registro alterado.')    
        buscaTabClientes();
    }else{
        alert('Falha na alteracao.')
    }
    altDesiste();
    buscaTabClientes();
}

async function insere(event){
    event.preventDefault();
    let cliente = {
        nome : document.getElementById('nome').value,
        idade: document.getElementById('idade').value
    }
    
    let ret = await fetch('/cliente',  {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cliente),
    });
    console.log(ret);
    if(ret.status<300){
        alert('Registro inserido.')    
        buscaTabClientes();
    }else{
        alert('Falha na inserção do registro.')
    }
    return false;
}

async function deleta(id){
    let ret = await fetch('/cliente/' + id,  {method: 'DELETE'});
    if(ret.status<300){
        alert('Registro apagado.')    
        buscaTabClientes();
    }else{
        alert('Falha na deleção do registro.')
    }
    buscaTabClientes();
}

