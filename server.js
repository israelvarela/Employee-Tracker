const inquirer = require('inquirer');
const connection = require('./db/connection');
const DB = require('./db/DB');
require('dotenv').config();
const { printTable } = require('console-table-printer');
var asciimo = require('asciimo').Figlet;
var colors = require('colors');
var sys = require('util');

// Welcome sign
art();
function art() {
  var font = 'colossal';
  // Leet ASCII Art
  var text = "Hello!";
  asciimo.write(text, font, function(art){
  console.log(art.magenta);
  });
  start();
}

function runSearch() {
}

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View employees",
        "View roles",
        "View departments",
        "Add department",
        "Add employee",
        "Add role",
        "Update employee role",
        "Delete employee",
        "Delete department",
        "Delete role",
        "Exit"
      ]
    })
    .then(function (answer) {
      // Switch functions
      switch (answer.action) {
        case "View all employees":
          findAllEmployees();
          break;

        case "View all roles":
          viewRoles();
          break;  

        case "View all departments":
          findAllDepartments();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
        break;

        case "Add employee":
          addEmployee();
        break;

        case "Update employee role":
          updateEmployeeRole();
          break;

        case "Delete employee":
          deleteEmployee();
          break;

        case "Delete department":
          deleteDepartment();
          break;

        case "Delete role":
            deleteRole();
            break;

      }
    });
}

// Departments List
function findAllDepartments() {
  DB.findAllDepartments().then(function (res) {
    printTable(res)
    start();
  })
}

// Employees List
function findAllEmployees() {
  DB.findAllEmployees().then(function(res) {
    printTable(res)
    start();
  })
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message: "What employee would you like to search for?"
    })
    .then(function (answer) {
      var query = "SELECT employee FROM employeeTracker_DB WHERE ?";
      connection.query(query, { employee: answer.employee }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("employee: " + res[i].department + " || salary " + res[i].role + " || manager " + res[i].manager);
          start();
        }
    
        runSearch();
      
      });
    });
}

// Roles List
function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    //if (err) throw err;

    console.table(res);
    start()

  });

}

function managerSearch() {
  var query = "SELECT manager FROM employeeTracker_DB GROUP BY manager HAVING count(*) > 1";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].manager);
    }
    runSearch();
  });
}

// Adding A Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "departmentList",
        type: "input",
        message: "What department do you want to add?",
      }
    ])
    .then(answers => {
      // Creating a query connection to insert in to table
      connection.query(
        "INSERT INTO department SET ?",
        {
          department_Name: answers.departmentList
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " New department inserted!\n");
          
          start();
        }
      );
      
        runSearch();
      });
}

// Adding a new employee
function addEmployee() {
  inquirer
    .prompt([ {
      type: "input",
      name: "firstName",
      message: "What is employee first name?"
    }, 
    { 
      type: 'input', 
      name: "lastName",
      message: "What is employee last name?"
   },
   {
      type: 'input', 
      name: "manager_id",
      message: "What is your manager id?"
 },
   {
      type: 'input', 
      name: "role_id",
      message: "What is employee role id?"
   }

  ])
    .then(answers => {
      console.log(answers);
      connection.query(
        "INSERT INTO employee SET ?", 
      { 
       
        employee_firstName: answers.firstName, 
        employee_lastName: answers.lastName,
        role_id: answers.role_id,
        manager_id: answers.manager_id
         
        }, 
        function (err, res) {
          if (err) throw err;
            console.error(res.affectedRows + " New employee inserted!\n");
            start();
          }
        );
         
    });

}

// Adding a new role
function addRole() {
  inquirer
    .prompt([ {
        type: "input",
        name: "title",
        message: "What title do you want to add?",
      },
      { 
        type: "input", 
        name: "salary",
        message: "What salary do you want to add?"
     },
     {
        type: 'input', 
        name: "department_id",
        message: "What the department id?"
   }
    ])
    .then(answers => {
      // Creating a query connection to insert in to table
      console.log(answers);
      connection.query(
        "INSERT INTO role SET ?",
        {
   
            title: answers.title, 
            salary: answers.salary,
            department_id: answers.department_id

        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " New role inserted!\n");
          start();
        }
      );
      
        runSearch();
      });
}

// Updating an employees role
function updateRole() {
DB.findAllEmployees()
.then(([_rows_]) => {
  let employees = rows;
  const employeeChoices = employees.map
  (({id, employee_firstName, employee_lastName}) => 
  console.log("EMp data: "+id +" "+employee_firstName+" "+employee_lastName));
  /*({
    name: `${employee_firstName} ${employee_lastName}`,
    value: id
  }))*/
// prompt 
inquirer
.prompt([
  {
    type: "list",
    name: "employee_firstName",
    message: "Please select employee to update",
    choices: employeeChoices
  }
])
.then(answers => {
  console.log("Employee info: "+answers.employee_firstName)
  changeRole(answers.employee_firstName);
})
.catch(error => {
  if(error.isTtyError) {
  } else {

  }
});
})
}


// Updating employees role in  the database
function updateEmployeeRole() {
var temp = [];
  connection.query("SELECT id,employee_firstName,employee_lastName FROM employee", function (err, res) {
    if (err) throw err;
    res.map(employee => temp.push(employee.id +" "+employee.employee_firstName+" "+employee.employee_lastName));
    inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Please select employee to update",
        /*choices: res.map(employee => employee.employee_firstName)*/
        choices: temp
      }
    ])
    .then(answers => {
      var id = answers.split(" ")[0];
      connection.query("UPDATE employee SET role_id=? WHERE employee_firstName, employee_lastName=?", 
      [answers.updateRole, answers.updateEmployeeRole],function(err, res) {
        if(err) throw err;
        console.log(res);
        // start();
      })
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }
    });
    
  });
  // start();

}

// Deleting an employee from the database
function deleteEmployee() {
  connection.query(
    "SELECT employee_firstName FROM employee", function (err, res) {
    if (err) throw err;

  // Choose from list of employees to delete
    inquirer
    .prompt([
      {
        type: "list",
        name:"deleteEmployee",
        message: "Enter name of employee to remove",
        choices: res.map(employee => employee.employee_firstName)
      }
    ])
    .then(answers => {
      removeEmployee(answers.deleteEmployee)
    
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }

    });
  });

}

// Deletes employee from database
function removeEmployee(exEmployee) {

  // query to delete
  connection.query(
    "DELETE FROM employee WHERE employee_firstName = ?",
    exEmployee, 
  
    function(err, res) {
      if (err) throw err;
      console.log("Employee removed!\n");
       
    }
  );
  start();  
}

// Removes the role from the database 
function deleteRole() {
  connection.query(
    "SELECT title FROM role", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"deleteRole",
        message: "Please select role to remove",
        choices: res.map(role => role.title)
      }
    ])
    .then(answers => {
      removeRole(answers.deleteRole)
    
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }

    });
  });
  
}

// Deletes employee role from database
function removeRole(oldRole) {

  connection.query(
    "DELETE FROM role WHERE title = ?",
    oldRole,
  
    function(err, res) {
      if (err) throw err;
      console.log("Role removed!\n");
     
    }
  );
  start();
}

// Removes a department from the database
function deleteDepartment() {
  connection.query(
    "SELECT department_name FROM department", function (err, res) {
    if (err) throw err;

    inquirer
    .prompt([
      {
        type: "list",
        name:"deleteDepartment",
        message: "Please select department to remove",
        choices: res.map(department => department.department_name)
      }
    ])
    .then(answers => {
      removeDepartment(answers.deleteDepartment)
    
    })
    .catch(error => {
      if(error.isTtyError) {
        
      } else {
        
      }

    });
  });
  
}

// Deletes a department from the database
function removeDepartment(oldDepartment) {

  // query to delete
  connection.query(
    "DELETE FROM department WHERE department_name = ?",
    oldDepartment,
  
    function(err, res) {
      if (err) throw err;
      console.log("Department removed!\n");
      
    }
  );
 start();
}