// Exports
module.exports = mainMenu;

// IMPORT REQUIRED PACKAGES/MODULES
// Import and require console.table
const cTable = require('console.table');
// Import and require Inquirer
const inquirer = require('inquirer');

// const { viewDepartmentBudget } = require('./lib/sql');

// Import and require user-defined modules
const {
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
  viewDepartmentBudget } = require('./lib/sql');

const { chooseMainAction } = require('./lib/prompts');

// ----------------------------------------------

// Start main Inquirer menu
function mainMenu() {
  // start screen prompts
  inquirer
    // get user input
    .prompt(chooseMainAction)
    // and process input
    .then((answers) => {
      returnToMainMenu(answers.mainActionChoice); //, mainMenu
   })
    
}

function returnToMainMenu(mainActionChoice, callbackFunction) {

  switch(mainActionChoice) {
    case 'viewalldepartments':
      selectAllDepartments();
      break;
    case 'viewallroles': 
      console.log(mainActionChoice);
      selectAllRoles();
      break;
    case 'viewallemployees': 
      selectAllEmployees();
      break;
    case 'addadepartment': 
      insertNewDepartment();
      break;
    case 'addarole': 
      insertNewRole();
      break;
    case 'addanemployee': 
      insertNewEmployee();
      break;
    case 'updateanemployeerole':
      updateEmployeeRole();
      break;
  };

  // callbackFunction();
}

function main() {
  // Welcome
  console.log('Manage Employees, Roles, and Departments...');
  // Start menus
  mainMenu();
}

main()
// ----------------------------------------------


