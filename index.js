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
};

const addRolePrompt = () => {
  return inquirer.prompt([
    {
      type: 'text',
      name: 'newRoleName',
      message: 'Enter the name of the new role.',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter the new role name!')
          return false;
        }
      }
    },
    {
      type: 'number',
      name: 'newRoleSalary',
      message: 'Enter the salary of this new role.',
      validate: salaryInput => {
        if (salaryInput) {
          return true
        } else {
          console.log('Please enter the salary for this particular role!')
          return false;
        }
      }
    },
    {
      type: 'number',
      name: 'newRoleDepartment',
      message: 'Enter the ID of the department that this new role is within',
      validate: departmentInput => {
        if (departmentInput) {
          return true
        } else {
          console.log('Please enter the ID (number) of the department associated with this new role!')
          return false;
        }
      }
    }
  ])
};

const addEmployeePrompt = () => {
  return inquirer.prompt([
    {
      type: 'text',
      name: 'newEmployeeFirstName',
      message: 'Enter the first name of the new employee.',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter the first name of the new employee!')
          return false;
        }
      }
    },
    {
      type: 'text',
      name: 'newEmployeeLastName',
      message: 'Enter the last name of the new employee.',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log('Please enter the last name of the new employee!')
          return false;
        }
      }
    },
    {
      type: 'number',
      name: 'newEmployeeRole',
      message: 'Enter the ID of the role of this new employee',
      validate: roleInput => {
        if (roleInput) {
          return true
        } else {
          console.log('Please enter the ID (number) of the role associated with this new employee!')
          return false;
        }
      }
    }
  ])
};

const updateEmployeeRolePrompt = () => {
  return inquirer.prompt([
    {
      type: 'number',
      name: 'employeeIdChoice',
      message: 'Please enter the ID of the employee whose role you would like to update',
      validate: employeeIdInput => {
        if (employeeIdInput) {
          return true
        } else {
          console.log('Please enter the ID (number) of the employee whose role you would like to update!')
          return false;
        }
      }
    },
    {
      type: 'number',
        name: 'roleIdChoice',
        message: 'Enter the ID of the new role of this employee',
        validate: roleInput => {
          if (roleInput) {
            return true
          } else {
            console.log('Please enter the ID (number) of the role associated with this new employee!')
            return false;
          }
        }
    }
  ])
};

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
          .then(selection => addNewDepartment(selection))
      } else if (selection.choice === 'Add a role') {
        addRolePrompt()
          .then(selection => addNewRole(selection))
      } else if (selection.choice === 'Add an employee') {
        addEmployeePrompt()
          .then(selection => addNewEmployee(selection))
      } else if (selection.choice === 'Update an employee role') {
        updateEmployeeRolePrompt()
          .then(selection => updateEmployeeRole(selection))
      }
    });
};

const viewDepartments = () => {
  const sql = `SELECT id, name AS department FROM department`;

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
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
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
              VALUES ('${department.newDepartment}')`;

  db.promise().query(sql)
    .then( ([rows,fields]) => {
      console.log(
`===========================================================

The ${department.newDepartment} department has been added to the database!

===========================================================`)
    })
    .catch(console.log)
    .then(handleChoice);
};

const addNewRole = (role) => {
  const sql = `INSERT INTO role (title, salary, department_id)
              VALUES ('${role.newRoleName}', ${role.newRoleSalary}, ${role.newRoleDepartment})`;

  db.promise().query(sql)
    .then( ([rows,fields]) => {
      console.log(
`===========================================================

The ${role.newRoleName} role has been added to the database!

===========================================================`)
    })
    .catch(console.log)
    .then(handleChoice);
};

const addNewEmployee = (employee) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id)
              VALUES ('${employee.newEmployeeFirstName}', '${employee.newEmployeeLastName}', ${employee.newEmployeeRole})`;

  db.promise().query(sql)
    .then( ([rows,fields]) => {
      console.log(
`===========================================================

New employee (${employee.newEmployeeFirstName} ${employee.newEmployeeLastName}) has been added to the database!

===========================================================`)
    })
    .catch(console.log)
    .then(handleChoice);
};

const updateEmployeeRole = (updatedRole) => {
  const sql = `UPDATE employee
              SET role_id = ${updatedRole.roleIdChoice}
              WHERE employee.id = ${updatedRole.employeeIdChoice}`;
  
  db.promise().query(sql)
    .then( ([rows,fields ]) => {
      console.log(
`===========================================================

Employee Role Updated!

===========================================================`)
    })
    .catch(console.log)
    .then(handleChoice);
};

handleChoice();