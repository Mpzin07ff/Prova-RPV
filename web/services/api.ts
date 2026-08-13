import type { Movie } from "@/types/movie";
import type { MovieFormData } from "@/schemas/movieSchema";

const API_URL = "http://localhost:3001/movies";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message ?? `Erro na requisição (${res.status})`;
    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(API_URL);
  return handleResponse<Movie[]>(res);
}

export async function getMovie(id: number): Promise<Movie> {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse<Movie>(res);
}

export async function createMovie(data: MovieFormData): Promise<Movie> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Movie>(res);
}

export async function updateMovie(
  id: number,
  data: MovieFormData,
): Promise<Movie> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<Movie>(res);
}

export async function deleteMovie(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return handleResponse<void>(res);
}
