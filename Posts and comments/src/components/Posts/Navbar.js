import { Link, NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link to="/" className="brand-logo">
          Blog
        </Link>
        <ul className="right">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
