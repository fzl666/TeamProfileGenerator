const fs = require('fs')

const engineer = require('./lib/Engineer')
const intern = require('./lib/Intern')
const manager = require('./lib/Manager')
const generate = require('./src/template')

const inquirer = require('inquirer')

const team = []
var ask = () => {
    inquirer
        .prompt([
            {
                name: "name",
                type: "string",
                message: "Employee's name",
            },
            {
                name: "id",
                type: "string",
                message: "Employee's id",
            },
            {
                name: "email",
                type: "string",
                message: "Employee's email",
            },
            {
                name: "role",
                type: "list",
                message: "Employee's role",
                choices: ["Engineer", "Intern", "Manager"],
            },
        ]).then((answer) => {
            var person = answer
            switch (answer.role) {
                case 'Engineer':
                    inquirer
                        .prompt([
                            {
                                name: "github",
                                type: "string",
                                message: "Github username",
                            },
                        ]).then((answer) => {
                            const confirm = new engineer(person.name, person.id, person.email, answer.github)
                            team.push(confirm)
                            console.log(confirm)
                            console.log(team)

                            inquirer
                                .prompt([
                                    {
                                        name: 'confirmation',
                                        type: "confirm",
                                        message: "Keep adding?",
                                    },
                                ]).then((answer) => {
                                    if (answer.confirmation === true) {
                                        ask()
                                    } else if (answer.confirmation === false) {
                                        renderFile()
                                    }
                                })
                        })
                    break;
                case 'Intern':
                    inquirer
                        .prompt([
                            {
                                name: "school",
                                type: "string",
                                message: "Schools's name",
                            }
                        ]).then((answer) => {
                            const confirm = new intern(person.name, person.id, person.email, answer.school)
                            team.push(confirm)
                            console.log(confirm)
                            console.log(team)

                            inquirer
                                .prompt([
                                    {
                                        name: 'confirmation',
                                        type: "confirm",
                                        message: "Keep adding?",
                                    },
                                ]).then((answer) => {
                                    if (answer.confirmation === true) {
                                        ask()
                                    } else if (answer.confirmation === false) {
                                        renderFile()
                                    }
                                })
                        })
                    break;
                case 'Manager':
                    inquirer
                        .prompt([
                            {
                                name: "office",
                                type: "string",
                                message: "office number",
                            }
                        ]).then((answer) => {
                            const confirm = new manager(person.name, person.id, person.email, answer.office)
                            team.push(confirm)
                            console.log(confirm)
                            console.log(team)

                            inquirer
                                .prompt([
                                    {
                                        name: 'confirmation',
                                        type: "confirm",
                                        message: "Keep adding?",
                                    },
                                ]).then((answer) => {
                                    if (answer.confirmation) {
                                        ask()
                                    } else if (!answer.confirmation) {
                                        renderFile()
                                    }
                                })
                        })
                    break;

            }
        })
}

function renderFile() {
    console.log("My team is:", team)
    fs.writeFile('./dist/output.html', generate(team), err => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("SUCCESS!")
        }
    })
}
ask()