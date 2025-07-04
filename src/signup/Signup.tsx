import { Link, useNavigate } from "react-router-dom"
import styles from "./Signup.module.scss"
import { GiShipWheel } from "react-icons/gi"
import { api } from "../services/api";

const Signup = () => {

    const navigate = useNavigate();

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // impedir o reload da página

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!name || !email || !password) {
        console.log("Preencha todos os campos.");
        return;
        }

        console.log(name, email, password);

        try {
        await api.post("/users", {
            name,
            email,
            password,
        });

        navigate("/home"); // redireciona após sucesso
        } catch (err) {
        console.log("Erro ao cadastrar:", err);
        }
    }

    return (
        <>
            <main className={styles.containerCenter}>
                <GiShipWheel />

                <section className={styles.login}>
                    <h1>Criando sua Conta</h1>
                    <form onSubmit={handleRegister}>
                        <input 
                            type="email" 
                            required
                            name="email"
                            placeholder="Digite seu email..."
                            className={styles.input}

                        />

                        <input 
                            type="text" 
                            required
                            name="name"
                            placeholder="Digite seu nome..."
                            className={styles.input}

                        /> 

                        <input 
                            type="password" 
                            required
                            name="password"
                            placeholder="***********"
                            className={styles.input}
                        />

                        <button type="submit" className={styles.button}>
                            Cadastrar
                        </button>

                        <Link to="/" className={styles.text}>
                            Já possui uma conta? Faça o login
                        </Link>

                    </form>

                </section>

            </main>
        </>
    )
}

export default Signup
