# Assessor XP — Mobile (Sprint 4)

Aplicativo em React Native (Expo) para o Case 2 — Assessor Virtual de Investimentos.
Inclui também uma API local em Node/Express (pasta `assessor-xp-api`) para fornecer os dados de perfis e recomendações.

---

## Como rodar

### 1. Instalar dependências

```bash
npm i
```

### 2. Subir a API local

```bash
cd assessor-xp-api
npm i
npm run dev
# API disponível em http://localhost:3000
```

### 3. Rodar o app

Em outro terminal, na raiz do projeto:

```bash
npx expo start
```

> Observação:
>
> * Emulador **Android** usa `http://10.0.2.2:3000` como base da API.
> * Emulador **iOS** (Simulator) usa `http://localhost:3000`.

---

## Login

* Informe um e-mail válido (ex.: `teste@fiap.com`).
* A sessão é persistida no dispositivo (AsyncStorage).

---

## Telas

* **Login** (persistência via AsyncStorage)
* **Home** (TabNavigation): Início, Perfil, Recomendar, Explicações, Ajuda
* **Perfil do Investidor**: suitability, objetivo, liquidez (salvo na API)
* **Recomendação**: gera carteira baseada no perfil consumindo a API local
* **Explicações**: justificativas simplificadas

---

## Integrantes

* Leonardo de Oliveira Ruiz — RM98901
* Bruno Venturi Lopes Vieira — RM99431
* Guilherme Alves de Lima — RM550433
* Pedro Guerra — RM99526

---

## Próximos passos

* Melhorar validações de formulários.
* Adicionar tratamento de erro mais rico (retry, banners).
* Evoluir regra de recomendação na API.
