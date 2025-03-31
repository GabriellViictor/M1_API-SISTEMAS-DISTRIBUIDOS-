# M1_API-SISTEMAS-DISTRIBUIDOS-

Este repositório contém uma API desenvolvida em TypeScript como parte do Módulo 1 da disciplina de Sistemas Distribuídos. O objetivo do projeto é fornecer um serviço para agregação de informações sobre filmes.

## 📌 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript no lado do servidor
- **Express.js** - Framework para construção de APIs RESTful
- **TypeScript** - Superconjunto do JavaScript com tipagem estática
- **Axios** - Cliente HTTP para consumir APIs externas
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 📂 Estrutura do Projeto

```
M1_API-SISTEMAS-DISTRIBUIDOS-
│── dist/                     # Arquivos compilados
│── movie-aggregator/         # Módulo para agregar informações sobre filmes
│── src/                      # Diretório com o código-fonte
│   │── controllers/          # Controladores da API
│   │── routes/               # Definição das rotas
│   │── services/             # Serviços para manipulação de dados
│   │── app.ts                # Arquivo principal da API
│── .env                      # Variáveis de ambiente
│── tsconfig.json             # Configuração do TypeScript
│── package.json              # Dependências e scripts do projeto
```

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/GabriellViictor/M1_API-SISTEMAS-DISTRIBUIDOS-.git
cd M1_API-SISTEMAS-DISTRIBUIDOS-
```

### 2️⃣ Instalar as Dependências
```bash
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias:
```env
PORT=3000
API_KEY=SEU_TOKEN_AQUI
```

### 4️⃣ Executar o Projeto
```bash
npm start
```

## 📌 Principais Endpoints

### 🎬 Obter informações sobre um filme
```http
GET /movies/:title
```
**Parâmetros:**
- `title` (string): Nome do filme a ser buscado.

**Exemplo de Resposta:**
```json
{
  "title": "Inception",
  "year": "2010",
  "genre": "Sci-Fi, Action",
  "rating": "8.8"
}
```

## 📜 Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

