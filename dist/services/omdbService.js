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
exports.getMovieSynopsis = getMovieSynopsis;
const axios_1 = require("axios");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_URL = "http://www.omdbapi.com/";
function getMovieSynopsis(title, year) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(OMDB_URL, {
                params: {
                    t: title,
                    y: year,
                    apikey: OMDB_API_KEY,
                },
            });
            if (response.data.Response === "False") {
                throw new Error("Filme não encontrado no OMDB.");
            }
            return response.data.Plot;
        }
        catch (error) {
            console.error("Erro ao buscar sinopse:", error);
            return null;
        }
    });
}
