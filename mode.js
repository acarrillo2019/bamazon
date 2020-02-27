// Required NPM modules
var chalk = require("chalk");

// ____________________________________________________________________________________

function displayItems(list, color, user) {
    // Display the inventory
    
    let c = chalk.keyword(color);

    if (user === "manager") {
        console.log(c("\nItem #  Product                Department   Price($)  Available Qty  Product Sales($)"));
        console.log(c("-------------------------------------------------------------------------------------"));

        // Display product_sales column to manager
        for (var i =0; i < list.length; i++) {
            console.log(`${list[i].id.toString().padEnd(7)} ${list[i].product_name.padEnd(22)} `
            + `${list[i].department.padEnd(14)} ${list[i].customer_price.toString().padEnd(12)} `
            + `${list[i].stock_quantity.toString().padEnd(16)} ${list[i].product_sales.toFixed(2)}`);
        }
    }
    else {        
        console.log(c("\nItem #  Product                Department   Price($)  Available Qty"));
        console.log(c("-------------------------------------------------------------------"));

        // Don't display product_sales column to customer
        for (var i =0; i < list.length; i++) {
            console.log(`${list[i].id.toString().padEnd(7)} ${list[i].product_name.padEnd(22)} `
            + `${list[i].department.padEnd(14)} ${list[i].customer_price.toString().padEnd(12)} `
            + `${list[i].stock_quantity}`);
        }
    }
    console.log("\n");
}
// ____________________________________________________________________________________

function printHeader(msg, color) {

    let c = chalk.bold.keyword(color);
    let pad = (84 - msg.length)/2;
    let blank = "";
    let m = `*${msg.padStart(pad+msg.length)}${blank.padEnd(pad)}*`;

    console.log(c("\n**************************************************************************************"));
    printMsg(m, color);
    console.log(c("**************************************************************************************"));

}
// ____________________________________________________________________________________

function printMsg (msg, color){
    let c = chalk.bold.keyword(color);
    console.log(c(`\n${msg}\n`))
}
// ____________________________________________________________________________________

function isNumber(num){
    // Ensure value entered is a number.
    if (isNaN(num) || (/^\s*$/.test(num))){
        return false;
    }
    return true;
}
// ____________________________________________________________________________________

module.exports.displayItems = displayItems;
module.exports.printHeader = printHeader;
module.exports.isNumber = isNumber;