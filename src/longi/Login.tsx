import { Link, useNavigate } from "react-router-dom"
import styles from "./Login.module.scss"
import { GiShipWheel } from "react-icons/gi"
import { useState } from "react";
import { api } from "../services/api";
import Cookies from "js-cookie"

const Login = () => {
const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

        if (!email || !password) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            const response = await api.post("/session", { 
                email, 
                password 
            });

            if(!response.data.token) {
                return
            }

            const { token, name } = response.data;

            // Armazenar o token em cookie com expiração de 30 dias
            Cookies.set("token", token, { expires: 30 });
            Cookies.set("user", name, { expires: 30 });

            navigate("/home");
        } catch (err) {
            console.error(err);
            setError("Email ou senha inválidos.");
        }
    }
    return (
        <>
            <main className={styles.containerCenter}>
                    <GiShipWheel />

                    <section className={styles.login}>
                        <h1>Sistema Marítimo</h1>
                        <p>Digite suas credenciais para acessar o sistema</p>
                        <form onSubmit={handleLogin}>
                            <input 
                                type="email" 
                                required
                                name="email"
                                placeholder="Digite seu email..."
                                className={styles.input}
                            />

                            <input 
                                type="password" 
                                required
                                name="password"
                                placeholder="***********"
                                className={styles.input}
                            />

                            {error && <p className={styles.error}>{error}</p>}

                            <button type="submit" className={styles.button}>
                                Entrar
                            </button>

                            <Link to="/signup" className={styles.text}>
                                Não possui uma conta?
                            </Link>

                        </form>
                    </section>
                </main>
        </>
    )
}

export default Login