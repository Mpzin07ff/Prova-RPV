import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie";
import type { MovieFormData } from "@/schemas/movieSchema";
import { getMovies, createMovie, updateMovie, deleteMovie } from "@/services/api";
import MovieForm from "@/components/MovieForm";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  async function loadMovies() {
    try {
      setLoading(true);
      const data = await getMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar filmes");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data: MovieFormData) {
    const movie = await createMovie(data);
    setMovies((prev) => [...prev, movie]);
  }

  async function handleToggle(movie: Movie) {
    const updated = await updateMovie(movie.id, {
      ...movie,
      watched: !movie.watched,
    });
    setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  }

  async function handleDelete(id: number) {
    await deleteMovie(id);
    setMovies((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Catálogo de Filmes
      </h1>

      {error && (
        <p className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <MovieForm onCreate={handleCreate} />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {loading && <p className="text-sm text-gray-500">Carregando...</p>}
          {!loading && movies.length === 0 && (
            <p className="text-sm text-gray-500">Nenhum filme cadastrado.</p>
          )}
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
