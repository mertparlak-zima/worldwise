import { NavLink } from "react-router-dom";
import styles from "./index.module.css";
import Logo from "../Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <NavLink to="/">Pricing</NavLink>
      <NavLink to="/product">Product</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default PageNav;
