-- Catálogo de Filmes — dados de exemplo
-- Execução: mysql -u root -p < database/seeds.sql

USE catalogo_filmes;

INSERT INTO movies (title, director, year, genre, watched) VALUES
  ('Cidade de Deus', 'Fernando Meirelles', 2002, 'Drama', TRUE),
  ('Parasita', 'Bong Joon-ho', 2019, 'Suspense', TRUE),
  ('Interestelar', 'Christopher Nolan', 2014, 'Ficção Científica', FALSE),
  ('O Poderoso Chefão', 'Francis Ford Coppola', 1972, 'Drama', TRUE),
  ('Duna', 'Denis Villeneuve', 2021, 'Ficção Científica', FALSE);
