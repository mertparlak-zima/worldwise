import Sidebar from "../components/Sidebar/Sidebar";
import { app } from "./AppLayout.module.css";
import Map from "../components/Map/Map";
import User from "../components/User/User";

function AppLayout() {
  return (
    <div className={app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
