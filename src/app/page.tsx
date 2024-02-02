import { getUserMovies } from "@/app/movie/actions";
import Movies from "@/app/react/components/views/movies";
import envConfig from "@/config/config";
import React from "react";

const HomeServer: React.FC = async () => {
    const data = await getUserMovies(1);

    return (
        <main className="container mx-auto">
            <Movies data={data.data} />
        </main>
    );
};

export default HomeServer;
