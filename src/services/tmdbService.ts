import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_URL = "https://api.themoviedb.org/3/movie/11";

async function getMovieId(title: string, year: number): Promise<number | null> {
  try {
    const response = await axios.get(`${TMDB_URL}/search/movie`, {
      params: {
        query: title,
        year: year,
        api_key: TMDB_API_KEY,
      },
    });

    if (response.data.results.length === 0) return null;

    return response.data.results[0].id;
  } catch (error) {
    console.error("Erro ao buscar ID do filme:", error);
    return null;
  }
}

export async function getMovieReviews(title: string, year: number) {
  try {
    const movieId = await getMovieId(title, year);
    if (!movieId) throw new Error("Filme não encontrado no TMDB.");

    const response = await axios.get(`${TMDB_URL}/movie/${movieId}/reviews`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    return response.data.results.slice(0, 3).map((review: any) => review.content);
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    return [];
  }
}
