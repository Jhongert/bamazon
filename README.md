# Bamazon
A storefront builded with MySQL and Node.Js. The app take in orders from customers and deplete stock from the store's inventory. this app also track product sales across store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started
### How it works

**bamazonCustomer.js**
Running this application will first display all of the items available for sale (See picture below). The app then prompt 
users with two messages. The first ask them the ID of the product they would like to buy. If the item does not exist the user gets an [aler](https://github.com/Jhongert/bamazon/blob/master/screenshots/bc_alert.jpeg?raw=true). The second message ask how many units of the product they would like to buy. If there is not enough of the product to meet the customer's reques, the app will [log the phrase](https://github.com/Jhongert/bamazon/blob/master/screenshots/bc_alert2.jpeg?raw=true) Insufficient quantity!. Only (count) available, and then prevent the order from going through.

![Bamazon Customer](https://github.com/Jhongert/bamazon/blob/master/screenshots/bcmsg.jpeg?raw=true)

#### bamazonManager.js
#### bamazonSupervisor.js

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
