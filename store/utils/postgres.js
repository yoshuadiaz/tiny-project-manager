const postgresInit = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE company (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  website VARCHAR(150) NOT NULL,
  industry VARCHAR(150) NOT NULL,
  description VARCHAR(250) NOT NULL,
  phone VARCHAR(150) NOT NULL,
  address VARCHAR(250) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

CREATE TABLE "user" (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  first_name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  company_id uuid NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE auth (
  id uuid NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  is_bloqued BOOLEAN DEFAULT FALSE,
  is_confirmed BOOLEAN DEFAULT FALSE,
  reset_token VARCHAR(60),
  confirmation_token VARCHAR(60),
  company_id uuid,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE "client" (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  website VARCHAR(150),
  industry VARCHAR(150),
  description TEXT,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(250) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by uuid,
  company_id uuid,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company (id),
  FOREIGN KEY (created_by) REFERENCES "user" (id)
);

CREATE TABLE "status" (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(20) NOT NULL,
  description VARCHAR(250),
  PRIMARY KEY (id)
);

CREATE TABLE project (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  start_date TIMESTAMP DEFAULT NOW(),
  budget FLOAT NOT NULL,
  currency VARCHAR(4) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  created_by uuid NOT NULL,
  project_manager_id uuid,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  status_id uuid NOT NULL,
  client_id uuid NOT NULL,
  company_id uuid NOT NULL,
  observations TEXT,
  PRIMARY KEY (id),
  FOREIGN KEY (status_id) REFERENCES "status" (id),
  FOREIGN KEY (created_by) REFERENCES "user" (id),
  FOREIGN KEY (project_manager_id) REFERENCES "user" (id),
  FOREIGN KEY (client_id) REFERENCES "client" (id),
  FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE gender (
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE contact (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  first_name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  gender_id uuid NOT NULL,
  occupation VARCHAR(100),
  phone VARCHAR(20) NOT NULL,
  birthday TIMESTAMP,
  notes TEXT,
  client_id uuid NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES client (id),
  FOREIGN KEY (gender_id) REFERENCES gender (id)
);

CREATE TABLE user_project (
  id uuid DEFAULT uuid_generate_v4(),
  project_id uuid,
  user_id uuid,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (user_id) REFERENCES "user" (id)
);

CREATE TABLE contact_project (
  id uuid DEFAULT uuid_generate_v4(),
  project_id uuid,
  contact_id uuid,
  PRIMARY KEY (id),
  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (contact_id) REFERENCES contact (id)
);
`

export default postgresInit
