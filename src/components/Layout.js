import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="px-56">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
