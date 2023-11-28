import { Outlet } from "react-router-dom";

//COMPONENTS
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Sidebar />

      {/*This is where the child routes will be rendered */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
