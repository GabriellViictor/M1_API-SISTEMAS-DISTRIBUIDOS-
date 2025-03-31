# API de Consulta de Filmes

Este projeto é uma API desenvolvida em Node.js que permite buscar informações sobre filmes, incluindo sinopse e reviews, utilizando as APIs do OMDB e TMDB.

## Funcionalidades
- Buscar a sinopse de um filme pelo título e ano de lançamento.
- Obter reviews do filme de diferentes fontes.
- Servir as informações via uma API REST.
- Interação via terminal para busca manual.

## Tecnologias Utilizadas
- Node.js
- Express.js
- TypeScript
- Axios
- APIs externas: OMDB e TMDB

##  Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

Além disso, você precisará de chaves de API para OMDB e TMDB:
- Crie uma conta no [OMDB](https://www.omdbapi.com/) e obtenha sua chave de API.
- Crie uma conta no [TMDB](https://www.themoviedb.org/) e gere um token de acesso.

## Instalação
1. Clone este repositório:
   ```sh
   git clone https://github.com/GabriellViictor/M1_API-SISTEMAS-DISTRIBUIDOS-.git
   cd M1_API-SISTEMAS-DISTRIBUIDOS-
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Configuração das Chaves de API
1. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves:
   ```sh
   OMDB_API_KEY=your_omdb_api_key
   TMDB_API_KEY=your_tmdb_api_key
   ```

## ▶ Como Rodar o Projeto
### Executando o Servidor
Para iniciar a API, utilize:
```sh
npm start
```
O servidor será iniciado na porta `3000` (ou a definida em `PORT`).

### Consultando um Filme via API
Faça uma requisição GET para:
```
http://localhost:3000/movie?title=Inception&year=2010
```
Resposta esperada:
```json
{
  "titulo": "Inception",
  "ano": 2010,
  "sinopse": "A thief who steals corporate secrets...",
  "reviews": [
    "- Excelente filme!",
    "- Ótima direção e roteiro!"
  ]
}
```

### Consultando um Filme via Terminal
O servidor permite interagir diretamente pelo terminal:
1. Execute `npm start`.
2. Digite o título e o ano do filme quando solicitado.

## Vídeo Demonstrativo
[Video com explicacao](https://youtu.be/AI26lCja-HU)

