import Navbar from "../../component/Layout/Navbar/Navbar";
import Footer from "../../component/Layout/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main section-panel">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
