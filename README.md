# Assessor XP — Mobile (Sprint 3)

Aplicativo em React Native (Expo) para o Case 2 — Assessor Virtual de Investimentos.

## Como rodar

1. `npm i`
2. `npx expo start`
3. Abra no emulador Android/iOS

> Testado com Node 20.x e Expo SDK atual. Se der erro, rode `npm run clean` e tente novamente.

## Login

- Informe um e-mail válido (ex.: `teste@fiap.com`).
- A sessão é persistida no dispositivo (AsyncStorage).

## Telas

- **Login** (persistência via AsyncStorage)
- **Home** (TabNavigation): Início, Perfil, Recomendar, Explicações, Ajuda
- **Perfil do Investidor**: suitability, objetivo, liquidez
- **Recomendação**: lista mock nesta Sprint (será conectada à API local no Passo 2)
- **Explicações**: justificativas simplificadas

## Integrantes

- Leonardo de Oliveira Ruiz — RM98901
- Bruno Venturi Lopes Vieira - RM 99431
- Guilherme Alves de Lima - RM 550433
- Pedro Guerra (Transferido para unidade Paulista) - RM 99526

## Próximos passos

- Conectar com **API local** (CRUD + recomendações)
- Adicionar validações de campos e estados de erro com retry
