// Manager Inventory Management App

// Required NPM modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// Common functions used in bamazonCustomer/Manager/Supervisor
var common = require("./common.js");

var sqlConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
};

const lowInventory = 5;

// create the connection information for the sql database
var connection = mysql.createConnection(sqlConfig);

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    
    common.printHeader("Welcome to Bamazon Inventory Managment App!","magenta");
    manageInventory();
});

function manageInventory() {

    // Prompt user for command selection
    inquirer.prompt([
        {
            name: "command",
            type: "rawlist",
            message: "Please select a function",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ])
    .then(function(cmd) {
        // console.log(cmd);
        switch (cmd.command) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            case "Exit":
                exitBamazon();
                break;
        }
    });
}

function viewProducts() {

    // Query the DB for all items in store inventory
    connection.query("SELECT * FROM products", (err, results) => {
        if (err) throw err;

        common.printHeader("Store Inventory", "magenta");
        common.displayItems(results, "magenta", "manager");
        manageInventory();
    });
}

function viewLowInventory() {

    // Query the DB for all items in store with low inventory
    connection.query(`SELECT * FROM products WHERE stock_quantity < ${lowInventory}`, (err, results) => {
        if (err) throw err;

        // console.log(chalk.red.bold("\nProducts with Low Inventory"));
        common.printHeader("Products with Low Inventory", "red");
        common.displayItems(results,"red", "manager");
        manageInventory();
    });
}

function addProduct() {
    
    var maxProdLength = 20;

    connection.query(`SELECT department_name FROM departments`, (err, results) => { 
        if (err) throw err;

        let choiceArray = [];

        for (i=0; i< results.length; i++) {
            choiceArray.push(results[i].department_name);
        }

        inquirer.prompt ([
            {
                name: "name",
                type: "input",
                message: "Enter Product Name",
                validate: function(prod){
                    // Check if item number is valid, this method returns the object if itemNumber is found
                    if (prod.length <= maxProdLength) {
                        return true;
                    }
                    console.log(chalk.red.bold('\nProduct name too long'));
                    return false;
                }
            },   
        ])
        .then(function(response) {
            
            

                    console.log(chalk.green.bold(`\n${results.affectedRows} product added!\n`));
                    manageInventory();
            });
        });
    })
}