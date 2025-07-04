import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Cookies from "js-cookie";

type Passenger = {
  id: string;
  name: string;
  type: "PASSAGEIRO" | "TRIPULANTE";
  nationality: string;
  photo: string;
  sid_document?: string;
};

type Duv = {
  id: string;
  number: string;
  travel_date: string;
  passengers: Passenger[];
};

type Vessel = {
  id: string;
  name: string;
  flag: string;
  image: string;
  duvs: Duv[];
};

const Home = () => {
  const navigate = useNavigate();
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = Cookies.get("token");

        if (!token) {
          console.error("Token não encontrado");
          setLoading(false);
          return;
        }

        const response = await api.get("/seed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Supondo que sua API retorna { message: string, data: Vessel[] }
        if (response.data && Array.isArray(response.data.data)) {
          setVessels(response.data.data);
        } else if (Array.isArray(response.data)) {
          // Caso a API retorne direto o array
          setVessels(response.data);
        } else {
          console.error("Formato inesperado da resposta da API", response.data);
        }
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Carregando dados...</p>;
  }

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <h1>DUVs Cadastradas</h1>
        <p>
          {Array.isArray(vessels)
            ? vessels.reduce((acc, vessel) => acc + vessel.duvs.length, 0)
            : 0}{" "}
          documentos de viagem registrados
        </p>
      </section>

      <section className={styles.duvs}>
        {vessels.flatMap((vessel) =>
          vessel.duvs.map((duv) => {
            const passageiros = duv.passengers.filter(
              (p) => p.type === "PASSAGEIRO"
            );
            const tripulantes = duv.passengers.filter(
              (p) => p.type === "TRIPULANTE"
            );

            return (
              <article key={duv.id} className={styles.card}>
                <div className={styles.title}>
                  <h2>{duv.number}</h2>
                </div>

                <p className={styles.date}>
                  {new Date(duv.travel_date).toLocaleDateString()}
                </p>

                <div className={styles.shipInfo}>
                  <img
                    src={vessel.image}
                    alt={vessel.name}
                    className={styles.image}
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                  <div>
                    <p className={styles.shipName}>{vessel.name}</p>
                    <p className={styles.country}>{vessel.flag}</p>
                  </div>
                </div>

                <div className={styles.people}>
                  <p>
                    <strong>{duv.passengers.length}</strong> pessoas
                  </p>
                  <p>
                    <strong>{passageiros.length}</strong> passageiros
                  </p>
                  <p>
                    <strong>{tripulantes.length}</strong> tripulantes
                  </p>
                </div>

                <button
                  className={styles.button}
                  onClick={() =>
                    navigate(`/duv/${duv.id}`, { state: { duv, vessel } })
                  }
                >
                  Ver Detalhes
                </button>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Home;
