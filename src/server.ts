import express, { Request, Response } from "express";
import { getMovieSynopsis } from "./services/omdbService";
import { getMovieReviews } from "./services/tmdbService";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
});