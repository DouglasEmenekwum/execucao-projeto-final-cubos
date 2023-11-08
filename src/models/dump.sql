create table usuarios (
  id serial primary key,
  nome text,
  email text unique,
  senha text
);

create table categorias(
  id serial primary key,
  descricao text
);

insert into categorias (descricao) values
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');
