// Import and require mysql2
const e = require('express');
const mysql = require('mysql2');

// Create database connection
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

// View all Departments
db.query(`SELECT * FROM department;`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// View all Roles
db.query(`SELECT * FROM role;`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// View all Employees
db.query(`SELECT * FROM employee;`, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Add a Department
let deptName;
db.query(`INSERT INTO department(name) VALUES (?);`, deptName, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Add a Role
let roleTitle, roleSalary, roleDeptId;

db.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, roleDeptId], (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Add an Employee
let empFirstName, empLastName, empRoleId, empManagerId;

db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [empFirstName, empLastName, empRoleId, empManagerId], (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Update an Employee Role
let updateEmpRoleId, empId;

db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,[updateEmpRoleId, empId] , (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// BONUS functionalities
// Update employee managers
let updateManagerId;

db.query(`UPDATE employee SET manager_id = ? WHERE ?;`,[updateManagerId, empId] , (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// View employees by manager.
db.query(`SELECT m.last_name + '. ' + m.first_name AS Manager_Name, 
            e.last_name + ', ' + e.first_name AS Employee_Name
            FROM employee e JOIN employee mgr ON m.manager_id = mgr.id
            GROUP BY Manager ORDER by Manager ASC`,
  [updateManagerId, empId] , (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// View employees by department.
db.query(`SELECT d.name, e.last_name, e.first_name
            FROM employee e 
            JOIN role r ON e.role_id = r.id
            JOIN department d ON r.department_id = d.id
            GROUP BY d.name
            ORDER BY d.name ASC, e.last_name ASC, e.first_name ASC;`, 
  (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
});

// Delete departments, roles, and employees.
// Delete department
let delDeptId; 
db.query(`DELETE FROM department d WHERE d.id = ?;`, delDeptId, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Delete role
let delRoleId; 

db.query(`DELETE FROM role r WHERE r.id = ?;`, delRoleId, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Delete employee
let delEmpId2;

db.query(`DELETE FROM employee e WHERE e.id = ?;`, delEmpId2, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});


// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
