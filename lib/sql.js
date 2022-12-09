// Require packages
const mysql = require('mysql2');

// DB Connection infor
const connectionInfo = {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employees_db'
  }

// Exports
module.exports = {
  // db,
  selectAllDepartments, 
  selectDeptsForRole,
  selectRolesForEmp,
  selectManagerForEmp,
  selectAllRoles, 
  selectAllEmployees,
  insertNewDepartment,
  insertNewRole,
  insertNewEmployee,
  selectEmpForRoleUpdate,  
  updateEmployeeRole,
  updateEmployeeManager,
  selectEmployeesByManager,
  selectEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudget
};

//  module.exports.connectionInfo = connectionInfo;

// View all Departments
function selectAllDepartments() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT id ID, name Department FROM department;`)
    .then(([result]) => {
        console.log("\n View All Departments \n")
        console.table(result);
    })
    .catch((err) => console.log(err))
    // .then(() => conn.end())
    .then(() => mainMenu());
}

// Get departments to list for inserting a new Role record in the database
async function selectDeptsForRole() {
  // get client
  const mysql = require('mysql2/promise');
  // create connection
  const conn = await mysql.createConnection(connectionInfo);
  // query db
  const [result] = await conn.execute(`SELECT name, id value FROM department;`);
  // end connection
  // await conn.end();
  return result;
}

async function selectRolesForEmp() {
  // get client
  const mysql = require('mysql2/promise');
  // create connection
  const conn = await mysql.createConnection(connectionInfo);
  // query db
  const [result] = await conn.execute(`SELECT title name, id value FROM role ORDER BY title ASC;`);
  // end connection
  // await conn.end();
  return result;
}

async function selectManagerForEmp() {
  // get client
  const mysql = require('mysql2/promise');
  // create connection
  const conn = await mysql.createConnection(connectionInfo);
  // query db
  const [result] = await conn.execute(`SELECT CONCAT(e.last_name, ', ', e.first_name, ', ' , r.title) name, e.id value FROM employee e JOIN role r ON e.role_id = r.id ORDER BY name ASC;`);
  // end connection
  // await conn.end();
  return result;
}

// View all Roles
function selectAllRoles() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT r.id ID, r.title Title, r.salary Salary, d.name Department FROM role r LEFT JOIN department d ON r.department_id = d.id;`)
    .then(([result]) => {
      console.log("\n View All Roles \n")
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 

// View all Employees
function selectAllEmployees() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT e.id as EmpId, e.last_name LastName, e.first_name FirstName, r.title Title, d.name Department, r.salary Salary, CONCAT(m.last_name, ', ', m.first_name) Manager FROM employee e JOIN role r ON e.role_id = r.id LEFT JOIN employee m on e.manager_id = m.id LEFT JOIN department d ON r.department_id = d.id ORDER BY e.last_name ASC, e.first_name ASC, r.title ASC;`)
    .then(([result]) => {
      console.log("\n View All Employees \n")
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
}

// Add a Department
function insertNewDepartment(deptName) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO department(name) VALUES (?);`, [deptName])
    .then(([result]) => {
      console.log("\n Inserting New Department \n")
      console.table(selectAllDepartments());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllDepartments())
}  

// Add a Role
function insertNewRole(roleTitle, roleSalary, roleDeptId) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, roleDeptId])
    .then(([result]) => {
      console.log("\n Inserting New Role \n")
      console.table(selectAllRoles());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu()); // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllRoles())
} 

// Add an Employee
function insertNewEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [empFirstName, empLastName, empRoleId, empManagerId])
    .then(([result]) => {
      console.log("\n Inserting New Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllEmployees())
} 

// Select employees for role update
async function selectEmpForRoleUpdate() {
  // get client
  const mysql = require('mysql2/promise');
  // create connection
  const conn = await mysql.createConnection(connectionInfo);
  // query db
  const [result] = await conn.execute(`SELECT CONCAT(e.last_name, ', ', e.first_name, ' CURRENT ROLE: ' , r.title) name, e.id value FROM employee e JOIN role r ON e.role_id = r.id ORDER BY name ASC;`);
  // end connection
  // await conn.end();
  return result;
}

// Update an Employee Role
function updateEmployeeRole(empId, newEmpRoleId) {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`UPDATE employee SET role_id = ? WHERE id = ?`,[newEmpRoleId, empId] )
    .then(([result]) => {
      console.log("\n Updating Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu()); // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllEmployees())
} 

// BONUS functionalities
// Update employee managers
function updateEmployeeManager(empId, newManagerId) {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`UPDATE employee SET manager_id = ? WHERE id = ?;`,[newManagerId, empId] )
    .then(([result]) => {
      console.log("\n Updating Employee Manager \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllEmployees())
} 

// View employees by manager.
function selectEmployeesByManager() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT CONCAT(m.last_name, ', ', m.first_name) AS Manager, CONCAT(e.last_name, ', ', e.first_name) AS Employee FROM employee e LEFT JOIN employee m ON e.manager_id = m.id ORDER by Manager ASC, Employee ASC`)
    .then(([result]) => {
      console.log("\n Select Employees by Manager \n")
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 

// View employees by department.
function selectEmployeesByDepartment() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT d.name, e.last_name, e.first_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id ORDER BY d.name ASC, e.last_name ASC, e.first_name ASC;`)
    .then(([result]) => {
      console.log("\n Select Employees by Department \n")
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
}

// Delete departments, roles, and employees.
// Delete department
function deleteDepartment(deptId) {
  conn.promise().execute(`DELETE FROM department d WHERE d.id = ?;`, deptId)
    .then(([result]) => {
      console.log("\n Deleting from Department \n")
      console.table(selectAllDepartments());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllDepartments())
}

// Delete role
function deleteRole(roleId) {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`DELETE FROM role r WHERE r.id = ?;`, [roleId])
    .then(([result]) => {
      console.log("\n Deleting from Role \n")
      console.table(selectAllRoles());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllRoles())
}

// Delete employee
function deleteEmployee(empId) { 
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`DELETE FROM employee e WHERE e.id = ?;`, [empId])
    .then(([result]) => {
      console.log("\n Deleting from Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    // .then(() => mainMenu());  // REMOVE BECAUSE OF CALLBACK ABOVE: console.table(selectAllEmployees())
}

// WISHLIST
// TODO: View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewDepartmentBudget(deptName) {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`select d.name AS Dept, SUM(r.salary) as UtilizedBudget from department d join role r on r.department_id = d.id join employee e on e.role_id = r.id where d.name = ? group by d.name;`, [deptName])
    .then(([result]) => {
      console.log("View Department Budget Utilization");
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 

const {mainMenu} = require('../index.js');
const { promptRoleName } = require('./prompts.js');
