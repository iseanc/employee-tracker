# Employee Tracker

## Description

This project allows a business owner to view and manage the departments, roles, and employees in a company, so they can organize and plan their business.

The main focus of this project is on implementing n-tier architecture consisting of a MySQL database with a NodeJS web-server in the middle. NPM MySQL2 is used for database interface. A console-based client UI uses the NPM Inquirer for user interaction and NPM console.table to display query results in a column/row format with headers.  The project supports basic CRUD operations (absent any Delete capability at present).  The database is a normalized, relational database consisting of multiple tables with unique Primary Keys and Foreign Key relationships configured between tables to facilitate usability requirements.

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Features](#features)

## Installation

- Clone the GitHub repository.
- Run `npm i` to install requirements.

## Usage

Provide instructions and examples for use. Include screenshots as needed.

**NOTE:** These instructions assume the host computer is running functional installations of NodeJS and MySSQL.

In order to use the app, you must create the application database by running the ./db/schema.sql:

- Start an instance of MySQL CLI.
- At the prompt, run `source ./db/schema.sql`

To add prepared sample data to the database:
- At the MySQL CLI prompt, `run ./db/seeds.sql`

To run and use the application:
- Run `node index.js` from the root of the app folder to start.
- Use the application prompts to view, add, and update data in the database.
- To quit the application, use `CTRL+C`.

**Demo Video**
[![Demo video](/assets/images/EmpTrackerScreen.png)](assets/images/EmployeeTracker.mp4)


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

