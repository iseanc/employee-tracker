// Import and require mysql2
const mysql = require('mysql2');

// Create database connection
// const db2 = mysql.createConnection(
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

// create database connection pool
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employees_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// View all Departments
function selectAllDepartments() {
  db.execute(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}
// selectAllDepartments();


// View all Roles
function selectAllRoles() {
  db.execute(`SELECT * FROM role;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// selectAllRoles();

// View all Employees
function selectAllEmployees() {
  db.execute(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}
// selectAllEmployees()

// Add a Department
function insertNewDepartment(deptName) {
  db.execute(`INSERT INTO department(name) VALUES (?);`, [deptName], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
 });  
} 
// insertNewDepartment("Facility Management"); 

// Add a Role
function insertNewRole(roleTitle, roleSalary, roleDeptId) {
  db.execute(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, roleDeptId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// insertNewRole("Janitor", 30000, 8);

// Add an Employee
function insertNewEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
  db.execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [empFirstName, empLastName, empRoleId, empManagerId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// insertNewEmployee("Doe", "John", 8, null) ;
// insertNewEmployee("Doe","Jane", 6, 8);

// Update an Employee Role
function updateEmployeeRole(empId, newEmpRoleId) {
  db.execute(`UPDATE employee SET role_id = ? WHERE id = ?`,[newEmpRoleId, empId] , (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// updateEmployeeRole(9, 4);

// BONUS functionalities
// Update employee managers
function updateEmployeeManager(empId, newManagerId) {
  db.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`,[newManagerId, empId] , (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// updateEmployeeManager(9, 2);

// View employees by manager.
function selectEmployeesByManager() {
  db.execute(`SELECT CONCAT(m.last_name, ', ', m.first_name) AS Manager, CONCAT(e.last_name, ', ', e.first_name) AS Employee FROM employee e LEFT JOIN employee m ON e.manager_id = m.id ORDER by Manager ASC, Employee ASC`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// selectEmployeesByManager();

// View employees by department.
function selectEmployeesByDepartment() {
  db.execute(`SELECT d.name, e.last_name, e.first_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id ORDER BY d.name ASC, e.last_name ASC, e.first_name ASC;`, 
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
  });
}
// selectEmployeesByDepartment();

// Delete departments, roles, and employees.
// Delete department
function deleteDepartment(deptId) {
  db.query(`DELETE FROM department d WHERE d.id = ?;`, deptId, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// Delete role
function deleteRole(roleId) {
  db.execute(`DELETE FROM role r WHERE r.id = ?;`, [roleId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}
// deleteRole(10);

// Delete employee
function deleteEmployee(empId) { 
  db.execute(`DELETE FROM employee e WHERE e.id = ?;`, [empId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}
// deleteEmployee(9);

// WISHLIST
// TODO: View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewDepartmentBudget(deptName) {
  db.execute(`select d.name AS Dept, SUM(r.salary) as UtilizedBudget from department d join role r on r.department_id = d.id join employee e on e.role_id = r.id where d.name = ? group by d.name;`, [deptName], (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(result);
    return result;
  });
} 
// viewDepartmentBudget('Information Technology');

// Export functions
module.exports = {
  db, 
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