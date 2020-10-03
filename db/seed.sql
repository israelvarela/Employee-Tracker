-- insert department;
INSERT INTO department (department_name)
VALUES ("Human Resources");

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO department (department_name)
VALUES ("Operations");

INSERT INTO department (department_name)
VALUES ("Logistics");

INSERT INTO department (department_name)
VALUES ("Loss Prevention");

INSERT INTO department (department_name)
VALUES ("IT");

-- insert role;
INSERT INTO role (title, salary, department_id)
VALUES ("Director", 70000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Director", 90000, 4);

-- insert employee;
INSERT INTO employee (employee_firstName, employee_lastName, role_id, manager_id)
VALUES ("Jason", "Scott", 6, null);

INSERT INTO employee (employee_firstName, employee_lastName, role_id, manager_id)
VALUES ("Tyler", "Perry", 4, null);

INSERT INTO employee (employee_firstName, employee_lastName, role_id, manager_id)
VALUES ("Megan", "Fox", 5, null);

INSERT INTO employee (employee_firstName, employee_lastName, role_id, manager_id)
VALUES ("Kristen", "Durst", 3, null);

