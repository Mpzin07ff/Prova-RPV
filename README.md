# Catálogo de Filmes — Exercício Avaliativo (10 pts)

Aplicação fullstack (MySQL + Express/Knex + Next.js) para praticar CRUD com
validação ponta a ponta usando Zod. Parte do projeto já está pronta; os
trechos que faltam estão marcados com `TODO` no código.

📖 **[Leia o enunciado completo](web/public/exercicio.html)** — abra o
arquivo direto no navegador, ou rode `pnpm dev` em `web/` e acesse
`http://localhost:3000/exercicio.html`.

## Estrutura

```
prova-01-api-front-bd-rpv/
├── database/     # schema.sql + seeds.sql (MySQL)
├── api/          # TypeScript + Express 5 + Knex 3 + Zod (porta 3001)
└── web/          # Next.js 16 (Pages Router) + Tailwind v4 (porta 3000)
```

## Pré-requisitos

- Node.js 22+
- pnpm (`npm install -g pnpm`)
- MySQL 8 rodando localmente (local, não Docker)

## 1. Banco de dados

Crie o banco e popule com os dados de exemplo ( utilize os comandos apenas se estiver executando o banco via CLI ):

```bash
mysql --default-character-set=utf8mb4 -u root -p < database/schema.sql
mysql --default-character-set=utf8mb4 -u root -p < database/seeds.sql
```
> A flag `--default-character-set=utf8mb4` evita problemas de acentuação
> (ex: "Ficção" virar "FicÃ§Ã£o") ao importar os arquivos `.sql`.

> Na pasta `database` você encontra os comandos necessários para executar via MySQL Workbench
> Atenção na criação do banco , utilize utf8mb4.


## 2. API

```bash
cd api
cp .env.example .env
# edite .env com as credenciais do seu MySQL local
pnpm install
pnpm dev
```

A API sobe em `http://localhost:3001`.

## 3. Frontend

Em outro terminal:

```bash
cd web
pnpm install
pnpm dev
```

O frontend sobe em `http://localhost:3000`.

## 4. Testando a API

Use o arquivo `api/movies-api-tests.http` com a extensão **REST Client**
(VS Code) para exercitar os três blocos de teste: happy path, erros 400 de
validação e 404 de recurso inexistente. Esse arquivo é o critério objetivo
de correção — depois de implementar os `TODO`s, todas as requisições devem
se comportar como descrito nos comentários de cada seção.

## O que fazer (enunciado)

O projeto já entrega prontos: banco, middleware de validação (`validate.js`),
helper de normalização do MySQL (`toMovie`), layout dos componentes React e
a página principal. Faltam 7 partes, marcadas com comentários `TODO` no
código:

1. **`api/server.ts`** — implementar `GET /movies`
2. **`api/server.ts`** — implementar `GET /movies/:id`
3. **`api/server.ts`** — implementar `POST /movies`
4. **`api/server.ts`** — implementar `PUT /movies/:id`
5. **`api/server.ts`** — implementar `DELETE /movies/:id`
6. **`web/components/MovieForm.tsx`** — completar os campos `year`,
   `genre` e `watched`
7. **`web/components/MovieCard.tsx`** — ligar os botões "Alternar status"
   e "Remover" às respectivas ações

Cada `TODO` no código traz um passo a passo do que fazer. Se travar, a
pasta `gabarito/` tem a implementação de referência — tente resolver
sozinho antes de consultar.

## Rubrica — 10 pontos

| Item | Pontos |
|---|---|
| `GET /movies` funcionando (200, lista normalizada) | 1,0 |
| `GET /movies/:id` funcionando (200, 404 se não existir) | 1,0 |
| `POST /movies` funcionando (201, valida com 400) | 1,0 |
| `PUT /movies/:id` funcionando (200, valida, 404 se não existir) | 1,0 |
| `DELETE /movies/:id` funcionando (204, 404 se não existir) | 1,0 |
| Campos do `MovieForm` (`year`, `genre`, `watched`) funcionando | 2,5 |
| Botões do `MovieCard` (alternar status / remover) funcionando | 2,5 |

A correção é feita rodando a suíte `api/movies-api-tests.http` completa e
testando o CRUD via interface em `http://localhost:3000`.
