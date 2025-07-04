import styles from "./Header.module.scss";
import { GiShipWheel } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();

  function handleLogout() {
    Cookies.remove("token"); // Remove o token
    navigate("/"); // Redireciona para login
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to="/home">
          <GiShipWheel />
        </Link>
        <div>
          <h1>Sistema Marítimo</h1>
          <p>Gestão de Documentos únicos Virtuais</p>
        </div>
        <nav>
          <Link to="/registerduv">Cadastrar Duv</Link>

          <button onClick={handleLogout} className={styles.logoutButton}>
            <LuLogOut size={24} color="#000" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
