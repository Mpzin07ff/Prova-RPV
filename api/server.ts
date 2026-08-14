import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import db from "./db";
import { movieSchema } from "./schemas/movieSchema";
import { validate } from "./middlewares/validate";
import { id } from "zod/v4/locales";

interface MovieRow {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  watched: number | boolean;
}

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  genre: string;
  watched: boolean;
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// O driver mysql2 devolve BOOLEAN/TINYINT(1) como 0/1 — normalizamos
// para true/false antes de qualquer resposta JSON.
function toMovie(row: MovieRow): Movie {
  return {... row, watched: Boolean(row.watched) }
}

// TODO (aluno): implementar GET /movies
// Passo a passo:
//   1. Busque todos os filmes.
//   2. Responda 200 com o array normalizado: movies.map(toMovie).
app.get("/movies", async (req: Request, res: Response) => {
  const movie = await db<MovieRow>("Movie")
  res.status(200).json(movie.map (toMovie));
});

// TODO (aluno): implementar GET /movies/:id
// Passo a passo:
//   1. Busque o filme.
//   2. Se não existir, responda 404 com { message: 'Filme não encontrado' }.
//   3. Se existir, responda 200 com toMovie(movie).
app.get("/movies/:id", async (req: Request, res: Response) => {
  const id = Number (req.params.id)
  const movie = await db<MovieRow>("Movie")
  .where({id})
  .first();

  if (!movie) {
    return res.status(404).json({ message: "Filme não encontrado" })
  }

  res.status(200).json(toMovie(movie));
});

// TODO (aluno): implementar POST /movies
// Passo a passo:
//   1. Aplique o middleware validate(movieSchema) nesta rota (segundo
//      argumento de app.post, antes do handler).
//   2. Insira o registro.
//      O insert() no MySQL retorna apenas [insertId] — é preciso
//      reconsultar o registro para devolver o objeto completo.
//   3. Responda 201 com toMovie(movie).
app.post("/movies", async (req: Request, res: Response) => {
  validate(movieSchema),
  
  res.status(501).json({ message: "TODO: implementar POST /movies" });
});

// TODO (aluno): implementar PUT /movies/:id
// Passo a passo:
//   1. Aplique o middleware validate(movieSchema) nesta rota.
//   2. Verifique se o filme existe;
//      se não existir, responda 404 com { message: 'Filme não encontrado' }.
//   3. Atualize o registro.
//   4. Reconsulte o registro atualizado e responda 200 com toMovie(movie).
app.put("/movies/:id", async (req: Request, res: Response) => {
  validate(movieSchema),
  async (req: Request, res: Response) => {
    const id = Number (req.params.id)
  }
  if (!toMovie) {
    return res.status(404).json({ message: "Filme não encontrado" })
  }
  await db("movies")
  .where({ id })
  .update(req.body);

  const updateToMovie = await db<MovieRow>("Movies")
  .where(id)
  .first();

  res.status(200).json(toMovie(updateToMovie!));
});

// TODO (aluno): implementar DELETE /movies/:id
// Passo a passo:
//   1. Verifique se o filme existe; se não existir, responda 404 com
//      { message: 'Filme não encontrado' }.
//   2. Remova o registro.
//   3. Responda 204 sem corpo.
app.delete("/movies/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  const movieExists = await db.select('*').from('movies').where({ id })
  if (movieExists.length === 0) {
        return res.status(404).json({ message: "Filme não encontrado" })
    }
    const deleteMovie = await db.delete().from('movies').where({ id })
    console.log('Remover', deleteMovie)
  res.status(204).json({ message: "TODO: implementar DELETE /movies/:id" });
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
