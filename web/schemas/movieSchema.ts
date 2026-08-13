import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string({ error: "title é obrigatório" })
    .min(1, "title não pode ser vazio")
    .max(150, "title deve ter no máximo 150 caracteres"),
  director: z
    .string({ error: "director é obrigatório" })
    .min(1, "director não pode ser vazio")
    .max(100, "director deve ter no máximo 100 caracteres"),
  year: z
    .number({ error: "year deve ser um número" })
    .int("year deve ser um número inteiro")
    .min(1888, "year deve ser a partir de 1888")
    .max(new Date().getFullYear(), "year não pode ser no futuro"),
  genre: z
    .string({ error: "genre é obrigatório" })
    .min(1, "genre não pode ser vazio")
    .max(50, "genre deve ter no máximo 50 caracteres"),
  watched: z.boolean().default(false),
});

export type MovieFormData = z.infer<typeof movieSchema>;
