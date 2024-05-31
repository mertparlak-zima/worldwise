import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/product">Product</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default PageNav;
