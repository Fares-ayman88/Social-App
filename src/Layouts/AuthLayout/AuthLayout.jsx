import { Outlet } from "react-router-dom";
import Navbar from "../../component/Layout/Navbar/Navbar";
import Footer from "../../component/Layout/Footer/Footer";

export default function AuthLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main app-main--auth section-panel">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
