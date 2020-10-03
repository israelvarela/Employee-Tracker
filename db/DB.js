const connection = require("./connection");

class DB {
    constructor() {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.query("SELECT * FROM department")
    }
    findAllEmployees() {
        return this.connection.query
        ("SELECT employee.id, employee_firstName, employee_lastName, role.title, department. department_name AS department, role.salary FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;")
    }
    findAllRoles() {
        return this.connection.query("SELECT * FROM role")
    }
}

module.exports = new DB(connection)