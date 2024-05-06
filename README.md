# Jet Breckets - Projeto React.js + Next.js

Este é um projeto criado como parte de um teste de entrevista. Ele utiliza React.js com Next.js para o frontend e Supabase como backend.

## Instalação

Certifique-se de ter o Node.js e o npm instalados em sua máquina.

1. Clone este repositório:

```bash
git clone https://github.com/rodrigocgodoy/jet-brackets
```

2. Navegue até o diretório do projeto:

```bash
cd jet-brackets
```

3. Instale as dependências:

```bash
npm install
```
ou
```bash
yarn
```

## Configuração

Antes de executar o projeto, é necessário configurar o Supabase e outras variáveis de ambiente.

1. Crie um arquivo `.env.local` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://htbywbtxdkwwsxqujujo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Ynl3YnR4ZGt3d3N4cXVqdWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MDgzMjUsImV4cCI6MjAzMDA4NDMyNX0.BSeUyqAEzeGiGm_o8iLgZU2-CVLqUm-P5xaDtQy5_1M
SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0Ynl3YnR4ZGt3d3N4cXVqdWpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDUwODMyNSwiZXhwIjoyMDMwMDg0MzI1fQ.SaLRiVdk5-y-Lryy3vXwxa71PsrJI1oCJUoWwpPdvac
```

## Executando o Projeto

Após a instalação e configuração, você pode iniciar o servidor de desenvolvimento:

```bash
npm run dev
```
ou
```bash
yarn dev
```

O projeto estará disponível em `http://localhost:3000`.

## Bibliotecas Utilizadas

- [radix-ui](https://www.radix-ui.com/): Biblioteca para componentes de interface com acessibilidade.
- [shadcn/ui](https://ui.shadcn.com/): Biblioteca para componentes de interface.
- [Tailwind CSS](https://tailwindcss.com/): Framework de CSS utilitário para design responsivo.
- [Next.js](https://nextjs.org/): Framework React.js para renderização do lado do servidor.
- [Lucide React](https://lucide.dev/): Biblioteca para ícones.

## Estrutura do Projeto

- `app/`: Páginas do Next.js.
- `components/`: Componentes React reutilizáveis.
- `app/global.css`: Estilos globais e configuração do Tailwind CSS.
- `public/`: Arquivos estáticos como imagens e fontes.
- `lib/`: Arquivos de configuração do projeto, como supabase e algumas funções reutilizáveis.
