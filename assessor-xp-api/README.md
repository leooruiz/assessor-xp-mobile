# API REST local em Node/Express para o Case 2 — Assessor Virtual de Investimentos

## Como rodar

1. `npm i`
2. `npm run dev`
3. Teste: `GET http://localhost:3000/health` e `GET /assets`

## Endpoints

- **GET /health** → status da API
- **GET /assets** → lista ativos
- **GET /profiles** → lista perfis
- **POST /profiles** → cria perfil `{ suitability, objetivo, liquidez }`
- **POST /recommendations** → gera recomendação `{ profileId }`

## Estrutura

- `data/assets.json` → catálogo de ativos
- `data/profiles.json` → perfis criados
- `data/recommendations.json` → histórico de recomendações

## Observações

- Persistência em arquivos JSON, adequada para uso **local** nesta Sprint 3.
- Regras de recomendação simples (adequadas ao perfil). Evoluiremos depois.
