// Import and require Inquirer
const inquirer = require('inquirer');
const { addDepartment, } = require('../index.js');
const {selectAllDepartments, selectDeptsForRole,  } = require('./sql');

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
  },
  
  // {
  //   async choices() {
  //     await new Promise(function(resolve, reject) {
  //       return resolve(selectDeptsForRole());
  //     })
  //       // (r) => {return selectDeptsForRole()});
  //   }
  // }
]

//Exports
module.exports = {
  chooseMainAction,
  promptDepartmentName,
  promptRoleName,
};