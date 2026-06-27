import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Complaint Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Create Complaint</h5>

              <Link
                to="/create-complaint"
                className="btn btn-primary"
              >
                Open
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>My Complaints</h5>

              <Link
                to="/my-complaints"
                className="btn btn-success"
              >
                Open
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h5>Admin Panel</h5>

              <Link
                to="/admin"
                className="btn btn-warning"
              >
                Open
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;