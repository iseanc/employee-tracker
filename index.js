// Exports
module.exports = {mainMenu, addDepartment};

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

const { 
  chooseMainAction, 
  promptDepartmentName,
 } = require('./lib/prompts');

// ----------------------------------------------

// Start main Inquirer menu
function mainMenu() {
  // start screen prompts
  inquirer
    // get user input
    .prompt(chooseMainAction)
    // and process input
    .then((answers) => {
      processMainMenuChoice(answers.mainActionChoice); //, mainMenu
   })
    
}

function addDepartment() {
  inquirer
  .prompt(promptDepartmentName)
  .then((answers) => {
      if(answers.departmentName !== "") {
        insertNewDepartment(answers.departmentName);
      } else {
        console.log("Please enter a name for the new department");
        addDepartment();
      }
  })
}

function processMainMenuChoice(mainActionChoice, callbackFunction) {

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
      addDepartment();
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


