DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  department VARCHAR(45),
  customer_price DECIMAL(10,2) DEFAULT 0.00,
  stock_quantity INT DEFAULT 0,
  product_sales DECIMAL(10,2) DEFAULT 0.00,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Batman: Arkham Knight", "Games", 219.00, 3, 1670.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Super Mario Brothers", "Games", 209.00, 89, 1432.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Tetris", "Games", 189.00, 70, 732.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Halo 3", "Games", 55.00, 2, 455.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Playstation 4", "Console", 75.00, 30, 798.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Xbox One", "Console", 50.00, 37, 230.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Nintendo Switch", "Console", 55.00, 57, 852.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Mario Bros Stickers", "Accessories", 124.95, 28, 1249.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Xbox Controller", "Accessories", 140.00, 23, 1085.00);

INSERT INTO products (product_name, department, customer_price, stock_quantity,product_sales)
VALUES ("Tetris", "Games", 78.99, 125, 1828.00);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) ,
  over_head_costs DECIMAL(10,2) DEFAULT 0.00,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Games", 300.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Console", 500.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Accessories", 150.00);

SELECT * FROM products;

SELECT * FROM departments;