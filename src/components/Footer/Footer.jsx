import { footer, copyright } from "./Footer.module.css";

function Footer() {
  return (
    <footer className={footer}>
      <div className={copyright}>
        &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
      </div>
    </footer>
  );
}

export default Footer;
