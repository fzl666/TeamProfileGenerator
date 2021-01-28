const fs = require('fs')
const jest = require('jest')
const inquirer = require('inquirer')


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
        switch (answer.role){
            case 'Engineer':
                inquirer
                .prompt([
                  {
                    name: "github",
                    type: "string",
                    message: "Github username",
                  },  
                ])
                break;
            case 'Intern':
                inquirer
                .prompt([
                  {
                    name: "school",
                    type: "string",
                    message: "Schools's name",
                  }
                ])
                break;
            case 'Manager':
                inquirer
               .prompt([
               {
               name: "office",
               type: "string",
               message: "office number",
               }
            ])
            break;
        }
     })