var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '91.108.102.28',
    user: 'root',
    password: 'pedro',
    database: 'nodeProd'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('Connected to DB.');
});

module.exports = { connection: connection };
