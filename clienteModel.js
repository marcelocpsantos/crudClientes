const {Sequelize, DataTypes} = require('sequelize');

const teste = new Sequelize('teste', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });

  const Cliente = teste.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement:true
    },
    nome: {
      type: DataTypes.STRING
    },
    idade: {
        type: DataTypes.INTEGER
      }
  }, {
    // Other model options go here
  });
  teste.sync();
  //Cliente.create({ nome: "Marcelo Santos", idade: 56 });
  //Cliente.create({ nome: "Maria Beatriz", idade: 57 });

class clienteModel {
    busca(){
        return Cliente.findAll();
    }

    insere(cliente){
        return Cliente.create(cliente);
    }

    delete(id){
        return Cliente.destroy({where: {id: id} });
    }
    altera(cliente){
        return Cliente.update(cliente, {
            where: { id: cliente.id }
        });
    }

}

module.exports = new clienteModel();