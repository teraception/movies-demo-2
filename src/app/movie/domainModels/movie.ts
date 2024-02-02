import { Auditor } from "@/types/common";

export interface Movie extends Auditor {
    id?: number;
    title: string;
    poster: string;
    year: number;
}
export type MoviePayload = Pick<Movie, "title" | "poster" | "year">;
