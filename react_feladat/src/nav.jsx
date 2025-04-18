import { Link } from "react-router";

function Nav() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div>
        <Link to="/react/" className="p-4">
          Főoldal
        </Link>
        <Link to="/" className="p-4">
          Vissza
        </Link>
        <Link to="/react/chat" className="p-4">
          Beszélgetés
        </Link>
        <Link to="/react/calc" className="p-4">
          Számológép
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
