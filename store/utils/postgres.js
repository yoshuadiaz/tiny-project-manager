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

CREATE TABLE "status_user" (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(20) NOT NULL,
  description VARCHAR(250),
  PRIMARY KEY (id)
);

INSERT INTO "public"."status_user" ("id", "name", "description")
VALUES
  ('27ed4728-936e-43c2-a850-c6034ab5d1d2', 'active', 'Activo'),
  ('ec0aa253-47e0-498d-adc2-a69a432f48ad', 'inactive', 'Inactivo');

CREATE TABLE work_type (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100) NOT NULL
);

INSERT INTO "public"."work_type" ("id", "name", "description")
VALUES
  ('cbeb8fb9-bf3f-42ed-8be1-88793e084cc9', 'full_time', 'Full-time'),
  ('b532da16-668a-4595-8a85-4e1195dc9752', 'part_time', 'Part-time'),
  ('ae44b857-f974-48e8-8670-878fdeecb142', 'self_employed', 'Self-employed'),
  ('13e5e588-1721-4ad2-b93a-b457318a8c32', 'casual', 'Casual'),
  ('4b3d9993-46e3-43f1-ba8b-4a26111bc865', 'temporary', 'Temporary'),
  ('d3dc6d3d-5f29-4542-a66e-746181deaee8', 'contract', 'Contract'),
  ('17721b58-aedf-48d8-a033-3cd1b3c3d86d', 'home_office', 'Home office'),
  ('912e7e9d-26c0-4542-b71e-b216f3746d52', 'portfolio', 'Portfolio');

CREATE TABLE "user" (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  first_name VARCHAR(150) NOT NULL,
  last_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  company_id uuid NOT NULL,
  salary FLOAT,
  currency VARCHAR(4),
  status_id uuid,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  work_type_id uuid,
  PRIMARY KEY (id),
  FOREIGN KEY (company_id) REFERENCES company (id),
  FOREIGN KEY (status_id) REFERENCES "status_user" (id),
  FOREIGN KEY (work_type_id) REFERENCES "work_type" (id)
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

CREATE TABLE "status_project" (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(20) NOT NULL,
  description VARCHAR(250),
  PRIMARY KEY (id)
);

INSERT INTO "public"."status_project" ("id", "name", "description")
VALUES
  ('9f3b759b-8f52-49ea-bbfd-f06543d59af2', 'not_initialized', 'Sin iniciar'),
  ('25febb98-6632-41d7-bd3c-b5b990bcedc3', 'running', 'En curso'),
  ('b7af5b2e-c36e-4993-b41e-deddc818d2ac', 'finished', 'Finalizado');

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
  FOREIGN KEY (status_id) REFERENCES "status_project" (id),
  FOREIGN KEY (created_by) REFERENCES "user" (id),
  FOREIGN KEY (project_manager_id) REFERENCES "user" (id),
  FOREIGN KEY (client_id) REFERENCES "client" (id),
  FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE gender (
  id uuid UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO "public"."gender" ("id", "name")
VALUES
  ('ee79a230-ee3b-47a0-9efe-ba4e8b8b4838', 'male'),
  ('ace51bc8-e49d-43c6-9fec-ffc65cfd9c90', 'female'),
  ('810604b8-53e5-4b66-a657-ed31493b9970', 'other');

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
