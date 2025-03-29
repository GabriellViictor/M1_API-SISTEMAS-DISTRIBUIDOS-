"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const omdbService_1 = require("./services/omdbService");
const tmdbService_1 = require("./services/tmdbService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/movie", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, year } = req.query;
    if (!title || !year) {
        return res.status(400).json({ error: "Informe título e ano do filme." });
    }
    try {
        const [sinopse, reviews] = yield Promise.all([
            (0, omdbService_1.getMovieSynopsis)(title, Number(year)),
            (0, tmdbService_1.getMovieReviews)(title, Number(year)),
        ]);
        res.json({
            titulo: title,
            ano: Number(year),
            sinopse,
            reviews,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados do filme." });
    }
}));
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
