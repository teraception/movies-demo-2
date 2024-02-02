"use server";

import { PaginatedResponse, PaginationParam } from "@/types/pagination";
import * as movieService from "@/app/movie/services/service";
import { validateMovie } from "@/app/movie/validations/movie";
import { initOperationContext } from "@/utils/repoHelpers";
import { formatResponse } from "@/types/response";
import { getUser } from "@/app/api/auth/[...nextauth]/helper";
import { s3Helper } from "@/utils/s3Helper";
import { Movie } from "@/app/movie/domainModels/movie";

const PER_PAGE = 10;

export async function getUserMovies(page: number = 1, perPage = PER_PAGE) {
    const user = await getUser();
    const params: PaginationParam = { pageNumber: page, perPage: perPage };
    const resp = await movieService.getMoviesByUserId(user.id, params);
    return formatResponse<PaginatedResponse<Movie>>({
        items: resp.items.map((m) => movieService.resolveMovie(m)),
        paginationMeta: resp.paginationMeta,
    });
}

const uploadFile = async (file: File) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}_${file.name}`;
    const relPath = `movies/${fileName}`;
    const resp = await s3Helper.UploadObject(buffer, relPath);
    return resp.Key;
};

export async function createUpdateMovie(data: FormData) {
    const user = await getUser();

    let movieData: Movie = {
        id: Number(data.get("id")),
        title: String(data.get("title")),
        year: Number(data.get("year")),
        createdById: user.id,
        updatedById: user.id,
        poster: null,
    };

    const file: File | null = data.get("file") as unknown as File;

    let filePath;
    if (file) {
        filePath = await uploadFile(file);
    }
    movieData = {
        ...movieData,
        createdById: user.id,
        updatedById: user.id,
        poster: filePath,
    };
    movieData.id = movieData.id == 0 ? null : movieData.id;
    if (movieData.id && movieData.poster == null) {
        movieData.poster = (
            await movieService.getMovieById(movieData.id)
        ).poster;
    }
    const validated = validateMovie(movieData);

    // Return early if the form data is invalid
    if (!validated.success) {
        return {
            errors: validated.errors,
        };
    }

    const resp = await movieService.createUpdateMovie(
        movieData,
        initOperationContext({
            user: user,
        })
    );
    return formatResponse<Movie>(movieService.resolveMovie(resp));
}

export async function deleteMovie(movieId: number) {
    const user = await getUser();

    const resp = await movieService.deleteMovie(
        movieId,
        initOperationContext({
            user: user,
        })
    );
    return formatResponse<boolean>(resp ? true : false);
}
export async function getMovie(movieId: number) {
    const resp = await movieService.getMovieById(movieId);
    return formatResponse<Movie>(movieService.resolveMovie(resp));
}
