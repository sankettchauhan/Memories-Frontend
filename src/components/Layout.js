import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
