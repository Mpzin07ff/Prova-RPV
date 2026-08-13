-- Catálogo de Filmes — schema do banco
-- Execução: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS catalogo_filmes;
USE catalogo_filmes;

CREATE TABLE IF NOT EXISTS movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  director VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  genre VARCHAR(50) NOT NULL,
  watched BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
