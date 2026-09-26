# Samuel Baldasso · Mid-Level Android Engineer Portfolio

Portfólio técnico de alto impacto de **Samuel Baldasso**, Engenheiro Android Pleno (Mid-Level) especializado no ecossistema nativo com **Kotlin**, **Jetpack Compose**, **Clean Architecture** e **Arquitetura Reativa Offline-First**.

Construído para permitir que um Tech Lead ou recrutador técnico conclua em 30 segundos:
> *"Sabe arquitetar apps nativos, tem código público de qualidade e é contratável."*

---

## 🛠️ Stack Tecnológica

- **Framework Web:** [Next.js](https://nextjs.org/) (App Router, SSG + ISR) + React 19 + TypeScript strict
- **Design & Estilo:** [Tailwind CSS](https://tailwindcss.com/) com tokens de cor inspirados em **Material Design 3**, modo escuro padrão + claro, contraste WCAG AA e foco visível
- **Internacionalização:** [next-intl](https://next-intl-docs.vercel.app/) com suporte completo a **pt-BR** (padrão) e **en**
- **Syntax Highlighting:** [Shiki](https://shiki.style/) para renderização estática de código Kotlin, Gradle e XML
- **Mockup CSS Puro:** Moldura de smartphone Pixel desenvolvida em CSS puro com telas reais do app
- **Animações Respeitosas:** [Framer Motion](https://www.framer.com/motion/) com suporte nativo a `prefers-reduced-motion`
- **Testes:** [Vitest](https://vitest.dev/) para validação unitária de integridade de dados e ordenação
- **SEO & Metadados:** Dynamic Open Graph (`opengraph-image.tsx`), JSON-LD `Person`, Sitemap, Robots e tags hreflang

---

## 🚀 Como Rodar Localmente

### 1. Pré-requisitos
- Node.js 20+ ou superior
- `pnpm` (versão 10+)

```bash
# Entrar na pasta do projeto
cd my-android-portfolio

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse em seu navegador: [http://localhost:3000](http://localhost:3000).

---

## 🔑 Como Configurar o `GITHUB_TOKEN` e Sincronizar Repositórios

O portfólio consome os repositórios pinados do perfil GitHub `@samuelbaldasso` através da GitHub GraphQL API.

1. Crie um Personal Access Token (classic com escopo `public_repo` ou fine-grained com permissão de leitura de repositórios públicos) no GitHub.
2. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env.local
   ```
3. Edite `.env.local` e insira seu token:
   ```env
   GITHUB_TOKEN=ghp_seu_token_aqui
   ```
4. Execute o script de sincronização:
   ```bash
   pnpm sync:pinned
   ```
   O script salvará os dados em `src/data/pinned.generated.json`.

> **Fallback Resiliente:** Se nenhum `GITHUB_TOKEN` for informado ou ocorrer rate limit da API, o build continua funcionando perfeitamente utilizando os dados tipados de `src/data/pinned.fallback.ts`, onde já constam os projetos reais de produção (`Finance-Flow-App`, `The-Movie-DB-App`, `Java-Banking-Core` e `Java-Subscription-B2C-Service`).

---

## 👤 Como Atualizar Dados Pessoais (`src/data/profile.ts`)

Todos os dados pessoais estão centralizados exclusivamente em um único arquivo:
👉 `src/data/profile.ts`

Campos disponíveis:
- `fullName`: Nome exibido em todo o site.
- `headline`: Subtítulo técnico (bilingue: `pt-BR` e `en`).
- `valueProposition`: Frase de impacto sobre sua especialidade arquitetural.
- `shortBio`: Resumo profissional de 2–3 frases.
- `location`: Cidade, estado e país.
- `availability`: Disponibilidade para contratação (ex: remoto/híbrido).
- `email`: E-mail para contato direto.
- `social`: Links de GitHub, LinkedIn e campos opcionais (`whatsapp`, `playStoreDev`, `mediumOrDevTo`).
- `skills`: Agrupadas em 7 categorias fundamentais do ecossistema Android (*Linguagem, UI, Arquitetura, Dados, Qualidade, Performance, Entrega*).
- `experience`: Trajetória com conquistas mensuráveis e tecnologias aplicadas.

> **Regra de Honestidade:** Campos opcionais (`whatsapp`, `playStoreDev`, etc.) somem automaticamente da interface quando deixados como `undefined` ou vazios.

---

## 📄 Como Trocar o Currículo

Os arquivos de currículo devem ser colocados em:
- `public/resume/resume-pt.pdf` (Versão em Português)
- `public/resume/resume-en.pdf` (Versão em Inglês)

Ambos já possuem PDFs placeholder válidos para garantir que os links nunca quebrem em deploy. Quando quiser atualizar seu CV, basta sobrescrever esses dois arquivos mantendo o mesmo nome. O botão "Baixar currículo" no cabeçalho e rodapé utiliza o atributo HTML `download`.

---

## 🚢 Como Fazer Deploy na Vercel

1. Faça o push do repositório para o seu GitHub:
   ```bash
   git remote add origin https://github.com/samuelbaldasso/my-android-portfolio.git
   git push -u origin main
   ```
2. Importe o repositório na [Vercel](https://vercel.com).
3. Adicione a variável de ambiente opcional:
   - `GITHUB_TOKEN`: Seu token pessoal do GitHub (para sincronizar repositórios pinados durante os builds).
4. Clique em **Deploy**. A Vercel detectará o Next.js automaticamente e gerará as páginas estáticas com ISR.

---

## 🧪 Suíte de Testes e Validação

```bash
# Executar testes unitários com Vitest
pnpm test

# Executar checagem de tipos estritos do TypeScript
pnpm typecheck

# Executar linter ESLint
pnpm lint

# Gerar build de produção
pnpm build
```

---

## 📋 Lista de Pendências para o Usuário

Itens que você pode personalizar conforme sua preferência:

1. **GITHUB_TOKEN:** Adicione seu token real no `.env.local` e no painel da Vercel para sincronizar repositórios pinados automaticamente via GitHub GraphQL.
2. **Currículo:** Substitua os arquivos `public/resume/resume-pt.pdf` e `public/resume/resume-en.pdf` pelos seus PDFs finais de currículo.
3. **Bio e Disponibilidade:** Revise as frases em `src/data/profile.ts` (`shortBio`, `availability`, `location`).
4. **Skills:** Revise as competências listadas em `profile.ts` (`skills`) para adicionar ou marcar como destaque apenas o que desejar evidenciar.
5. **Redes Opcionais:** Caso queira exibir WhatsApp, link de desenvolvedor da Google Play Console ou Medium, basta preencher os campos opcionais em `profile.social`.
