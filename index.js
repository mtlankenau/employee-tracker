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

const addDepartmentPrompt = () => {
  return inquirer.prompt([
    {
      type: 'text',
      name: 'newDepartment',
      message: 'Enter the name of the new department.',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter the new department name!')
          return false;
        }
      }
    }
  ])
}

const handleChoice = () => {
  initialOptions()
    .then(selection => {
      if (selection.choice === 'View all departments') {
        viewDepartments();
      } else if (selection.choice === 'View all roles') {
        viewRoles();
      } else if (selection.choice === 'View all employees') {
        viewEmployees();
      } else if (selection.choice === 'Add a department') {
        addDepartmentPrompt()
          .then(selection => addNewDepartment(selection.newDepartment))
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

const addNewDepartment = (department) => {
  const sql = `INSERT INTO department (name)
              VALUES ('${department}')`;

  db.promise().query(sql)
    .then( ([rows,fields]) => {
      console.log(
`===========================================================

The ${department} department has been added to the database!

===========================================================`)
    })
    .catch(console.log)
    .then(handleChoice);
}

handleChoice();