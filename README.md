# Dev Controle - Contexto do Projeto

## 📋 Informações Gerais

**Nome do Projeto:** Dev Controle  
**Descrição:** Sistema de gerenciamento de clientes e atendimentos

---

## 🚀 Stack Tecnológica

### Dependências de Produção

| Biblioteca      | Versão | Descrição                                          |
| --------------- | ------ | -------------------------------------------------- |
| **Next.js**     | 16.1.6 | Framework React com renderização híbrida (SSR/SSG) |
| **React**       | 19.2.3 | Biblioteca para construção de interfaces           |
| **React DOM**   | 19.2.3 | Renderizador React para web                        |
| **React Icons** | 5.5.0  | Biblioteca de ícones (FiUser, FiLogOut)            |

### Dependências de Desenvolvimento

| Biblioteca                      | Versão | Descrição                                |
| ------------------------------- | ------ | ---------------------------------------- |
| **TypeScript**                  | 5.x    | Superset JavaScript com tipagem estática |
| **Tailwind CSS**                | 4.x    | Framework CSS utility-first              |
| **@tailwindcss/postcss**        | 4.x    | Plugin PostCSS para Tailwind             |
| **Babel Plugin React Compiler** | 1.0.0  | Compilador experimental do React         |
| **@types/node**                 | 20.x   | Tipagens TypeScript para Node.js         |
| **@types/react**                | 19.x   | Tipagens TypeScript para React           |
| **@types/react-dom**            | 19.x   | Tipagens TypeScript para React DOM       |

---

## 🏗️ Arquitetura

### Framework: Next.js 16 (App Router)

O projeto utiliza a arquitetura moderna do **Next.js App Router** (introduzida no Next.js 13 e consolidada no 16), que oferece:

- ✅ **Server Components** por padrão
- ✅ **File-based routing** no diretório `app/`
- ✅ **Layouts aninhados** com compartilhamento de UI
- ✅ **Loading states** e error boundaries integrados
- ✅ **API Routes** co-localizadas
- ✅ **Metadata API** para SEO otimizado

### Recursos Ativados

- **React Compiler**: Ativado no `next.config.ts` para otimizações automáticas de performance
- **Font Optimization**: Uso do Google Fonts (Inter) com otimização automática
- **Image Optimization**: Suporte nativo do Next.js para imagens
- **TypeScript Strict Mode**: Ativado para máxima segurança de tipos

---

## 📁 Estrutura de Pastas

```
devcontrole/
├── public/                      # Arquivos estáticos públicos
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/                         # Código fonte da aplicação
│   ├── app/                     # App Router (Next.js 16)
│   │   ├── layout.tsx           # Layout raiz da aplicação
│   │   ├── page.tsx             # Página inicial (/)
│   │   ├── globals.css          # Estilos globais + Tailwind
│   │   └── favicon.ico          # Ícone da aplicação
│   │
│   └── components/              # Componentes React reutilizáveis
│       └── header/
│           └── index.tsx        # Componente de cabeçalho
│
├── .gitignore                   # Arquivos ignorados pelo Git
├── next.config.ts               # Configurações do Next.js
├── next-env.d.ts                # Tipos TypeScript do Next.js
├── package.json                 # Dependências e scripts
├── package-lock.json            # Lock de dependências
├── postcss.config.mjs           # Configuração do PostCSS
├── tsconfig.json                # Configuração do TypeScript
└── README.md                    # Documentação do projeto
```

### Convenções de Organização

#### `/src/app` - Rotas da Aplicação

- **layout.tsx**: Layout compartilhado entre todas as páginas
- **page.tsx**: Componente de página (rota)
- **loading.tsx**: Estado de carregamento (opcional)
- **error.tsx**: Tratamento de erros (opcional)
- **not-found.tsx**: Página 404 (opcional)

#### `/src/components` - Componentes Reutilizáveis

- Estrutura de pastas por funcionalidade
- Cada componente em sua própria pasta
- Arquivo `index.tsx` como ponto de entrada

---

## ⚙️ Configurações Importantes

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2017", // Compatibilidade JavaScript
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true, // Modo estrito ativado
    "jsx": "react-jsx", // JSX com novo runtime
    "moduleResolution": "bundler", // Resolução moderna
    "paths": {
      "@/*": ["./src/*"] // Alias para imports absolutos
    }
  }
}
```

**Recursos Principais:**

- ✅ **Strict Mode**: Máxima segurança de tipos
- ✅ **Path Aliases**: `@/` aponta para `./src/`
- ✅ **Incremental Compilation**: Build mais rápido

### Next.js (`next.config.ts`)

```typescript
{
  reactCompiler: true; // React Compiler ativado
}
```

**Otimizações:**

- ✅ **React Compiler**: Memoização automática de componentes
- ✅ **Automatic Static Optimization**: Páginas estáticas quando possível
- ✅ **Code Splitting**: Carregamento sob demanda

### Tailwind CSS

Configurado via **@tailwindcss/postcss** v4 (versão moderna sem arquivo de config tradicional).

**Recursos:**

- ✅ Utility classes diretas no JSX
- ✅ Purge automático de CSS não utilizado
- ✅ JIT (Just-In-Time) mode por padrão

---

## 📜 Scripts Disponíveis

| Script    | Comando         | Descrição                                       |
| --------- | --------------- | ----------------------------------------------- |
| **dev**   | `npm run dev`   | Inicia servidor de desenvolvimento (porta 3000) |
| **build** | `npm run build` | Gera build de produção otimizada                |
| **start** | `npm run start` | Inicia servidor de produção                     |

### Uso:

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run start
```

---

## 🎨 Padrões de Desenvolvimento

### Componentes

- **Convenção**: React Server Components por padrão
- **Tipagem**: TypeScript em todos os componentes
- **Importações**: Uso de path alias `@/` para imports absolutos
- **Estilização**: Tailwind CSS com utility classes

### Exemplo de Estrutura de Componente:

```tsx
// src/components/exemplo/index.tsx
import { FiIcon } from "react-icons/fi";

export function Exemplo() {
  return (
    <div className="w-full p-4">
      <FiIcon size={24} />
      <h2 className="text-xl font-bold">Título</h2>
    </div>
  );
}
```

### Roteamento

- **Padrão**: File-based routing no diretório `app/`
- **Exemplo**:
  - `app/page.tsx` → rota `/`
  - `app/dashboard/page.tsx` → rota `/dashboard`
  - `app/clientes/[id]/page.tsx` → rota dinâmica `/clientes/:id`

### Metadados e SEO

```tsx
// app/layout.tsx ou app/page.tsx
export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerencimaneto.",
  description: "Gerencia seus clientes e atendimentos de forma fácil!",
};
```

---

## 🌐 Funcionalidades Implementadas

### Header Component

- Logo interativo com link para home
- Ícone de usuário com link para `/dashboard`
- Botão de logout
- Design responsivo com Tailwind CSS
- Animação de hover no logo

### Layout Global

- Fonte Inter do Google Fonts (pesos: 400, 500, 700)
- CSS global com Tailwind
- Header persistente em todas as páginas
- Metadata default configurado

## 📚 Recursos e Documentação

- **Next.js 16**: https://nextjs.org/docs
- **React 19**: https://react.dev
- **Tailwind CSS 4**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **React Icons**: https://react-icons.github.io/react-icons

---

**Última atualização:** 22 de fevereiro de 2026
