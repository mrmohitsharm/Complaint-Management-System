import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link
          className="navbar-brand"
          to={token ? "/dashboard" : "/login"}
        >
          Complaint System
        </Link>

        <div className="navbar-nav ms-auto">

          {!token ? (
            <>
              <Link
                className="nav-link"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="nav-link"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                className="nav-link"
                to="/dashboard"
              >
                Dashboard
              </Link>

              {role === "user" && (
                <>
                  <Link
                    className="nav-link"
                    to="/create-complaint"
                  >
                    Create
                  </Link>

                  <Link
                    className="nav-link"
                    to="/my-complaints"
                  >
                    My Complaints
                  </Link>
                </>
              )}

              {role === "admin" && (
                <Link
                  className="nav-link"
                  to="/admin"
                >
                  Admin
                </Link>
              )}

              <button
                className="btn btn-danger ms-3"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;