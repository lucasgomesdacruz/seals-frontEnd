import { useLocation, useNavigate } from "react-router-dom";
import styles from "./DuvDetails.module.scss";

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

const DuvDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const duv = state?.duv as Duv;
  const vessel = state?.vessel as Vessel;

  if (!duv || !vessel) {
    return <p className={styles.notFound}>DUV não encontrada.</p>;
  }

  const passageiros = duv.passengers.filter((p) => p.type === "PASSAGEIRO");
  const tripulantes = duv.passengers.filter((p) => p.type === "TRIPULANTE");

  return (
    <main className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.back}>
        ← Voltar
      </button>

      <h1>Detalhes da {duv.number}</h1>
      <p>Data da viagem: {new Date(duv.travel_date).toLocaleDateString()}</p>

      <section className={styles.navio}>
        <h2>Navio</h2>
        <img src={vessel.image} alt={vessel.name} />
        <p>Nome: {vessel.name}</p>
        <p>Bandeira: {vessel.flag}</p>
      </section>

      <section className={styles.info}>
        <p><strong>{duv.passengers.length}</strong> pessoas</p>
        <p><strong>{passageiros.length}</strong> passageiros</p>
        <p><strong>{tripulantes.length}</strong> tripulantes</p>
      </section>

      <section className={styles.pessoas}>
        <h2>Passageiros</h2>
        <div className={styles.lista}>
          {passageiros.map((p) => (
            <div key={p.id} className={styles.cardPessoa}>
              <img src={p.photo} alt={p.name} />
              <div>
                <p><strong>{p.name}</strong></p>
                <p>{p.nationality}</p>
              </div>
            </div>
          ))}
        </div>

        <h2>Tripulantes</h2>
        <div className={styles.lista}>
          {tripulantes.map((t) => (
            <div key={t.id} className={styles.cardPessoa}>
              <img src={t.photo} alt={t.name} />
              <div>
                <p><strong>{t.name}</strong></p>
                <p>{t.nationality}</p>
                <p><small>SID: {t.sid_document || "Não informado"}</small></p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DuvDetails;
