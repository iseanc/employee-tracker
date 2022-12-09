// Exports
module.exports = {mainMenu, addDepartment, addRole};

// IMPORT REQUIRED PACKAGES/MODULES
// Import and require console.table
const cTable = require('console.table');
// Import and require Inquirer
const inquirer = require('inquirer');

// const { viewDepartmentBudget } = require('./lib/sql');

// Import and require user-defined modules
const {
  selectAllDepartments, 
  selectDeptsForRole,
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
  viewDepartmentBudget } = require('./lib/sql');

const { 
  chooseMainAction, 
  promptDepartmentName,
  promptRoleName,
  promptEmployeeInfo,
  promptUpdateEmployeeRole
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
   });
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
      };
  });
}

function addRole() {
  inquirer
  .prompt(promptRoleName)
  .then((answers) => {
    
    if(answers.roleName !== "" && answers.roleSalary !== "") {
      insertNewRole(answers.roleName, answers.roleSalary, answers.roleDepartment);
    } else {
      console.log("You must enter Role Name, Salary and Department.");
      addRole();
    }
  });
}

function addEmployee() {
  inquirer
   .prompt(promptEmployeeInfo)
   .then((answers) => {
      
      if(answers.empFirstName !== "" && answers.empLastName !== "") {
        insertNewEmployee(answers.empFirstName, answers.empLastName, answers.empRole, answers.empManager);
      } else {
        console.log("Please enter first name and last name.");
        addEmployee();
      }
   });
}

function changeEmployeeRole() {
  inquirer
   .prompt(promptUpdateEmployeeRole)
   .then((answers) => {
      // console.log(answers);
      updateEmployeeRole(answers.employee, answers.newEmpRole);
   });
}

function processMainMenuChoice(mainActionChoice) {

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
      console.log("addadepartment")
      addDepartment();
      break;
    case 'addarole': 
      addRole();
      break;
    case 'addanemployee': 
      addEmployee();
      break;
    case 'updateanemployeerole':
      changeEmployeeRole();
      break;
  };
    // if (mainActionChoice === 'viewalldepartments') {
    //     selectAllDepartments();
    // } else if(mainActionChoice === 'viewallroles') {
    //     selectAllRoles();
    // } else if(mainActionChoice === 'viewallemployees') {
    //     selectAllEmployees();
    // } else if(mainActionChoice === 'addadepartment') {
    //     addDepartment();
    // } else if(mainActionChoice === 'addarole') {
    //     addRole();
    // } else if(mainActionChoice === 'addanemployee') {
    //     addEmployee();
    // } else if(mainActionChoice === 'updateanemployeerole') {
    //     changeEmployeeRole();
    // };
}

function main() {
  // Welcome
  console.log('Manage Employees, Roles, and Departments...');
  // Start menus
  mainMenu();
}

main()
// addRole();
// ----------------------------------------------


