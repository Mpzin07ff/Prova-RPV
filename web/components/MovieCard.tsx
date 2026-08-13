import type { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggle: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export default function MovieCard({ movie, onToggle, onDelete }: MovieCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-800">{movie.title}</h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
            movie.watched
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {movie.watched ? "Assistido" : "Pendente"}
        </span>
      </div>

      <p className="text-sm text-gray-600">Diretor: {movie.director}</p>
      <p className="text-sm text-gray-600">
        {movie.year} · {movie.genre}
      </p>

      <div className="mt-2 flex gap-2">
        {/*
          TODO (aluno): botão "alternar assistido"
          - No onClick, chame onToggle(movie) para inverter o status
            watched deste filme (o handler em pages/index.tsx faz a
            chamada PUT e atualiza o estado local).
        */}
        <button
          type="button"
          onClick={() => {}}
          className="rounded border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          Alternar status
        </button>

        {/*
          TODO (aluno): botão "remover"
          - No onClick, chame onDelete(movie.id) para excluir este filme
            (o handler em pages/index.tsx faz a chamada DELETE e
            atualiza o estado local).
        */}
        <button
          type="button"
          onClick={() => {}}
          className="rounded border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
        >
          Remover
        </button>
      </div>
    </div>
  );
}
