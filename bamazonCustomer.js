/*
	Theis App display a list of items available for sale.
	Then ask to enter the item-id and quantitity the user want to buy.
*/

//requires modules
var inquirer = require('inquirer');
var table = require('console.table');
var colors = require('colors');
var connection = require('./dbConfig');

//variable to hold the item that the user wants to buy
var curItem;

//Select items available for sale from database
//Display items
function displayitems(){
	connection.query('SELECT item_id, product_name, price FROM products', function(err, items){
		if(err) throw err

		console.log('\n');
		console.table(items);

		//Ask user the ID of the product they would like to buy 
		getItemId(items);
	});
}

//Ask user the ID of the product they would like to buy
//Parameter items: type array. This parameter is use to check if the chosen id is valid
function getItemId(items){
	inquirer.prompt([
		{
			type: 'input',
			name: 'itemId',
			message: 'Plese enter the ID of the Item you want to buy:',
			validate: function(value){
				var itemId = parseInt(value);
				for(var i = 0; i < items.length; i++){
					if(itemId == items[i].item_id){
						return true;
					}
				}
				return colors.red('Please enter a valid Item id.');
			}
		}
	]).then(function(answer){
		//After get a valid Id
		//Get the item from the database
		connection.query('SELECT * FROM products WHERE item_id = ?', [answer.itemId], function(err, res){
			if(err) throw err;

			//Store the chosen item in gloval variable curItem
			curItem = res[0];

			//Ask the user to enter the quantity.
			getQuantity();
		});
	})
}

//Ask how many units of the product the user would like to buy
//And check if that quantity is available in stock
function getQuantity(){
	inquirer.prompt([
		 {
			type: 'input',
			name: 'quantity',
			message: 'How many units would you like to buy?',
			validate: function(value){
				//Make sure the input is a number integer greater than 0 
				if(!isNaN(value) && parseInt(value) > 0 && parseInt(value) == value){
					//Check if that quantity is available in stock
					if(curItem.stock_quantity <= parseInt(value)){
						return colors.red('Insufficient quantity!. Only ' + curItem.stock_quantity + ' available.');
					}
					return true;
				}
				return colors.red('Please enter a whole number greater than 0.');
			}
		}
	]).then(function(answer){
		//Update database with the quantity
		updateItem(parseInt(answer.quantity)); 
	});
}

//Update table products to reflect the remaining quantity
//Show the customer the total cost of their purchase
//And start a cicle again
function updateItem(quantity){
	var newQuantity = curItem.stock_quantity - quantity;
 	var totalCost = quantity * curItem.price;
 	var revenue = curItem.product_sales + totalCost;

	connection.query('UPDATE products SET ? WHERE ?',
		[{
			stock_quantity: newQuantity,
			product_sales: revenue
		},{
			item_id: curItem.item_id
		}], function(err, res){
			if(err) console.log(err);

			console.log('\n***********************************************************');
			console.log(colors.green(quantity, 'units of "', curItem.product_name, '" at $' + curItem.price + 'ea'));
			console.log(colors.green('Total cost: $' + totalCost));
			console.log('*************************************************************');

			displayitems();
		});
}
displayitems();