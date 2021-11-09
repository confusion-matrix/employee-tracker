const inquirer = require("inquirer")
const mySql = require("mysql2")
const consoleTable = require('console.table');

var managerArray = [];
var roleArray = [];
var lastNameArray = [];

// Establish SQL Server connection
const connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});
connection.connect(function(err) {
    if (err)
        throw err;
    console.log("Connected");
    init();
});

function init() {
    inquirer
        .prompt([
            { 
                message: "Select an option:",
                type: "list",
                name: "userChoice",
                choices:
                    [
                        "View all employees", 
                        "View all employees by roles",
                        "View all employees by deparments", 
                        "Update employee",
                        "Add employee",
                        "Add role",
                        "Add department"
                    ]
            }
        ])
        .then(function(answer) {
            switch (answer.userChoice) {
                case "View all employees":
                    viewEmployees();
                break;
        
                case "View all employees by roles":
                    viewRoles();
                    break;
                case "View all employees by deparments":
                    viewDepartments();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee":
                    updateEmployee();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add department":
                    addDepartment();
                    break;
            }
        });
}

function viewEmployees() {
    connection.query(`SELECT employee.first_name, 
                        employee.last_name, 
                        role.title,
                        role.salary,
                        department.name,
                        CONCAT(manager.first_name, " ", manager.last_name) AS Manager 
                    FROM employee 
                        INNER JOIN role ON role.id = employee.role_id 
                        INNER JOIN department ON department.id = role.department_id 
                        LEFT JOIN employee manager ON employee.manager_id = manager.id`,    
                            function(err, res) {
                                if (err)
                                    throw err;
                                console.table(res);
                                init();
                            });
}

function viewRoles() {
    connection.query(
        `SELECT employee.first_name,
            employee.last_name, 
            role.title
        FROM employee
            JOIN role ON employee.role_id = role.id`,
            function(err, res) {
                if (err)
                    throw err;
                console.table(res);
                init();
            });

}

function viewRoles() {
    connection.query(
        `SELECT 
            employee.first_name, 
            employee.last_name,
            role.title AS Title 
        FROM employee 
            JOIN role ON employee.role_id = role.id;`,
    function(err, res) {
        if (err)
            throw err;
        console.table(res);
        init();
    });
}

function viewDepartments() {
    connection.query(
        `SELECT employee.first_name,
            employee.last_name,
            department.name AS Department 
        FROM employee 
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
        ORDER BY employee.id;`,
    function(err, res) {
        if (err)
            throw err;
        console.table(res);
        init();
    });
}

function addEmployee() {
    console.log("TEST");
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "First name:"
            },
            {
                name: "lastName",
                type: "input",
                message: "Last name:"
            },
            {
                name: "role",
                type: "list",
                message: "Role:",
                choices: getRoles()
            },
            {
                name: "managerName",
                type: "rawlist",
                message: "Manger Name:",
                choices: getManagers()
            }
        ])
        .then(function(answer) {
            console.log("H");
            connection.query(`INSERT INTO employee SET ?`,
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    manager_id: getManagers().indexOf(answer.managerName) + 1,
                    role_id: getRoles().indexOf(answer.role) + 1
                },
                function(err) {
                    if (err)    
                        throw err;
                    console.table(val);
                    init();
                }
            )
        })
}

function getManagers() {
    console.log("test");
    managerArray = [];
    connection.query(`SELECT first_name,
                        last_name,
                    FROM employee
                    WHERE manager_id IS NULL`,
                function(err, res) {
                    if (err)
                        throw err;
                    // get array of managers
                    res.forEach(element => {
                        managerArray.push(element.first_name + " " + element.last_name);
                    })
                }    
            )
    return managerArray;
}

function getRoles() {
    console.log("test2");
    roleArray = [];
    connection.query(`SELECT *
                    FROM role`,
                function(err, res) {
                    if (err)
                        throw err;
                    res.forEach(element => {
                        roleArray.push(element.title);
                    })
                }
    )
    return roleArray;
}

function updateEmployee() {
    connection.query(
        `SELECT employee.last_name,
            role.title 
        FROM employee 
            JOIN role ON employee.role_id = role.id;`,
        function(err, res) {
            if (err)
                throw err;
            inquirer
                .prompt([
                    {
                        name: "lastName",
                        type: "rawlist",
                        message: "Employee last name:",
                        choices: getLastNames() 
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        message: "New title:",
                        choices: getRoles()
                    }
                ])
                .then(function(answer) {
                    connection.query(`UPDATE employee SET WHERE ?`,
                        {
                           last_name: answer.lastName 
                        },
                        {
                            role_id: roleId
                        },
                        function(err) {
                            if (err)
                                throw err;
                            console.table(answer)
                            init();
                        }
                    
                    )
                });
        });
}

function getLastNames() {
    connection.query(`SELECT last_name
                    FROM employee`,
                    function(err, res) {
                        if (err)
                            throw err;
                        res.forEach(element => {
                            lastNameArray.push(element.last_name);
                        })
                    }
    )
    return lastNameArray;
} 

// Check what is returned in res
function addRole() {
    connection.query(
        `SELECT role.title AS Title,
            role.salary AS Salary 
        FROM role`,
        function(err, res) {
            inquirer
                .prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Title:"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "Salary"
                    }
                ])
                .then(function(res) {
                    connection.query(
                        `INSERT INTO role SET ?`,
                        {
                            title: res.title,
                            salary: res.salary
                        },
                        function(err) {
                            if (err)
                                throw err;
                            console.table(res);
                            init();
                        }
                    )
                    
                })
        }
    )
}

function addDepartment() {
    console.log("TEST");
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "Department:"
            }
        ])
        .then(function(res) {
            
            connection.query(
                `INSERT INTO department SET ?`,
                {
                    name: res.departmentName
                },
                function(err) {
                    if (err)
                        throw err;
                    console.table(res);
                    init();
                }
            )
        })
}