# <img src="https://i.imgur.com/zIJTbdo.png" width="30px"> BlinTech Frontend: Seguros de Eletrônicos  

Uma plataforma digital moderna e interativa para **contratação e gestão de seguros de eletrônicos**, desenvolvida em **React.js com TypeScript**.  
Este projeto representa o **FrontEnd** do trabalho final do Bloco 2 do Bootcamp **Programador Fullstack - Generation Brasil**, integrando-se com o backend feito em NestJS.  

> **Grupo:** DevDivs  
>
> **Membros:**  
> - [Ágata Andrade](https://github.com/Agataandrade) - Dev
> - [Alex Siqueira](https://github.com/alex-sqls) - Dev  
> - [Grazielle Gualter](https://github.com/grazielle30) - Dev  
> - [Leticia Oliveira](https://github.com/Santos-Leticia) - Dev  
> - [Lucas Alves](https://github.com/RaideriSpace) - PO  
> - [Pedro Barbosa](https://github.com/KarpaTech) - Tester  

---

## 🖥️ Visão Geral  

O **BlinTech Frontend** é uma aplicação web responsiva e intuitiva, que oferece uma experiência fluida para **usuários segurados e seguradoras**.  
O sistema permite **login e cadastro de usuários, gerenciamento completo de categorias e produtos segurados, visualização de perfis**, e um **layout moderno e animado**, tornando a navegação mais envolvente.  

O projeto foi desenvolvido com **boas práticas de componentização, hooks personalizados e transições animadas** para uma experiência premium.  

---

## ✨ Funcionalidades Principais  

✅ **Autenticação de Usuário**  
- Login e cadastro com validação usando **React Hook Form**.  
- Armazenamento seguro do token JWT.  
- Redirecionamento dinâmico com **React Router DOM**.  

✅ **CRUD Completo**  
- **Categorias:** criação, listagem, edição e exclusão com animações suaves.  
- **Produtos:** contratação, listagem, atualização e cancelamento de seguros.  

✅ **Interface Dinâmica e Responsiva**  
- Layout moderno e totalmente estilizado com **CSS modular** e **variáveis de cores customizadas** (`--primary`, `--secondary`, `--tertiary`).  
- **Botões animados** e responsivos com **hover effects** e **gradientes interativos**.  

✅ **Feedback e Interatividade**  
- Sistema de notificações em tempo real com **React Toastify** (sucesso, erro, alerta).  
- Animações suaves de entrada, saída e transição usando **Framer Motion** e **AnimatePresence**.  
- Pop-ups e modais elegantes com **ReactJS Popup** e lógica de controle centralizada.  

✅ **Hooks e Reutilização**  
- Hook personalizado para **scroll automático ao topo da página** em cada navegação (`useScrollToTop`).  
- Hooks contextuais (`AuthContext`) para autenticação global.  

✅ **Experiência do Usuário**  
- Formulários de cadastro e edição dinâmicos e validados com **React Hook Form**.  
- Cards animados para exibição de **produtos e categorias**.  
- Feedbacks visuais instantâneos em cada ação do usuário (criar, deletar, atualizar).  

---

## 🛠️ Tecnologias Utilizadas  

| Categoria | Ferramentas |
|------------|-------------|
| **Framework principal** | React.js + TypeScript |
| **Roteamento** | React Router DOM |
| **Formulários** | React Hook Form |
| **Animações** | Framer Motion (AnimatePresence, Motion) |
| **Feedbacks visuais** | React Toastify |
| **Modais e popups** | ReactJS Popup |
| **Contexto global** | Context API (AuthContext) |
| **Estilização** | Tailwind + CSS moderno com variáveis customizadas e classes responsivas |
| **API** | Integração com o backend NestJS usando `fetch` customizado em `/services/Services.ts` |

---

## 🎨 Layout e Estilo  

O design do **BlinTech Frontend** foi pensado para refletir **inovação, confiança e tecnologia**, utilizando:  

- 🎨 **Paleta de cores personalizada** com variáveis CSS globais:
  ```css
  :root {
    --primary: #101720;
    --secondary: #5ddcff;
    --tertiary: #7cf7ff;
  }
  ```
- 🧭 **Design responsivo** com flexbox e grid.  
- 🔄 **Transições suaves** e **efeitos de escala e fade** nos botões e cards.  
- 🪄 **Animações com Framer Motion**, aplicadas em:
  - Cards de produtos e categorias (entrada e saída animada)
  - Formulários modais (fade + scale)
  - Transições de página (fadeIn + slideUp)
- 💫 **Botões interativos com gradiente animado** e estados `hover` personalizados.  

---

## 🚀 Instalação e Uso  

### **Pré-requisitos**
- Node.js (versão 18+)
- npm ou yarn instalado
- Backend rodando (disponível [aqui](https://blintech.onrender.com/swagger#/))

### **Passos para rodar o projeto**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/DevDivs/blintech-frontend.git
   cd blintech-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Crie o arquivo `.env`**
   ```bash
   VITE_API_BASE_URL=https://blintech.onrender.com
   ```

4. **Inicie o servidor**
   ```bash
   npm run dev
   ```

5. Acesse em [`http://localhost:5173`](http://localhost:5173)

---

## ⚖️ Licença  

Este projeto é de código aberto e está sob a licença **UNLICENSED**.
