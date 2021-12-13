# Employee-Tracker
[![License](https://img.shields.io/badge/License-ISC-red.svg)](https://opensource.org/licenses/ISC)

## Application Video Tutorial
<a href="chrome-extension://mmeijimgabbpbgpdklnllpncmdofkcpn/app.html#/files/7b56a915-ce58-4222-y672-808cf51b868f">Click here to watch me walk you through my application!</a>

## Description
Employee-Tracker is a command-line application that manages a company's employee database. It serves as a content management system (CMS) and utilizes Node.js, Inquirer, and MySQL.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

<a name="install"></a>
## Installation
In order to successfully use this project, the user must have Node.js installed on their machine. This will give the user access to a number of Node's modules, most importantly 'inquirer', 'mysql2', 'dotenv', and 'console.table'. Users should install each of these packages in the root directory by typing 'npm install inquirer, mysql2, dotenv, console.table' in the terminal. Users must also create a .env file in the root of their project directory in order to store their sensitive mysql connection information (e.g. DB_HOST='host', DB_USER='username', DB_PASS='password', DB_DATABASE='employee_database'). Ensure that the '.env' file is added to the '.gitignore' file.

<a name="usage"></a>
## Usage
This project is intended to allow a company and/or manager to easily view, add, and update data regarding their company's departments, roles, and employees. When run, by typing 'node index.js' into the command line terminal, the user will select a series of prompts in order to interact with the database accordingly.

<a name="license"></a>
## License
Notice: this application is covered under the ISC license.

<a name="contribute"></a>
## Contributing
If you would like to contribute to this project, submit a pull request within the repository.

<a name="tests"></a>
## Tests
In order to test this project, I recommend installing a JavaScript testing framework, such as Jest, and following their documentation for installation requirements, file structure, syntax, etc. This project is not currently setup with any JavaScript testing frameworks.

<a name="questions"></a>
## Questions
Have more questions about this particular project? Explore one or all of the following options:
* Shoot me an email at <a href = "mailto: mtlankenau@gmail.com">mtlankenau@gmail.com</a>
* Explore my profile on Github by <a href="https://www.github.com/mtlankenau">clicking this link</a>
