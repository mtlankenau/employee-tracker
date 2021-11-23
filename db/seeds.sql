  INSERT INTO department (name)
  VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

  INSERT INTO role (title, salary, department_id)
  VALUES
  ('Sales Lead', 110000, 1),
  ('Salesperson', 85000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Finance Lead', 130000, 3),
  ('Accountant', 75000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 180000, 4);

  INSERT INTO employee (first_name, last_name, role_id)
  VALUES
  ('Joe', 'Average', 2),
  ('Ted', 'Hammond', 1),
  ('Layla', 'Jones', 3),
  ('Jennifer', 'Smith', 5);
