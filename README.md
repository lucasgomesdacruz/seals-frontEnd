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
