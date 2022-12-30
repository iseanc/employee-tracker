-- Active: 1669780206496@@127.0.0.1@3306@employees_db
USE employees_db;

INSERT INTO department (name)
  VALUES ("Administration"),
          ("Human Resources"),
          ("Information Technology"),
          ("Customer Services");

INSERT INTO role (title, salary, department_id)
  VALUES 
    ("Chief Executive Officer",500000,1), 
    ("Manager, HR",90000,2),
    ("Manager, IT",90000,3),
    ("Manager, Cust Svc",90000,4),
    ("Recruiter",65000,2),
    ("Web Developer",70000,3),
    ("Customer Service Rep",55000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES 
    ("Able","Baker",1,NULL),
    ("Charlie","Daniels",2,NULL),
    ("Enya","Fagan",3,NULL),
    ("Greta","Heisenberg",4,NULL),
    ("Ignacio","Jiminez",5,2),
    ("Katherine","Leman",6,3),
    ("Michael","North",7,4);
    