const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

inquirer.prompt ([
    {
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the team manager's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
    },
    
]).then(function(data) {
    const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
    teamMembers.push(manager);
    createTeam();
});

const teamMembers = [];

function createTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add next?",
            choices: [
                "Engineer",
                "Intern",
                "I am finished, thanks."
            ]
        }
    ]).then(function(data) {
        if (data.memberChoice === "Engineer") {
            createEngineer();
        } else if (data.memberChoice === "Intern") {
            createIntern();
        } else (renderTeam());
    });
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?",
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
        },
    ]).then(function(data) {
        const engineer = new Engineer(data.name, data.id, data.email, data.github);
        teamMembers.push(engineer);
        createTeam();
    });
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?",
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?",
        },
    ]).then(function(data) {
        const intern = new Intern(data.name, data.id, data.email, data.school);
        teamMembers.push(intern);
        createTeam();
    });
}

function renderTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

