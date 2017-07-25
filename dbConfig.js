var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'jhon4bmd',
	port: 3306,
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;
});

module.exports = connection;