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
    <div className={`flex justify-between px-56 border-b-[1px]`}>
      {LINKS.map(({ title, onclick }) => (
        <button
          className="cursor-pointer capitalize text-black"
          onClick={onclick}
          key={`link-to-${title}`}
        >
          {title}
        </button>
      ))}
    </div>
  );
}
