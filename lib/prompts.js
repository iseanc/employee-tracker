// Import and require Inquirer
const inquirer = require('inquirer');

// Main menu
const promptMainMenu = [
  {
    type: 'list',
    name: 'mainMenu',
    message: 'Choose an action: ',
    choices: 
      ['View all Departments',
      'View all Roles',
      'View all Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role'],
    filter(val) {','return val.toLowerCase().replaceAll(' ','');
    }
  }
]

module.exports = {
  // add items as created above
};