const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const initialOptions = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ]
    }
  ])
};

const handleChoice = () => {
  initialOptions()
    .then(selection => {
      if (selection.choice === 'View all departments') {
        return viewDepartments();
      } else if (selection.choice === 'View all roles') {
        return viewRoles();
      } else if (selection.choice === 'View all employees') {
        return viewEmployees();
      }
    })
};

const viewDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.promise().query(sql)
    .then( ([rows,fields]) => {
      console.table(rows)
    })
    .catch(console.log)
    .then(handleChoice);
};

const viewRoles = () => {
  const sql = `SELECT role.id, role.title, role.salary, department.name AS department
              FROM role
              LEFT JOIN department
              ON role.department_id = department.id`;

  db.promise().query(sql)
  .then( ([results]) => {
    console.table(results)
  })
  .catch(console.log)
  .then(handleChoice);
};

const viewEmployees = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary
              FROM employee
              JOIN role
              ON employee.role_id = role.id
              JOIN department
              ON role.department_id = department.id`;

  db.promise().query(sql)
  .then( ([results]) => {
    console.table(results)
  })
  .catch(console.log)
  .then(handleChoice);
};

handleChoice();