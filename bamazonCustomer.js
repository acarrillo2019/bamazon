
// NPM modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var common = require("./common.js");

var sqlConfig = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
};

var connection = mysql.createConnection(sqlConfig);

connection.connect(function(err) {
    if (err) throw err;

    common.printHeader("Welcome to Bamazon Tennis Super Store!","blue");
    purchaseItem();
});

function purchaseItem() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        common.displayItems(results, "blue","customer");

        var item = 0;

        inquirer.prompt([
            {
                name: "itemNumber",
                type: "input",
                message: chalk.yellow("Which item would you like to purchase?"),
                validate: function(num){
                    item = results.find(x => x.id === parseInt(num));
                    if (item) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(ans1) {
            inquirer.prompt([
                {
                    name: "qty",
                    type: "input",
                    message: chalk.yellow("How many would you like to purchase?"),
                    validate: function(num){
                        if (parseInt(num) < item.stock_quantity) {
                            return true;
                        }
                        console.log(chalk.red("\rInsufficient quantity in stock, please select another amount."));
                        return false;
                    }
                }
            ])
            .then(function(ans2) {
                updateInventory(ans1.itemNumber, parseInt(ans2.qty));
            })
        });
    });
}

function updateInventory(ix, qty) {
    if (qty != 0) {

        // Get the item record, need current values to use to update
        connection.query(
            "SELECT * FROM products WHERE ?", [{id:ix}],
            function(err, res1) {
                if (err) throw err;

                connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: (res1[0].stock_quantity - qty), 
                        product_sales: res1[0].product_sales+(res1[0].customer_price*qty)
                    }, {
                        id: ix
                    }],
                    function(err, res2) {
                        if (err) throw err;

                        console.log(chalk`\n{green.bold Thank you for your purchase!} Your total is {magenta $${res1[0].customer_price*qty}.}\n`);
                        exitBamazon();
                    }
                );
            }
        );
    }
    else {
        console.log(chalk.cyan(`\nSorry we weren't able to help you today. Come back soon!\n`));
        exitBamazon();
    }
}

function exitBamazon() {

    console.log(chalk.blue.bold("\nHave a great day!\n"))
    connection.end();
}