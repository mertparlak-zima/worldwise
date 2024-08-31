import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/FakeAuthContext";
function PageNav() {
  const auth = useAuth();
  return (
    <nav className={styles.nav}>
      <Logo />
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/product">Product</NavLink>

      {auth.isAuthenticated || (
        <NavLink to="/login">
          <Button type="primary">Login</Button>
        </NavLink>
      )}
    </nav>
  );
}

export default PageNav;
