const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'danny123',
    database: 'blog'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connessione a MySQL riuscita!')
});

module.exports = connection;