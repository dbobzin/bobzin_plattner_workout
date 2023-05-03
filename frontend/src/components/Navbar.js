import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const path = useLocation().pathname;

  const handleClick = () => {
    logout();

  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/">
          <img src="logo.png" alt="logo" width={35} className="mx-2"/>
        </Link>
        <Link to="/" className="navbar-brand">Bobzin-Plattner-Workouts</Link>
        <button className="navbar-toggler bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          {user ?
            <ul className="navbar-nav me-auto">
              <li className="nav-item me-2 mt-md-0 mt-2">
                <Link to="/" className={`btn btn-${path.endsWith("/") ? "secondary" : "primary"}`}>Home</Link>
              </li>
              <li className="nav-item mt-md-0 mt-2">
                <Link to="/Browse" className={`btn btn-${path.endsWith("Browse") ? "secondary" : "primary"}`}>Browse</Link>
              </li>
            </ul>
          : <ul className="navbar-nav me-auto"></ul>}
          <div className="d-flex">
            {user ?
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="" className="nav-link disabled d-none d-md-block" style={{color: "white"}}>{user.email}</Link>
                </li>
                <li className="nav-item mt-md-0 mt-2">
                  <Link to="/" className="btn btn-outline-success" onClick={handleClick}>Log out</Link>
                </li>
              </ul>
            : <ul className="navbar-nav me-auto">
              <li className="nav-item mt-md-0 mt-2">
                <Link to={path.endsWith("login") ? "/signup" : "/login"} className="btn btn-success">{path.endsWith("login") ? "Sign Up" : "Log In"}</Link>
              </li>
            </ul>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
