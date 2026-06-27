import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const response = await API.get(
        `/complaints/${id}/`
      );

      setComplaint(response.data);
    } catch (error) {
      console.log(error);
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

  if (!complaint) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3">
          Loading Complaint Details...
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-header bg-dark text-white">

              <div className="d-flex justify-content-between align-items-center">

                <h3 className="mb-0">
                  Complaint Details
                </h3>

                <span
                  className={`badge ${getBadgeClass(
                    complaint.status
                  )}`}
                >
                  {complaint.status}
                </span>

              </div>

            </div>

            <div className="card-body">

              <h2 className="mb-4">
                {complaint.title}
              </h2>

              <div className="mb-3">
                <strong>Category:</strong>
                <p className="mt-1 text-muted">
                  {complaint.category}
                </p>
              </div>

              <div className="mb-3">
                <strong>Description:</strong>
                <div className="border rounded p-3 bg-light mt-2">
                  {complaint.description}
                </div>
              </div>

              <div className="mb-3">
                <strong>Submitted By:</strong>
                <p className="mt-1">
                  {complaint.user_email}
                </p>
              </div>

              <div className="mb-3">
                <strong>Current Status:</strong>
                <br />

                <span
                  className={`badge fs-6 mt-2 ${getBadgeClass(
                    complaint.status
                  )}`}
                >
                  {complaint.status}
                </span>
              </div>

            </div>

            <div className="card-footer bg-white">

              <Link
                to="/my-complaints"
                className="btn btn-secondary"
              >
                ← Back to My Complaints
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;