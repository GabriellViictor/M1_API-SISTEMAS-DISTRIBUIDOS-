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
exports.getMovieReviews = getMovieReviews;
const axios_1 = require("axios");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_URL = "https://api.themoviedb.org/3";
function getMovieId(title, year) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${TMDB_URL}/search/movie`, {
                params: {
                    query: title,
                    year: year,
                    api_key: TMDB_API_KEY,
                },
            });
            if (response.data.results.length === 0)
                return null;
            return response.data.results[0].id;
        }
        catch (error) {
            console.error("Erro ao buscar ID do filme:", error);
            return null;
        }
    });
}
function getMovieReviews(title, year) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movieId = yield getMovieId(title, year);
            if (!movieId)
                throw new Error("Filme não encontrado no TMDB.");
            const response = yield axios_1.default.get(`${TMDB_URL}/movie/${movieId}/reviews`, {
                params: {
                    api_key: TMDB_API_KEY,
                },
            });
            return response.data.results.slice(0, 3).map((review) => review.content);
        }
        catch (error) {
            console.error("Erro ao buscar reviews:", error);
            return [];
        }
    });
}
