import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";
import { sidebar } from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>
      <Footer />
    </div>
  );
}

export default Sidebar;
