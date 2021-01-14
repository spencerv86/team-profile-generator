const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's ID no.?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email address?",
        validate: function (input) {
            if (/^[\w|\W]+@[a-zA-Z0-9]+.com$/.test(input)){
                return true;
            } else {
                return "You must provide a valid email."
            };
        },
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
    },
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        validate: function (input) {
            if (/^[\w|\W]+@[a-zA-Z0-9]+.com$/.test(input)){
                return true;
            } else {
                return "You must provide a valid email."
            };
        },
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's github username?",
    },
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your intern's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        validate: function (input) {
            if (/^[\w|\W]+@[a-zA-Z0-9]+.com$/.test(input)){
                return true;
            } else {
                return "You must provide a valid email."
            };
        },
    },
    {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
    },
];

const createEmployee = [
    {
        type: "list",
        name: "nextEmployee",
        message: "What type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"],
    },
];

function askManager() {
    inquirer.prompt(managerQuestions).then((response) => {
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        employees.push(newManager);
        askToContinue();
        // console.log(response);
    });
};

function askEngineer() {
    inquirer.prompt(engineerQuestions).then((res) => {
        const newEngineer = new Engineer(res.name, res.id, res.email, res.github);
        employees.push(newEngineer);
        askToContinue();
    });
};

function askIntern() {
    inquirer.prompt(internQuestions).then((res) => {
        const newIntern = new Intern(res.name, res.id, res.email, res.school);
        employees.push(newIntern);
        askToContinue();
    });
};

function askToContinue() {
    inquirer.prompt(createEmployee).then((res) => {
        switch (res.nextEmployee){
            case "Engineer": 
                askEngineer();
                break;

            case "Intern":
                askIntern();
                break;
            
            default:
                buildTeam();
        }
    })
};

function buildTeam() {
    console.log(employees);
    if (!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
    };
    fs.writeFileSync(outputPath, render(employees), "utf8");
};


function init() {
    askManager();
};

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
