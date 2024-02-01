import { MoviePayload } from "@/app/movies/domainModels/movie";

export const validateMoviePayload = (param: MoviePayload): boolean => {
    const keys: (keyof MoviePayload)[] = ["poster", "title", "year"];
    const allKeysPresent = keys.every((key) => param[key]);
    if (!allKeysPresent) {
        return false;
    }
    const year = param.year;
    if (year.toString().length !== 4) {
        return false;
    }
    return true;
};
