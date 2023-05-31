const mysql = require('mysql2/promise')

const{database} = require('./keys')

const pool = mysql.createPool(database)

console.log('conexion con la base de datos correctamente')


// module.exports = {
//     query: (...args) => {
//       return new Promise((resolve, reject) => {
//         pool.query(...args)
//           .then(([result]) => resolve(result))
//           .catch(reject)
//           .finally(() => {
//             pool.end(); // Cierra el pool de conexiones
//           });
//       });
//     },
//   };

module.exports = pool