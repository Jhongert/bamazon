# Bamazon
A storefront builded with MySQL and Node.Js. The app take in orders from customers and deplete stock from the store's inventory. this app also track product sales across store's departments and then provide a summary of the highest-grossing departments in the store.

## Getting Started
### How it works

#### bamazonCustomer.js
Running this application will first display all of the items available for sale.
![Bamazon Customer](https://raw.github.com/Jhongert/bamazon/screenshots/bcustomer.jpg?raw=true "Bamazon Customer")

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
