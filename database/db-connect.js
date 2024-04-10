var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'srv507226',
    user: 'root@localhost',
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
