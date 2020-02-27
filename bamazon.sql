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

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) ,
  over_head_costs DECIMAL(10,2) DEFAULT 0.00,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Equipment", 500.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apparel", 200.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Shoes", 250.00);
