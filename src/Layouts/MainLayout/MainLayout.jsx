import Navbar from "../../component/Layout/Navbar/Navbar";
import Footer from "../../component/Layout/Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import FloatingBackButton from "../../component/Layout/FloatingBackButton/FloatingBackButton";
import LeftSidebar from "../../component/Layout/Sidebars/LeftSidebar";
import RightSidebar from "../../component/Layout/Sidebars/RightSidebar";

export default function MainLayout() {
  const { userToken } = useContext(AuthContext);
  const location = useLocation();
  const showHomeSidebars = userToken && location.pathname === "/";

  return (
    <div className="app-layout">
      <Navbar />
      <FloatingBackButton />
      <main className="app-main section-panel">
        <div className={`app-shell ${showHomeSidebars ? "app-shell--with-sidebars" : ""}`}>
          {showHomeSidebars && <LeftSidebar />}
          <section className="app-content">
            <Outlet />
          </section>
          {showHomeSidebars && <RightSidebar />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
