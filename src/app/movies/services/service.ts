import { Movie } from "@/app/movies/domainModels/movie";
import * as movieRepo from "@/app/movies/repositories/movie";
import { OperationContext } from "@/types/common";
import {
    getOffsetFromPagination,
    PaginatedResponse,
    PaginationParam,
} from "@/types/pagination";
import { s3Helper } from "@/utils/s3Helper";

export function resolveMovie(movie: Movie) {
    if (movie.poster) {
        movie.poster = s3Helper.getPublicUrl(movie.poster);
    }
    return movie;
}

export async function getMovieById(id: number): Promise<Movie> {
    return await movieRepo.getMovie(id);
}
export async function createUpdateMovie(
    movie: Movie,
    context: OperationContext
): Promise<Movie> {
    return await movieRepo.addUpdateMovie(movie, context);
}

export async function getMoviesByUserId(
    userId: string,
    pagination: PaginationParam
) {
    const offset = getOffsetFromPagination(pagination);
    const resp = await movieRepo.getUserMovies(
        userId,
        offset,
        pagination.perPage
    );
    const paginatedMovies: PaginatedResponse<Movie> = {
        items: resp.items,
        paginationMeta: {
            start: offset,
            end: offset + resp.items.length - 1,
            perPage: pagination.perPage,
            totalItems: resp.total,
        },
    };
    return paginatedMovies;
}

export async function deleteMovie(
    id: number,
    operationContext: OperationContext
) {
    return await movieRepo.deleteMovie(id, operationContext);
}
