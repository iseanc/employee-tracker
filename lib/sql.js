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
  db.query(`SELECT * FROM department;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 

// View all Roles
function selectAllRoles() {
  db.query(`SELECT * FROM role;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// selectAllRoles();

// View all Employees
function selectAllEmployees() {
  db.query(`SELECT * FROM employee;`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// Add a Department
function insertNewDepartment(deptName) {
  db.query(`INSERT INTO department(name) VALUES (?);`, deptName, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
 });  
}

// Add a Role
function insertNewRole(roleTitle, roleSalary, roleDeptId) {
  db.query(`INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);`, [roleTitle, roleSalary, roleDeptId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 
// insertNewRole("Janitor", 30000);

// Add an Employee
function insertNewEmployee(empFirstName, empLastName, empRoleId, empManagerId) {
  db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`, [empFirstName, empLastName, empRoleId, empManagerId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// Update an Employee Role
function updateEmployeeRole(empId, newEmpRoleId) {
  db.query(`UPDATE employee SET role_id = ? WHERE id = ?`,[newEmpRoleId, empId] , (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// BONUS functionalities
// Update employee managers
function updateEmployeeManager(empId, newManagerId) {
  db.query(`UPDATE employee SET manager_id = ? WHERE ?;`,[newManagerId, empId] , (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// View employees by manager.
function selectEmployeesByManager() {
  db.query(`SELECT CONCAT(m.last_name, ', ', m.first_name) AS Manager, CONCAT(e.last_name, ', ', e.first_name) AS Employee FROM employee e JOIN employee m ON e.manager_id = m.id ORDER by Manager ASC, Employee ASC`, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
} 

// View employees by department.
function selectEmployeesByDepartment() {
  db.query(`SELECT d.name, e.last_name, e.first_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id ORDER BY d.name ASC, e.last_name ASC, e.first_name ASC;`, 
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
  });
}

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
  db.query(`DELETE FROM role r WHERE r.id = ?;`, roleId, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });

}

// Delete employee
function deleteEmployee(empId) { 
  db.query(`DELETE FROM employee e WHERE e.id = ?;`, delEmpId2, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

// WISHLIST
// TODO: View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
function viewDepartmentBudget(deptName) {
  db.query(`select d.name AS Dept, SUM(r.salary) as UtilizedBudget from department d join role r on r.department_id = d.id join employee e on e.role_id = r.id where d.name = ? group by d.name;`, deptName, (err, result) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(result);
    return result;
  });
} 
// viewDepartmentBudget('Information Technology');

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