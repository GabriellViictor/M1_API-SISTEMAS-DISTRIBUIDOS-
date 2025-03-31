import express, { Request, Response } from "express";
import { getMovieSynopsis } from "./services/omdbService";
import readline from "readline";
import { getMovieReviews } from "./services/tmdbService";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function fetchMovieData(title: string, year: number) {
  try {
    const [sinopse, reviews] = await Promise.all([
      getMovieSynopsis(title, year),
      getMovieReviews(title, year),
    ]);

    const formattedReviews = reviews.flatMap(r => r.reviews).filter(Boolean);

    const movieData = {
      titulo: title,
      ano: year,
      sinopse,
      reviews: formattedReviews,
    };

    console.log("\n========= FILME ENCONTRADO =========");
    console.log("Título:", movieData.titulo);
    console.log("Ano:", movieData.ano);
    console.log("Sinopse:", movieData.sinopse || "Não disponível");
    console.log("Reviews:", formattedReviews.length ? formattedReviews.join("\n- ") : "Sem reviews disponíveis");
    console.log("====================================\n");

    return movieData;
  } catch (error) {
    console.error("Erro ao buscar dados do filme:", error);
    throw error;
  }
}


app.get("/movie", (req: Request, res: Response) => {
  (async () => {
    const { title, year } = req.query;

    if (!title || !year) {
      return res.status(400).json({ error: "Informe título e ano do filme." });
    }

    const yearNumber = Number(year);
    if (isNaN(yearNumber)) {
      return res.status(400).json({ error: "Ano deve ser um número válido." });
    }

    try {
      const [sinopse, reviews] = await Promise.all([
        getMovieSynopsis(title as string, yearNumber),
        getMovieReviews(title as string, yearNumber),
      ]);

      res.json({
        titulo: title,
        ano: yearNumber,
        sinopse,
        reviews,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar dados do filme." });
    }
  })();
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function promptUser() {
    rl.question("Digite o título do filme: ", (title) => {
      rl.question("Digite o ano do filme: ", async (year) => {
        const yearNumber = Number(year);
        if (!title || isNaN(yearNumber)) {
          console.error("Título ou ano inválido. Tente novamente.\n");
          return promptUser();
        }

        try {
          await fetchMovieData(title, yearNumber);
        } catch {
          console.error("Erro ao buscar filme. Tente novamente.\n");
        }
        
        promptUser(); // Continua pedindo novos filmes
      });
    });
  }

  rl.prompt(); // Força o terminal a exibir o prompt imediatamente
  promptUser();
});
