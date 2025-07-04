import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterDuv.module.scss";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";

type Vessel = {
  id: string;
  name: string;
};

const RegisterDuv = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [number, setNumber] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [vesselId, setVesselId] = useState("");

  const [vessels, setVessels] = useState<Vessel[]>([]);

  useEffect(() => {
    // Simulação de navios estáticos
    setVessels([
      { id: "1", name: "Navio Poseidon" },
      { id: "2", name: "Estrela do Mar" },
    ]);
    setVesselId("1");
  }, []);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "image/jpeg" && selected.type !== "image/png") {
        toast.warning("Formato não permitido");
        return;
      }
      setImage(selected);
      setPreviewImage(URL.createObjectURL(selected));
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!number || !travelDate || !vesselId) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    // Aqui simulamos o envio dos dados
    console.log({
      number,
      travelDate,
      vesselId,
      image
    });

    toast.success("DUV cadastrada com sucesso!");
    navigate("/home");
  }

  return (
    <main className={styles.container}>
      <h1>Nova DUV</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Upload de imagem (apenas visual, não vai para API) */}
        <label className={styles.labelImage}>
          <span>
            <FiUploadCloud size={30} color="#2563eb" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFile}
          />
          {previewImage && (
            <img src={previewImage} alt="Preview" className={styles.preview} />
          )}
        </label>

        <input
          type="text"
          placeholder="Número da DUV"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
          className={styles.input}
        />

        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
          className={styles.input}
        />

        <select
          value={vesselId}
          onChange={(e) => setVesselId(e.target.value)}
          required
          className={styles.input}
        >
          {vessels.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <button type="submit" className={styles.button}>
          Cadastrar DUV
        </button>
      </form>
    </main>
  );
};

export default RegisterDuv;
