const inquirer = require("inquirer")
const mySql = require("mysql")
const cTable = require('console.table');

// Establish SQL Server connection
const connection = mySql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "password",
    database: "employee_db"
});
// Explain this
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

function init() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select an option",
                name: "userChoice",
                choices:
                    [
                        "View All Employees?", 
                        "View All Employee's By Roles?",
                        "View all Emplyees By Deparments", 
                        "Update Employee",
                        "Add Employee?",
                        "Add Role?",
                        "Add Department?"
                    ]
            }
        ])
        .then(function(answer) {
            switch (answer.choice) {
                case "View All Employees?":
                    viewEmployees();
                break;
        
                case "View All Employee's By Roles?":
                    viewRoles();
                    break;
                case "View all Emplyees By Deparments":
                    viewDepartments();
                    break;
              
                case "Add Employee?":
                    addEmployee();
                    break;
                case "Update Employee":
                    updateEmployee();
                    break;
          
                case "Add Role?":
                    addRole();
                    break;
          
                case "Add Department?":
                    addDepartment();
                    break;
            }
        })
}

function viewEmployee() {
    
}

function viewRoles() {

}

function viewRoles() {

}

function viewDepartments() {

}

function addEmployee() {

}

function updateEmployee() {

}

function addRole() {

}

function addDepartment() {
    
}