const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/renderHtml");

let employeeInput = [];

const enterInfo = () => {
    inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Select a type of Employee:',
                choices: [
                'Manager',
                'Engineer',
                'Intern'
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'Name:'
            },
            {
                type: 'input',
                name: 'id',
                message: 'ID:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Email:'
            },
        ])
        .then(defaultAnswers => {
            const {role} = defaultAnswers;
        switch(role) {
            case 'Manager':
                specificQuestions(role, "officeNumber", "What is the Manager's office number?", defaultAnswers);
            break;

            case 'Engineer':
                specificQuestions(role, "github", "What is the Engineer's Github profile username?", defaultAnswers);
            break;

            case 'Intern':
                specificQuestions(role, "school", "Where does the Intern go to school?", defaultAnswers);
            break;
        }
    });
}
  
const specificQuestions = (role, inputType, messageText, defaultAnswers) => {

    inquirer.prompt([
            {
                type: 'input',
                name: inputType,
                message: messageText
            }
        ])
        .then(answers => {

            let answer;

            for (let key in answers) {
                answer = answers[key];
            }

            const { name, id, email } = defaultAnswers;
            let employee;
            
            switch(role) {
                case 'Manager':
                    employee = new Manager(name, id, email, answer);
                break;

                case 'Engineer':
                    employee = new Engineer(name, id, email, answer);
                break;
                
                case 'Intern':
                    employee = new Intern(name, id, email, answer);
                break;
            }
            employeeInput.push(employee);
            anotherEmployee();
        });

}

const anotherEmployee = () => {
    inquirer.prompt([
            {
                type: 'confirm',
                name: 'new_entry',
                message: 'Would you like to enter another employee?'
            }
        ])
        .then(answer => {
            if (answer.new_entry === true) {
                enterInfo();
            }
            else {
                const html = render(employeeInput);
                writeHTMLtoFile(html);
            }
        });
}

const writeHTMLtoFile = (html) => {

    fs.writeFile(outputPath, html, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Data successfully written to team.html file.");
      
    });

};

enterInfo();