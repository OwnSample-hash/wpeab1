import { Link } from "react-router";

function Nav() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div>
        <Link to="/" className="p-4">
          Home
        </Link>
        <Link to="/chat" className="p-4">
          Chat
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
