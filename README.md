# Employee Tracker

## Description

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn?

This project allows a business owner to view and manage the departments, roles, and employees in a company, so they can organize and plan their business.

The main focus of this project is on implementing n-tier architecture consisting of a MySQL database with a NodeJS web-server in the middle. NPM MySQL2 is used for database interface. A console-based client UI uses the NPM Inquirer for user interaction and NPM console.table to display query results in a column/row format with headers.  The project supports basic CRUD operations (absent any Delete capability at present).  The database is a normalized, relational database consisting of multiple tables with unique Primary Keys and Foreign Key relationships configured between tables to facilitate usability requirements.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Features](#features)

## Installation

- Clone the GitHub repository.
- Run `npm i` to install requirements.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

- Run `node index.js` from the root of the app folder to start.
- Use the application prompts to view, add, and update data in the database.
- To quit the application, use `CTRL+C`.

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```


## License

[MIT License](LICENSE)


## Features

Project requirements
- Command-line interface with selection menus providing access to functionality
- View all Departments (Dept Names and IDs)
- View all Roles (ID, Title, Salary, and Department Name)
- View all Employees (Employee ID, First Name, Last Name, Title, Salary, and Department)
- Add new Departments (Dept Name)
- Add new Roles (Title, Salary, and select Department Name)
- Add new Employees (First Name, Last Name, select Title, and assign to Manager)
- Update employee roles (select Employee by name and current role, select new role from list).

