import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {

      const email =
        localStorage.getItem("user_email");

      const response = await API.get(
        `/complaints/my-complaints/?email=${email}`
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load complaints");

    } finally {

      setLoading(false);

    }
  };

  const getBadgeClass = (status) => {

    switch (status) {

      case "Resolved":
        return "bg-success";

      case "Pending":
        return "bg-warning text-dark";

      case "In Progress":
        return "bg-primary";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  const filteredComplaints =
    complaints.filter(
      (complaint) =>
        complaint.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        complaint.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalComplaints =
    complaints.length;

  const pendingComplaints =
    complaints.filter(
      (c) => c.status === "Pending"
    ).length;

  const resolvedComplaints =
    complaints.filter(
      (c) => c.status === "Resolved"
    ).length;

  return (
    <div className="container mt-4">

      {/* Heading */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          My Complaints
        </h2>

        <span className="badge bg-dark fs-6">
          Total: {totalComplaints}
        </span>

      </div>

      {/* Stats Cards */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <div className="card border-0 shadow text-center">

            <div className="card-body">

              <h2>{totalComplaints}</h2>

              <h6 className="text-muted">
                Total Complaints
              </h6>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow text-center">

            <div className="card-body">

              <h2>{pendingComplaints}</h2>

              <h6 className="text-warning">
                Pending
              </h6>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow text-center">

            <div className="card-body">

              <h2>{resolvedComplaints}</h2>

              <h6 className="text-success">
                Resolved
              </h6>

            </div>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <input
            type="text"
            className="form-control"
            placeholder="Search by title or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="text-center mt-5">

          <div className="spinner-border text-primary"></div>

        </div>

      ) : filteredComplaints.length === 0 ? (

        <div className="alert alert-info">
          No Complaints Found
        </div>

      ) : (

        <div className="card shadow border-0">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredComplaints.map(
                    (complaint) => (

                      <tr key={complaint.id}>

                        <td>
                          {complaint.title}
                        </td>

                        <td>
                          {complaint.category}
                        </td>

                        <td>

                          <span
                            className={`badge ${getBadgeClass(
                              complaint.status
                            )}`}
                          >
                            {complaint.status}
                          </span>

                        </td>

                        <td>

                          <Link
                            to={`/complaint/${complaint.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyComplaints;