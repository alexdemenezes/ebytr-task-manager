CREATE DATABASE TASK_MANAGER;

CREATE TABLE TASK_MANAGER.users (
  id INT  AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  PRIMARY KEY(id)
);

CREATE TABLE TASK_MANAGER.tasks (
  id INT AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  status VARCHAR(15) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

INSERT INTO TASK_MANAGER.users (username, email, password, verified) VALUES ('developer', 'dev.emailtest404@gmail.com', 'abc123ABC', true);

INSERT INTO TASK_MANAGER.tasks (title, description, status, user_id) VALUES ('entregar projeto', 'entregar o projeto da blitz de carreira até 05/07', 'pendente', 1);
