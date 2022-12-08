
// Exports
module.exports = {
  // db,
  selectAllDepartments, 
  selectAllRoles, 
  selectAllEmployees,
  insertNewDepartment,
  insertNewRole,
  insertNewEmployee,  
  updateEmployeeRole,
  updateEmployeeManager,
  selectEmployeesByManager,
  selectEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudget
};
// Import and require mysql2
const mysql = require('mysql2');
const {mainMenu} = require('../index.js');

// Create database connection
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password
//     password: 'password',
//     database: 'employees_db'
//   },
//   console.log(`Connected to the books_db database.`)
// );

// DB Connection infor
const connectionInfo = {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employees_db'
  }
 
// create database connection pool
// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'employees_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// View all Departments

// function selectAllDepartments() {
//   const conn = mysql.createConnection(connectionInfo);

//   conn.promise().execute(`SELECT * FROM department;`, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("\n View All Departments \n")
//       console.table(result);
//     }
//   });
//   conn.end();
//   mainMenu();
// }
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
// selectAllDepartments();

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
// selectAllRoles();

// View all Employees
function selectAllEmployees() {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`SELECT e.id as EmpId, e.last_name LastName, e.first_name FirstName, r.title Title, d.name Department, r.salary Salary, CONCAT(m.last_name, ', ', m.first_name) Manager FROM employee e JOIN role r ON e.role_id = r.id LEFT JOIN employee m on e.manager_id = m.id LEFT JOIN department d ON r.department_id = d.id;`)
    .then(([result]) => {
      console.log("\n View All Employees \n")
      console.table(result);
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
}
// selectAllEmployees()

// Add a Department
function insertNewDepartment(deptName) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO department(name) VALUES (?);`, [deptName])
    .then(([result]) => {
      console.log("\n Inserting New Department \n")
      console.table(selectAllDepartments());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 
// insertNewDepartment("Facility Management"); 

// Add a Role
function insertNewRole(roleTitle, roleSalary, roleDeptId) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, roleDeptId])
    .then(([result]) => {
      console.log("\n Inserting New Role \n")
      console.table(selectAllRoles());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 
// insertNewRole("Janitor", 30000, 8);

// Add an Employee
function insertNewEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
  const conn = mysql.createConnection(connectionInfo);
  conn.promise().execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [empFirstName, empLastName, empRoleId, empManagerId])
    .then(([result]) => {
      console.log("\n Inserting New Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 
// insertNewEmployee("Doe", "John", 8, null) ;
// insertNewEmployee("Doe","Jane", 6, 8);

// Update an Employee Role
function updateEmployeeRole(empId, newEmpRoleId) {
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`UPDATE employee SET role_id = ? WHERE id = ?`,[newEmpRoleId, empId] )
    .then(([result]) => {
      console.log("\n Updating Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
} 
// updateEmployeeRole(9, 4);

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
    .then(() => mainMenu());
} 
// updateEmployeeManager(9, 2);

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
// selectEmployeesByManager();

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
// selectEmployeesByDepartment();

// Delete departments, roles, and employees.
// Delete department
function deleteDepartment(deptId) {
  conn.promise().execute(`DELETE FROM department d WHERE d.id = ?;`, deptId)
    .then(([result]) => {
      console.log("\n Deleting from Department \n")
      console.table(selectAllDepartments());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
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
    .then(() => mainMenu());
}
// deleteRole(10);

// Delete employee
function deleteEmployee(empId) { 
  const conn = mysql.createConnection(connectionInfo);

  conn.promise().execute(`DELETE FROM employee e WHERE e.id = ?;`, [empId])
    .then(([result]) => {
      console.log("\n Deleting from Employee \n")
      console.table(selectAllEmployees());
    })
    .catch((err) => console.log(err))
    .then(() => mainMenu());
}
// deleteEmployee(9);

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
// viewDepartmentBudget('Information Technology');

// // Export functions
// module.exports = {
//   // db,
//   selectAllDepartments, 
//   selectAllRoles, 
//   selectAllEmployees,
//   insertNewDepartment,
//   insertNewRole,
//   insertNewEmployee,  
//   updateEmployeeRole,
//   updateEmployeeManager,
//   selectEmployeesByManager,
//   selectEmployeesByDepartment,
//   deleteDepartment,
//   deleteRole,
//   deleteEmployee,
//   viewDepartmentBudget
// };
