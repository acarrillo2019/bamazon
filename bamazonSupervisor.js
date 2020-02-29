// NPM modules
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

// create the connection information for the sql database
var connection = mysql.createConnection(sqlConfig);

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    
    common.printHeader("Welcome to Bamazon Supervisor Department Management App","green");
    manageDepartments();
});

// Functions
// ____________________________________________________________________________________

function manageDepartments() {

    // Prompt user for command selection
    inquirer.prompt([
        {
            name: "command",
            type: "rawlist",
            message: "Please select a function",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ])
    .then(function(cmd) {
        // console.log(cmd);
        switch (cmd.command) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                addDepartment();
                break;
            case "Exit":
                exitBamazon();
                break;
        }
    });
}

function viewSales() {

    connection.query(
        "SELECT departments.department_id, sales.department_name, sales.total_sales, departments.over_head_costs,"
        + "(sales.total_sales - departments.over_head_costs) AS total_profit "
		+ "FROM (SELECT department_name, SUM(product_sales) AS total_sales FROM products "
        + "RIGHT JOIN departments ON department = department_name GROUP BY department_name) AS sales "
        + "INNER JOIN departments ON sales.department_name = departments.department_name",
    
    (err, results) => {
        if (err) throw err;

        common.printHeader("Product Sales by Department", "green")
        displaySales(results)
        manageDepartments();
    });
}

