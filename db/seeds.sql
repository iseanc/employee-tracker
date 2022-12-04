-- Active: 1669780206496@@127.0.0.1@3306@employees_db
USE employees_db;

INSERT INTO department (name)
  VALUES ("Administration"),
          ("Human Resources"),
          ("Information Technology"),
          ("Customer Services");

INSERT INTO role (title, salary, department_id)
  VALUES 
    ("Chief Executive Officer","500000",2), 
    ("Recruitment Team Lead","60000",3),
    ("Manager","90000",4);



INSERT INTO employee (first_name, last_name)
  VALUES 
    ("Able","Baker"),
    ("Charlie","Daniels"),
    ("Enya","Fagan"),
    ("Greta","Heisenberg");