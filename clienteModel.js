const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'teste'
});
class clienteModel {
    busca(id){
        if(id=='todos') var sql='SELECT * FROM cliente';
        else            var sql='SELECT * FROM cliente WHERE id='+id;
        return new Promise((resolve,reject)=>{
            conn.query(sql,
                function(err, results) {
                    if(err)return reject(err)
                    return resolve(results); // results contains rows returned by server
                }
            )
        })
    }
    insere(cliente){
        const sql="INSERT INTO cliente (nome,idade) VALUES ('"+cliente.nome+"',"+cliente.idade+");";
        return new Promise((resolve)=>{
            conn.query(sql,
                function(err, results) {
                    return resolve(results); // results contains rows returned by server
                }
            );
        })
    }
    delete(id){
        const sql = 'DELETE FROM cliente WHERE id = '+id;
        return new Promise((resolve)=>{
            conn.query(sql,
                function(err, results) {
                    return resolve(results); // results contains rows returned by server
                }
            )
        })
    }
    altera(cliente){
        let id=cliente.id;
        let nome=cliente.nome;
        let idade=cliente.idade;
        const sql = "UPDATE cliente SET nome = '"+nome+"', idade = '"+idade+"' WHERE id = "+id+";"
        return new Promise((resolve)=>{
            conn.query(sql,
                function(err, results) {
                    return resolve(results); // results contains rows returned by server
                }
            )
        })
    }

}

module.exports = new clienteModel();