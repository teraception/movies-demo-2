import { Movie } from "@/app/movie/domainModels/movie";
import { z } from "zod";

const movSchema = {
    title: z
        .string({
            required_error: "Title is required",
        })
        .min(2, { message: "Title can't be less than 2 characters" }),
    year: z.number().gte(1900, { message: "Year must be greater than 1900." }),
    createdById: z.string(),
    updatedById: z.string(),
    poster: z.string(),
};
const movieSchema = z.object({
    ...movSchema,
});
const editMovieSchema = z.object({
    ...movSchema,
    id: z.number(),
});

export function validateMovie(movie: Movie) {
    let validatedFields = null;
    if (movie.id) {
        validatedFields = editMovieSchema.safeParse(movie);
    } else {
        validatedFields = movieSchema.safeParse(movie);
    }

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            success: false,
            errors: (validatedFields as any).error.flatten().fieldErrors,
        };
    } else {
        return {
            success: true,
            errors: null,
        };
    }
}
