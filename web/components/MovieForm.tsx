import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { movieSchema, type MovieFormData } from "@/schemas/movieSchema";

interface MovieFormProps {
  onCreate: (data: MovieFormData) => Promise<void> | void;
}

export default function MovieForm({ onCreate }: MovieFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    // O .default(false) do Zod faz o tipo de *input* do schema divergir
    // do tipo de *output* (MovieFormData) — tipamos o form com o input
    // e pedimos ao RHF para entregar o output (já validado) no submit.
  } = useForm<z.input<typeof movieSchema>, unknown, MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: { title: "", director: "", year: 2024, genre: "", watched: false },
  });

  async function onSubmit(data: MovieFormData) {
    await onCreate(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-800">Novo filme</h2>

      {/* title — MODELO: use este campo como referência para os TODOs abaixo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* director — MODELO: use este campo como referência para os TODOs abaixo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="director" className="text-sm font-medium text-gray-700">
          Diretor
        </label>
        <input
          id="director"
          type="text"
          {...register("director")}
          className="rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.director && (
          <p className="text-xs text-red-600">{errors.director.message}</p>
        )}
      </div>

      {/*
        TODO (aluno): campo "year"
        - Siga o modelo dos campos "title"/"director" acima.
        - Use type="number" no <input>.
        - Registre com register('year', { valueAsNumber: true }) para que
          o RHF converta o valor do input (string) em number antes da
          validação do Zod.
        - Exiba errors.year?.message, se houver.
      */}

      {/*
        TODO (aluno): campo "genre"
        - Siga o modelo dos campos "title"/"director" acima.
        - Exiba errors.genre?.message, se houver.
      */}

      {/*
        TODO (aluno): campo "watched"
        - Use um <input type="checkbox" {...register('watched')} />.
        - Adicione um <label> "Já assistido".
      */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Salvando..." : "Adicionar filme"}
      </button>
    </form>
  );
}
