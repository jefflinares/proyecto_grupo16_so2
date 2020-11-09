import { BACKEND_URL } from "../util/configuration";
import { Base } from "./Base";

const Backend = Base(BACKEND_URL);

export const MovieService = () => {
    return {
        getMovies: async () => {
            const obj = await Backend("peliculas").get();
            return obj ? obj.peliculas : [];
        },
    };
};
