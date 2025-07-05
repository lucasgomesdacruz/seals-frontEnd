# ⚓ Sistema Marítimo – Frontend

Este é o **frontend** do sistema de gerenciamento de DUVs (Documentos Únicos de Viagem). A aplicação permite login com autenticação via **JWT**, visualização de navios, DUVs e passageiros, além do cadastro de novos documentos.

> 💡 Projeto feito com **React.js**, **TypeScript**, **Vite**, **SCSS** e **React Router DOM**.

---

## 🚀 Tecnologias

- [React.js](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [SCSS](https://sass-lang.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [JS-Cookie](https://www.npmjs.com/package/js-cookie)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

## 📸 Funcionalidades

- Login com autenticação JWT
- Rotas privadas com verificação de token
- Cadastro de usuários
- Visualização de todos os navios, DUVs e passageiros
- Cadastro de novas DUVs (simulado)
- Upload e preview de imagem (visual apenas)
- Navegação com React Router

---

🧾 Cadastro de novo usuário (/signup)
A página de registro permite que um novo usuário crie uma conta informando nome, e-mail e senha. Ao submeter o formulário, os dados são enviados para o backend via POST /users.

Todos os campos são obrigatórios.

Em caso de sucesso, o usuário é redirecionado automaticamente para a rota protegida /home.

Caso ocorra erro no cadastro (como e-mail já existente), é exibida uma mensagem no console (pode ser adaptado para um toast futuramente).

O componente também inclui um ícone decorativo (GiShipWheel) e um link para redirecionamento à página de login caso o usuário já tenha uma conta.


![Macbook-Air-localhost (4)](https://github.com/user-attachments/assets/cff146b7-8bf0-432b-8fc2-7912e18c9944)

---
🔐 Autenticação de usuário (/)
A tela de login permite que usuários cadastrados acessem o sistema informando seu e-mail e senha. Ao clicar em "Entrar", o formulário envia os dados para o endpoint POST /session.

✅ Comportamentos implementados:
Validação de campos obrigatórios (e-mail e senha).

Token JWT e nome do usuário são armazenados via Cookies com validade de 30 dias.

Em caso de sucesso, o usuário é redirecionado para a rota protegida /home.

Se houver erro (como credenciais inválidas), uma mensagem é exibida ao usuário.

Contém link para criação de conta caso o usuário ainda não esteja registrado (/signup).

Ícone visual decorativo com react-icons (GiShipWheel).

![iPhone-13-PRO-localhost](https://github.com/user-attachments/assets/8f55acbf-a831-43bb-8066-26249f0802a4)

---
🏠 Página Inicial - Home (/home)
A tela principal do sistema exibe as DUVs cadastradas, agrupadas por navios, de forma dinâmica e visualmente organizada.

🔍 Funcionalidades:
Autenticação obrigatória: o acesso a essa página depende de um token válido (rota protegida via PrivateRoute).

Requisição à API: ao carregar, a aplicação faz uma requisição ao endpoint GET /seed, que retorna uma lista de navios, cada um com suas respectivas DUVs e passageiros.

Listagem dinâmica: os dados são processados e renderizados em cards, cada um contendo:

Número da DUV

Data da viagem formatada

Informações do navio (nome, bandeira, imagem)

Quantidade total de pessoas embarcadas, passageiros e tripulantes

Navegação: botão "Ver Detalhes" redireciona o usuário para uma página com mais informações da DUV selecionada (/duv/:id).

Carregamento condicional: enquanto os dados são buscados, é exibida a mensagem "Carregando dados...".

![Macbook-Air-localhost (2)](https://github.com/user-attachments/assets/5511903f-454b-4e81-8859-fccaf232f7a6)

---
📄 Página de Detalhes da DUV (/duv/:id)
Esta página exibe informações completas de uma DUV (Documento Único de Viagem) específica, selecionada na tela inicial.

🔍 Funcionalidades:
Recebimento via useLocation: os dados da DUV e do navio são passados como estado na navegação feita a partir da /home.

Validação de dados: caso a DUV ou o navio não estejam disponíveis no state, a tela exibe a mensagem DUV não encontrada.

🛳️ Dados exibidos:
Informações da DUV:

Número e data da viagem

Quantidade total de pessoas, passageiros e tripulantes

Informações do Navio:

Nome, bandeira e imagem do navio

Listagem de passageiros e tripulantes:

Renderização separada por tipo

Foto, nome e nacionalidade de cada pessoa

SID (quando for tripulante)

Botão de retorno: permite voltar para a tela anterior com navigate(-1).

![Macbook-Air-localhost (6)](https://github.com/user-attachments/assets/c646de08-3a3e-4c13-8023-7ccfa0828f1b)

---

---

📝 Página de Cadastro de DUV (/registerduv)
A tela Register DUV permite ao usuário cadastrar uma nova DUV (Documento Único de Viagem) de forma prática e intuitiva.

⚙️ Funcionalidades:
Formulário de cadastro com os seguintes campos:

Número da DUV (campo obrigatório)

Data da Viagem (campo obrigatório)

Navio (dropdown com navios simulados)

Imagem ilustrativa (upload opcional, apenas visual)

Preview de imagem: ao selecionar uma imagem (jpeg ou png), o sistema exibe um preview imediato para o usuário.

Validação: o formulário valida se todos os campos obrigatórios foram preenchidos antes de permitir o envio.

Simulação de envio: ao submeter, os dados são exibidos no console (console.log) e uma mensagem de sucesso é exibida com react-toastify.

Redirecionamento: após o cadastro simulado, o usuário é redirecionado para a tela /home.

📌 Obs.: neste projeto, os navios são carregados estaticamente na aplicação por meio de um array mockado.

![Macbook-Air-localhost (3)](https://github.com/user-attachments/assets/db605acc-2106-4b9d-a8a0-a931c18253ec)

---
---

## 🔐 Rotas protegidas

As rotas internas (`/home`, `/duv/:id`, `/registerduv`) só podem ser acessadas por usuários autenticados. A verificação é feita com um token armazenado em cookie e validado com a API (`/me`).

```tsx
// src/components/PrivateRoute.tsx
if (!isAuth) return <Navigate to="/" replace />;

# Iniciar o projeto em ambiente de desenvolvimento
npm run dev

# Gerar build para produção
npm run build

# Visualizar o build localmente
npm run preview

# Verificar lint
npm run lint
```

 ### 👨‍💻 Autor
Desenvolvido por Lucas Gomes
📎 LinkedIn
