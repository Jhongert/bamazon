var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'jhon4bmd',
	port: 3306,
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;

	start();
});

function start(){
	inquirer.prompt([
		{
			type: 'rawlist',
			name: 'choice',
			message: 'Please choose a task:',
			choices: ['View Products Sales by Department', 'Create New Department']
		}
	]).then(function(answer){
		if(answer.choice.toLowerCase() == 'view products sales by department'){
			viewProductsSales();
		} else {
			newDepartment();
		}
	});
}

function viewProductsSales(){
	connection.query('SELECT a.department_id, a.department_name, a.over_head_cost, sum(b.product_sales)' +
	 	' AS product_sales, (sum(b.product_sales) - a.over_head_cost) AS total_profit FROM departments AS a' +
	 	' INNER JOIN products AS b ON a.department_id = b.department_id GROUP BY department_id', 
	 	function(err, results){
			if(err) throw err;

			console.table(results);
		});

}

function newDepartment(){
	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter department name:',
			validate: function(value){
				return value.trim() != '';
			}
		}, {
			type: 'input',
			name: 'overHeadCost',
			message: 'Enter the Over Head Cost:',
			validate: function(value){
				if(!isNaN(value) && parseFloat(value) > 0){
					return true;
				}
				return 'Please enter a number greater than 0.';
			}
		}
	]).then(function(answers){
		connection.query('INSERT INTO departments SET ?',
			{
				department_name: answers.name,
				over_head_cost: parseFloat(answers.overHeadCost)
			}, function(err){
				if(err) {
					console.log(err);
					throw err;
				}
				console.log('\n****** Department Added successfully ******\n');
				start();
			}
		);
	});
}