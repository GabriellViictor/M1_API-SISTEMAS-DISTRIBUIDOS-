import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;


export async function getMovieSynopsis(title: string, year: number) {
  try {
    const response = await axios.get(OMDB_URL, {
      params: {
        t: title,
        y: year,
      },
    });

    if (response.data.Response === "False") {
      throw new Error("Filme não encontrado no OMDB.");
    }

    return response.data.Plot;
  } catch (error) {
    console.error("Erro ao buscar sinopse:", error);
    return null;
  }
}
