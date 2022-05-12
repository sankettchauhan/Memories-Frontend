import { useNavigate } from "react-router-dom";
import { handleLogout } from "../util/localStorage.util";

export default function Nav() {
  const navigate = useNavigate();

  const LINKS = [
    { title: "Home", onclick: () => navigate("/") },
    { title: "Create Memory", onclick: () => navigate("/add-memory") },
    { title: "Logout", onclick: () => handleLogout(navigate) },
  ];

  return (
    <div
      className={`flex justify-between px-4 md:px-20 border-b-2 py-4 border-[color:var(--accent-color)] text-2xl`}
      style={{ fontFamily: "var(--font-dancing-script)" }}
    >
      {LINKS.map(({ title, onclick }) => (
        <button
          className="cursor-pointer capitalize font-semibold"
          onClick={onclick}
          key={`link-to-${title}`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
