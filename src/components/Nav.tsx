import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/addmovie">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
