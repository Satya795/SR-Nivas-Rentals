-- Optional: Spring Boot creates this table by itself.
-- Run this in MySQL Workbench only if you want to create it by hand.
CREATE DATABASE IF NOT EXISTS srnivas;
USE srnivas;

CREATE TABLE IF NOT EXISTS visit_requests (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  phone      VARCHAR(20)   NOT NULL,
  home       VARCHAR(150),
  message    VARCHAR(1000),
  created_at DATETIME
);

-- See all visit requests:
SELECT * FROM visit_requests ORDER BY created_at DESC;
