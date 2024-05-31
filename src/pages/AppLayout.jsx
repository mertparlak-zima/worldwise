import Sidebar from "../components/Sidebar/Sidebar";
import { app } from "./AppLayout.module.css";
import Map from "../components/Map/Map";

function AppLayout() {
  return (
    <div className={app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
