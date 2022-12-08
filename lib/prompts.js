// Import and require Inquirer
const inquirer = require('inquirer');
const { addDepartment } = require('..');

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

module.exports = {
  // add items as created above
  chooseMainAction,
  promptDepartmentName,
};