import { Movie } from "@/app/movies/domainModels/movie";
import movieModel from "@/database/models/movie.schema";
import { OperationContext } from "@/types/common";
import {
    getContextProps,
    getCreatedAt,
    getUpdatedAt,
} from "@/utils/repoHelpers";
import { Op } from "sequelize";

export async function getUserMovies(
    userId: string,
    offset: number,
    limit: number
) {
    const movies = await movieModel.findAndCountAll({
        where: { createdById: userId },
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
    });
    return {
        items: movies.rows.map((m) => m.toJSON()),
        total: movies.count,
    };
}

export async function addUpdateMovie(movie: Movie, context: OperationContext) {
    let applicableFilters: any = {};

    if (!movie.id) {
        const createdAtInfo = getCreatedAt(context);
        movie.createdAt = createdAtInfo.createdAt;
        movie.createdById = createdAtInfo.createdById;
    } else if (movie.id) {
        const updatedAtInfo = getUpdatedAt(context);
        movie.updatedAt = updatedAtInfo.updatedAt;
        movie.updatedById = updatedAtInfo.updatedById;
    }

    if ((movie.id && movie.createdById && movie.title, movie.year)) {
        applicableFilters = {
            [Op.or]: [
                {
                    id: movie.id,
                },
                {
                    createdById: movie.createdById,
                },
                {
                    year: movie.year,
                },
            ],
        };
    } else {
        applicableFilters = {
            [Op.or]: [
                {
                    createdById: movie.createdById,
                },
                {
                    title: movie.title,
                },
                {
                    year: movie.year,
                },
            ],
        };
    }

    const [row] = await movieModel.findOrBuild({
        where: {
            ...applicableFilters,
        },
        ...getContextProps(context),
        defaults: {
            ...movie,
        },
    });

    row.title = movie.title.toLowerCase();
    row.year = movie.year;
    row.poster = movie.poster;
    const c = await row.save({
        ...getContextProps(context),
    });
    return c.toJSON();
}

export async function deleteMovie(movieId: number, context: OperationContext) {
    return await movieModel.destroy({
        where: {
            id: movieId,
        },
        ...getContextProps(context),
    });
}
export async function getMovie(movieId: number) {
    const movie = await movieModel.findOne({
        where: {
            id: movieId,
        },
    });
    return movie ? movie.toJSON() : null;
}
