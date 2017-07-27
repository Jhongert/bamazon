# Bamazon
A storefront builded with MySQL and Node.Js. The app take in orders from customers and deplete stock from the store's inventory. this app also track product sales across store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started
### How it works

**bamazonCustomer.js:** 
Running this application will first display all of the items available for sale (See picture below). The app then prompt 
users with two messages. The first ask them the ID of the product they would like to buy. If the item does not exist the user gets an aler, [Please enter a valid item id](https://github.com/Jhongert/bamazon/blob/master/screenshots/bc_alert.jpeg?raw=true). The second message ask how many units of the product they would like to buy. If there is not enough of the product to meet the customer's reques, the app will log the phrase [Insufficient quantity!. Only (count) available](https://github.com/Jhongert/bamazon/blob/master/screenshots/bc_alert2.jpeg?raw=true), and then prevent the order from going through. Once all information is valid, the order is processed and the customer gets the [total cost of their purchase](https://github.com/Jhongert/bamazon/blob/master/screenshots/bcmsg.jpeg?raw=true).

![Bamazon Customer](https://github.com/Jhongert/bamazon/blob/master/screenshots/bcustomer.jpeg?raw=true)

**bamazonManager.js:**  Running this application will list a set of menu options (picture below).
- [View Products for Sale:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_view_products.jpeg?raw=true) list every available item including the item IDs, names, prices, and quantities.
- [View Low Inventory:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_low_inv.jpeg?raw=true) list all items with an inventory count lower than five.
- [Add to Inventory:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_add_inv.jpeg?raw=true) display a prompt that will let the manager "add more" of any item currently in the store. If the [item is updated successfully](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_add_inv_sus.jpeg?raw=true) the app will show the manager a message.
- [Add New Product:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_add_product.jpeg?raw=true) allow the manager to add a new product to the store. [A successfully](https://github.com/Jhongert/bamazon/blob/master/screenshots/bm_add_prod-sus.jpeg?raw=true) message will be show to the manager after the new product is added to the database.

![Bamazon Manager](https://github.com/Jhongert/bamazon/blob/master/screenshots/bmanager.jpeg?raw=true)

**bamazonSupervisor.js:**  Running this application will list a set of menu options (picture below).
- [View Product Sales by Department:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bs_view_sales.jpeg?raw=true) display a summarized table in their terminal/bash window.
- [Create New Department:](https://github.com/Jhongert/bamazon/blob/master/screenshots/bs_add_depart.jpeg?raw=true) allow the supervisor to add a completely new department to the store. Also shows the supervisor a successfully message When the new department is created.

![Bamazon Supervisor](https://github.com/Jhongert/bamazon/blob/master/screenshots/bsupervisor.jpeg?raw=true)

### Installing
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Open Terminal/bash window
- Clone this repo. `git clone https://github.com/Jhongert/bamazon.git`
- Navigate to bamazon folder. `cd bamazon`
- Install all dependencies. `npm install`
- Import database `db.sql`

### Dependencies
- **inquirer:** For user input.
- **mysql:** To manage storage.
- **console.table:** To display data in a table format.
- **colors:** To color messages and alerts.

### Application Structure
- `bamazonCustomer.js` - Allow users to buy productos.
- `bamazonManager.js` - Allow managers to view products, view low inventory products, add new products, and add inventory.
- `bamazonSupervisor.js` - Allow supervisors to add new departmets and view a summary of the highest-grossing departments in the store.
- `dbConfig.js` - Contains database configurations.
- `db.sql` - A copy from the database with dummy data.
- `node_modules/` - This folder contains all node modules.
- `package.json` - This file contains meta data about the app. It includes the list of dependencies to install from npm when running npm install.
- `.git/` - Git folder
- `.gitignore` - To tell git not to track node_modules files, and thus they won't be committed to Github. 
- `README.md` - This file.

## Built With
- Node.js
- MySql
- javascript

## Author
- Jhongert Fuertes
