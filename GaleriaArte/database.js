const mysql = require('mysql2/promise')

const{database} = require('./keys')

const pool = mysql.createPool(database)

console.log('conexion con la base de datos correctamente')


module.exports = {
    query: (...args) => pool.query(...args).finally(() => pool.release()),
  };

// module.exports = pool