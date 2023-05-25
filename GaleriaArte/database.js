const mysql = require('mysql2/promise')

const{database} = require('./keys')

const pool = mysql.createPool(database)

const hola = async () => {

    const [result] = await pool.query("show tables;")

    console.log(result)
}

hola()

module.exports = pool