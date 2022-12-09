// Import and require Inquirer
// const inquirer = require('inquirer');
// const { addDepartment, } = require('../index.js');
const { 
  selectDeptsForRole, 
  selectRolesForEmp,
  selectManagerForEmp,
  selectEmpForRoleUpdate, } = require('./sql');

// Main menu
const chooseMainAction = [
  {
    type: 'list',
    name: 'mainActionChoice',
    message: 'Choose an action: ',
    choices: 
      ['View all Departments',
      'View all Roles',
      'View all Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role'
      // BONUS functionalities
    ],
    filter(val) {
      return val.toLowerCase().replaceAll(' ','');
    },
    loop: false
  }
]

const promptDepartmentName = [
  {
    type: 'input',
    message: 'Enter the Department Name: ',
    name: 'departmentName',
  },
]

const promptRoleName = [
  {
    type: 'input',
    message: 'Enter Role Name: ',
    name: 'roleName',
  },
  {
    type: 'input',
    message: 'Enter Salary: ',
    name: 'roleSalary',
  },
  {
    type: 'list',
    message: 'Department to assign new Role: ',
    name: 'roleDepartment',
    choices: () => {
      return selectDeptsForRole();
    },
    loop: false
  }
]

const promptEmployeeInfo = [
  {
    type: 'input',
    message: 'Enter First Name: ',
    name: 'empFirstName',
  },
  {
    type: 'input',
    message: 'Enter Last Name: ',
    name: 'empLastName',
  },
  {
    type: 'list',
    message: 'Select Employee\'s Role (Use \"Add a Role\" if not listed): ',
    name: 'empRole',
    choices: () => { return selectRolesForEmp() },
    loop: false
  },
  {
    type: 'list',
    message: 'Assign to Manager (Use): ',
    name: 'empManager',
    choices: () => { return selectManagerForEmp() }, 
    loop: false
  }
]

const promptUpdateEmployeeRole = [
  {
    type: 'list',
    message: 'Select Employee: ',
    name: 'employee',
    choices: () => { 
      return selectEmpForRoleUpdate();
    },
    loop: false
  },
  {
    type: 'list',
    message: 'Select New Role: ',
    name: 'newEmpRole',
    choices: () => { 
      return selectRolesForEmp();
    },
    loop: false
  },
]

//Exports
module.exports = {
  chooseMainAction,
  promptDepartmentName,
  promptRoleName,
  promptEmployeeInfo,
  promptUpdateEmployeeRole
};