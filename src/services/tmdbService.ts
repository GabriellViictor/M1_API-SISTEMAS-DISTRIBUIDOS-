import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_URL = "https://api.themoviedb.org/3";

export async function getMovieReviews(title: string, year: number) {
  try {
    if (!TMDB_API_KEY) {
      throw new Error("API Key do TMDB não encontrada.");
    }

    const response = await axios.get(`${TMDB_URL}/search/movie`, {
      params: {
        query: title,
        include_adult: false,
        language: "en-US",
        page: 1,
        year: year,
      },
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });

    if (!response.data.results || response.data.results.length === 0) {
      console.log("Nenhum filme encontrado para:", title, year);
      return [];
    }

    const movies = response.data.results.slice(0, 3);

    const reviewsPromises = movies.map(async (movie: any) => {
      try {
        const reviewsResponse = await axios.get(`${TMDB_URL}/movie/${movie.id}/reviews`, {
          headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
          },
          params: {
            language: "en-US",
          },
        });

        const reviews = reviewsResponse.data.results.slice(0, 3).map((review: any) => `- ${review.content}`);

        return {
          titulo: movie.title,
          ano: movie.release_date ? movie.release_date.split("-")[0] : "Desconhecido",
          reviews: reviews.length > 0 ? reviews.join("\n") : "Sem reviews disponíveis",
        };
      } catch (error) {
        console.error(`Erro ao buscar reviews para ${movie.title}:`, error);
        return {
          titulo: movie.title,
          ano: movie.release_date ? movie.release_date.split("-")[0] : "Desconhecido",
          reviews: "Erro ao buscar reviews",
        };
      }
    });

    return Promise.all(reviewsPromises);
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    return [];
  }
}
