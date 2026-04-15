# Dev Controle

Sistema web para gestão de clientes e chamados, com autenticação Google, painel administrativo e abertura pública de tickets.

## Status do Projeto

Projeto finalizado e funcional.

## Funcionalidades

- Login com Google via NextAuth.
- Dashboard protegido por sessão.
- Cadastro, listagem e remoção de clientes.
- Regras de integridade para não excluir cliente com ticket associado.
- Abertura de chamado interna (painel) e externa (rota pública).
- Listagem de chamados abertos com atualização de status para FECHADO.
- Modal com detalhes completos do chamado e dados do cliente.
- Validação de formulários com React Hook Form + Zod.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth
- Prisma ORM
- MongoDB
- Axios
- React Hook Form
- Zod
- React Icons

## Arquitetura

- Frontend e backend no mesmo projeto Next.js (App Router + Route Handlers).
- Banco de dados MongoDB com Prisma Client gerado em generated/prisma.
- Sessão/autorização com NextAuth e Prisma Adapter.
- API interna em src/app/api para operações de clientes e chamados.

## Estrutura Principal

~~~
src/
  app/
    api/
      auth/[...nextauth]/route.ts
      customer/route.ts
      ticket/route.ts
    dashboard/
      customer/
      new/
      page.tsx
    open/
      page.tsx
  components/
    header/
    container/
    input/
    modal/
  lib/
    api.ts
    auth.ts
    prisma.ts
prisma/
  schema.prisma
generated/
  prisma/
~~~

## Pré-requisitos

- Node.js 20+
- npm 10+
- MongoDB ativo (Atlas ou local)
- Projeto OAuth no Google Cloud

## Instalação e Execução

1. Instalar dependências:

~~~bash
npm install
~~~

2. Criar o arquivo .env na raiz do projeto.

3. Gerar o Prisma Client:

~~~bash
npx prisma generate
~~~

4. Sincronizar o schema com o banco:

~~~bash
npx prisma db push
~~~

5. Rodar em desenvolvimento:

~~~bash
npm run dev
~~~

Aplicação local: http://localhost:3000

## Variáveis de Ambiente

Use este modelo no .env:

~~~env
DATABASE_URL="mongodb+srv://USER:PASSWORD@CLUSTER/DB_NAME?retryWrites=true&w=majority"

GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

# URL base usada pelo Axios no projeto
HOST_URL="http://localhost:3000"

# Recomendadas para NextAuth em produção
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="uma_chave_forte"
~~~

## Scripts

- npm run dev: inicia ambiente de desenvolvimento.
- npm run build: gera build de produção.
- npm run start: sobe aplicação em modo produção.

## Rotas da Aplicação

### Rotas de Página

- /: página inicial.
- /dashboard: lista chamados abertos (rota protegida).
- /dashboard/new: cria chamado interno (rota protegida).
- /dashboard/customer: lista clientes (rota protegida).
- /dashboard/customer/new: cadastra cliente (rota protegida).
- /open: abertura pública de chamado por email do cliente.

### Rotas de API

- /api/auth/[...nextauth]: fluxo de autenticação NextAuth.
- /api/customer
  - GET: busca cliente por email.
  - POST: cria cliente.
  - DELETE: remove cliente quando não há tickets vinculados.
- /api/ticket
  - POST: cria chamado.
  - PATCH: altera status do chamado para FECHADO.

## Modelo de Dados (Prisma)

- User: usuário autenticado.
- Customer: cliente vinculado ao usuário.
- Ticket: chamado vinculado ao cliente e ao usuário.
- Account, Session, VerificationToken: modelos padrão do NextAuth.

## Fluxo de Uso

1. Fazer login com Google.
2. Cadastrar clientes no painel.
3. Abrir chamados para clientes no dashboard.
4. Acompanhar chamados abertos na tela principal do dashboard.
5. Fechar chamados e consultar detalhes via modal.
6. Opcionalmente, abrir chamados públicos em /open usando o email do cliente.

## Pontos Técnicos

- Uso de Server Components e Server Actions no App Router.
- Proteção de rotas com requireAdmin.
- Prisma Client singleton para evitar múltiplas conexões em desenvolvimento.
- Revalidação/refresh de UI após mutações para manter dados sincronizados.

## Licença

Uso educacional e de portfólio.

---

Última atualização: 15 de abril de 2026.
