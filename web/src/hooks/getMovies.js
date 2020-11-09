import { useState, useEffect } from "react";
import { MovieService } from "../services";

export function GetMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        MovieService()
            .getMovies()
            .then((data) => setMovies(data))
    }, []);

    return { movies };
}
