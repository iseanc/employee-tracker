// Import and require Inquirer
const inquirer = require('inquirer');

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

module.exports = {
  // add items as created above
  chooseMainAction
};