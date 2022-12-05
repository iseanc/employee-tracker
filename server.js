// IMPORT REQUIRED PACKAGES/MODULES
// Import/require Express JS
const express = require('express');
// Import and require console.table
const cTable = require('console.table');
// Import and require Inquirer
const inquirer = require('inquirer');

// const { viewDepartmentBudget } = require('./lib/sql');

// Import and require user-defined modules
const {selectAllDepartments, 
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
  viewDepartmentBudget } = require('./lib/sql');

const { chooseMainAction } = require('./lib/prompts');

// Create Express app port and instance
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ----------------------------------------------
// Express routes in here... 

function main() {
  console.log('Manage Employees, Roles, and Departments...');

  // start screen prompts
  inquirer
    // get user input
    .prompt(chooseMainAction)
    // and process input
    .then((answers) => {
      switch(answers.mainActionChoice){
        case 'View all Departments': break;
        case 'View all Roles': break;
        case 'View all Employees': break;
        case 'Add a Department': break;
        case 'Add a Role': break;
        case 'Add an Employee': break;
        case 'Update an Employee Role': break;
      };
    })
}

main()
// ----------------------------------------------

// Create Express Listener
app.listen(PORT, () => {
  console.log(`Employee Tracker App Server running on port ${PORT}`);
});
