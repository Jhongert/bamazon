var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('console.table');
var colors = require('colors');

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
			message: 'Please choose a task.',
			choices:['View products', 'View low inventory','Add to inventory', 'Add new product']
		}
	]).then(function(answer){
		switch(answer.choice.toLowerCase()){
			case 'view products':
				viewProducts();
				break;
			case 'view low inventory':
				viewLowInventory();
				break;
			case 'add to inventory':
				addInventory();
				break;
			case 'add new product':
				newProduct();
				break;

		}
	});
}

function viewProducts(){
	connection.query('SELECT * FROM products', function(err, results){
		if(err) throw err;

		console.log('\n');
		console.table(results);
		start();
	});
	
}

function viewLowInventory(){
	connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, results){
		if(err) throw err;

		console.log('\n********************************************');

		if(results.length > 0)
			console.table(results);
		else{
			console.log(colors.red('No products with low inventory at this time.'));
			console.log('********************************************\n');
		}
		start();
	});
}

function addInventory(){
	var curItem;
	connection.query('SELECT * FROM products', function(err, results){
		if(err) throw err;

		console.log('\n');
		console.table(results);

		inquirer.prompt([
			{
				type: 'input',
				name: 'itemId',
				message: 'Plese enter the ID of the Item.',
				validate: function(value){
					for(var i = 0; i < results.length; i++){
						if(parseInt(value) == results[i].item_id){
							curItem = results[i];
							return true;
						}
					}
					return colors.red('Please enter a valid Item id.');
				}
			},{
				type: 'input',
				name: 'quantity',
				message: 'How many units would you like to add?',
				validate: function(value){
					if(!isNaN(value) && parseInt(value) > 0 && parseInt(value) == value){
						return true;
					}
					return colors.red('Please enter a whole number greater than 0.');
				}
			}
		]).then(function(answer){
			var newQuantity = curItem.stock_quantity + parseInt(answer.quantity);
			connection.query('UPDATE products SET ? WHERE ?',
				[{
					stock_quantity: newQuantity
				}, {
					item_id: answer.itemId
				}], function(err, res){
						if(err) throw err;

						console.log(colors.green('\n****** Inventory Added successfully ******\n'));
						start();
					}
			);
		});
	});
}

function newProduct(){
	var departments = [];

	connection.query('SELECT * FROM departments', function(err, results){
		if(err) throw err

		departments = results;
	})

	inquirer.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Enter product name:',
			validate: function(value){
				return value.trim() != '';
			}
		}, {
			type: 'input',
			name: 'price',
			message: 'Enter the price of the product:',
			validate: function(value){
				if(!isNaN(value) && parseFloat(value) > 0){
					return true;
				}
				return colors.red('Please enter a number greater than 0.');
			}
		}, {
			type: 'input',
			name: 'quantity',
			message: 'Enter initial stock quantity:',
			validate: function(value){
				if(!isNaN(value) && parseInt(value) > 0 && parseInt(value) == value){
					return true;
				}
				return colors.red('Please enter a whole number greater than 0.');
			}
		 }, {
			type: 'rawlist',
			name: 'department',
			message: 'Choose the Department',
			choices: function(){
				var choicesArr = [];
				
				for(var i = 0; i < departments.length; i++)
					choicesArr.push(departments[i].department_name);
				return choicesArr;
			}
		}

	]).then(function(answers){
		var departmentId;

		for(var i = 0; i < departments.length; i++){
			if(departments[i].department_name == answers.department){
				departmentId = departments[i].department_id;
			}
		}

		connection.query('INSERT INTO products SET ?',
			[{
				product_name: answers.name,
				department_id: departmentId,
				price: parseFloat(answers.price),
				stock_quantity: parseInt(answers.quantity)
			}], function(err){
				if(err) throw err

				console.log(colors.green('\n****** Product Added successfully ******\n'));
				start();
			}
		);
	});
}