import type { MovieFormData } from "@/schemas/movieSchema";

export interface Movie extends MovieFormData {
  id: number;
}
