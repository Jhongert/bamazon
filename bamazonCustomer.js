var inquirer = require('inquirer');
var table = require('console.table');
var colors = require('colors');
var connection = require('./dbConfig');

function start(){
	var curItem;
	connection.query('SELECT item_id, product_name, price FROM products', function(err, results){
		if(err) throw err

		console.log('\n');
		console.table(results);

		inquirer.prompt([
			{
				type: 'input',
				name: 'itemId',
				message: 'Plese enter the ID of the Item you want to buy.',
				validate: function(value){
					var itemId = parseInt(value);
					for(var i = 0; i < results.length; i++){
						if(itemId == results[i].item_id){
							
							connection.query('SELECT * FROM products WHERE item_id = ?', [itemId], function(err, res){
								if(err) throw err;

								curItem = res[0];
								
							});
							return true;
						}
					}
					return colors.red('Please enter a valid Item id.');
				}
			}, {
				type: 'input',
				name: 'quantity',
				message: 'How many units would you like to buy?',
				validate: function(value){
					if(!isNaN(value) && parseInt(value) > 0 && parseInt(value) == value){
						if(curItem.stock_quantity <= parseInt(value)){
							return colors.red('Insufficient quantity!. Only ' + curItem.stock_quantity + ' available.');
						}
						return true;
					}
					return colors.red('Please enter a whole number greater than 0.');
				}
			}
		]).then(function(answer){
				var newQuantity = curItem.stock_quantity - parseInt(answer.quantity);
				var totalCost = parseInt(answer.quantity) * curItem.price;
				var revenue = curItem.product_sales + totalCost;

				connection.query('UPDATE products SET ? WHERE ?',
					[{
						stock_quantity: newQuantity,
						product_sales: revenue
					},{
						item_id: answer.itemId
					}], function(err, res){
		 				if(err) console.log(err);

		 				console.log('\n***********************************************************');
						console.log(colors.green(answer.quantity, 'units of "', curItem.product_name, '" at $' + curItem.price + 'ea'));
						console.log(colors.green('Total cost: $' + totalCost));
						console.log('*************************************************************')
		 			});
				start();
			});
	});
}
start();