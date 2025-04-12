import { Link } from "react-router";

function Nav() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div>
        <Link to="/react/" className="p-4">
          Home
        </Link>
        <Link to="/" className="p-4">
          Back
        </Link>
        <Link to="/react/chat" className="p-4">
          Chat
        </Link>
        <Link to="/react/calc" className="p-4">
          Calc
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
