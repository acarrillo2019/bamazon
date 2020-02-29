// NPM modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

// Common functions used in bamazonCustomer/Manager/Supervisor
var common = require("./mode.js");

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

function addDepartment() {

    let maxDeptLength = 12;

    inquirer.prompt ([
        {
            name: "name",
            type: "input",
            message: "Enter New Department Name",
            validate: function(dept){
                // Check if item number is valid, this method returns the object if itemNumber is found
                if (dept.length <= maxDeptLength) {
                    return true;
                }
                console.log(chalk.red.bold('\nDepartment name too long'));
                return false;
            }
        },
        {
            name: "costs" ,
            type: "input",
            message: "Enter Department Overhead Costs",
            validate: (num) => {return common.isNumber(num);}
        }
    ])
    .then(function(response) {
        // Add new department to list
        connection.query("INSERT INTO departments SET ?", 
            [{department_name: response.name, over_head_costs: response.costs}],
            (err, results) =>  {

            if (err) throw err;

            console.log(chalk.green.bold(`\n${results.affectedRows} department added!\n`));
            manageDepartments();
        });
    });
}

function displaySales(list) {
    
    console.log(chalk.green("\nID   Department     Total Sales($)  Overhead Costs($)   Total Profit($)"));
    console.log(chalk.green("-----------------------------------------------------------------------"));

    // Display the sales by department
    for (var i =0; i < list.length; i++) {
        // If value is null, due to no sales for any product in selected department, then set value to over head costs (neg value)
        if (list[i].total_profit === null){
            list[i].total_profit = -list[i].over_head_costs;
        }
        console.log(`${list[i].department_id.toString().padEnd(4)} ${list[i].department_name.padEnd(18)} `
            + `${(list[i].total_sales.toFixed(2).toString()).padEnd(15)} `
            + `${(list[i].over_head_costs.toFixed(2).toString()).padEnd(20)} ${list[i].total_profit.toFixed(2)}`);
    }
    console.log("\n");
}

function exitBamazon() {

    console.log(chalk.green.bold("\nThank you for using Bamazon!\n"))
    connection.end();
}