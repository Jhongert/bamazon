/*
	Running this application will list 2 menu options
  	View Product Sales by Department and Create New Department
*/

//requires modules
var inquirer = require('inquirer');
var table = require('console.table');
var colors = require('colors');
var connection = require('./dbConfig');

//Prompt the user to choose a option
function start(){
	console.log('\n');

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

//Display a summarized table in the terminal/bash window
function viewProductsSales(){
	var query = 'SELECT departments.department_id, departments.department_name, departments.over_head_cost, ';
		query += 'sum(products.product_sales) AS product_sales, ';
		query += '(sum(products.product_sales) - departments.over_head_cost) AS total_profit ';
		query += 'FROM departments LEFT JOIN products ON departments.department_id = products.department_id ';
		query += 'GROUP BY department_id';

	connection.query(query, function(err, results){
			if(err) throw err;

			console.log('\n');
			console.table(results);
			start();
		});

}

//Allow supervisors to create a new department
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
				return colors.red('Please enter a number greater than 0.');
			}
		}
	]).then(function(answers){
		//insert new department into database
		connection.query('INSERT INTO departments SET ?',
			{
				department_name: answers.name,
				over_head_cost: parseFloat(answers.overHeadCost)
			}, function(err){
				if(err) throw err;
				
				console.log(colors.green('\n****** Department Added successfully ******'));
				start();
			}
		);
	});
}
start();