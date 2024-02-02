import { Movie } from "@/app/movie/domainModels/movie";
import * as movieRepo from "@/app/movie/repositories/movie";
import { OperationContext } from "@/types/common";
import {
    getOffsetFromPagination,
    getPaginationMeta,
    PaginatedResponse,
    PaginationParam,
} from "@/types/pagination";
import { s3Helper } from "@/utils/s3Helper";

export function resolveMovie(movie: Movie) {
    if (movie && movie.poster) {
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
    const meta = getPaginationMeta<Movie>(pagination, {
        items: resp.items,
        total: resp.total,
    });
    const paginatedMovies: PaginatedResponse<Movie> = {
        items: resp.items,
        paginationMeta: meta,
    };
    return paginatedMovies;
}

export async function deleteMovie(
    id: number,
    operationContext: OperationContext
) {
    return await movieRepo.deleteMovie(id, operationContext);
}
