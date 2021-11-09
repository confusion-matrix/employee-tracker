USE employee_db

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Engineer", 120000, 2), ("Account Manager", 160000, 3), ("Accountant", 125000, 3), ("Legat Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 3, null), ("Mike", "Chan", 4, null), ("Ashley", "Rodriguez", 3, null), ("Kevin", "Tupik", 2, null), ("Malia", "Brown", 6,  null), ("Sarah", "Lourd", 1, null), ("Tom", "Alen", 6, null), ("Christian", "Eckenrode", 2, null);