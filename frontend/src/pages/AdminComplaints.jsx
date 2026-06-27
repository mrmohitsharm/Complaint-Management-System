import { useEffect, useState } from "react";
import API from "../services/api";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [loading, setLoading] =
    useState(true);

  const fetchComplaints = async () => {
    try {
      const response = await API.get(
        "/complaints/"
      );

      setComplaints(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await API.put(
        `/complaints/update/${id}/`,
        {
          status,
        }
      );

      fetchComplaints();
    } catch (error) {
      console.log(error);

      alert(
        "Failed to update complaint status"
      );
    }
  };

  const deleteComplaint = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this complaint?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/complaints/delete/${id}/`
      );

      fetchComplaints();
    } catch (error) {
      console.log(error);

      alert(
        "Failed to delete complaint"
      );
    }
  };

  const getBadgeClass = (
    status
  ) => {
    switch (status) {
      case "Resolved":
        return "bg-success";

      case "Pending":
        return "bg-warning text-dark";

      case "Rejected":
        return "bg-danger";

      case "In Progress":
        return "bg-primary";

      default:
        return "bg-secondary";
    }
  };

  const filteredComplaints =
    complaints.filter(
      (complaint) => {
        const matchesSearch =
          complaint.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          complaint.user_email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStatus =
          statusFilter === "All"
            ? true
            : complaint.status ===
              statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  return (
  <div className="container-fluid py-4">

    {/* Header */}

    <div className="card shadow border-0 mb-4">
      <div className="card-body bg-dark text-white rounded">
        <h2 className="mb-1">
          Complaint Management System
        </h2>

        <p className="mb-0">
          Manage and track all complaints
        </p>
      </div>
    </div>

    {/* Analytics Cards */}

    <div className="row mb-4">

      <div className="col-md-3">
        <div className="card shadow border-0 text-center">
          <div className="card-body">
            <h3>{complaints.length}</h3>
            <p className="text-muted mb-0">
              Total Complaints
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0 text-center">
          <div className="card-body">
            <h3 className="text-warning">
              {
                complaints.filter(
                  c => c.status === "Pending"
                ).length
              }
            </h3>

            <p className="text-muted mb-0">
              Pending
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0 text-center">
          <div className="card-body">
            <h3 className="text-success">
              {
                complaints.filter(
                  c => c.status === "Resolved"
                ).length
              }
            </h3>

            <p className="text-muted mb-0">
              Resolved
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow border-0 text-center">
          <div className="card-body">
            <h3 className="text-danger">
              {
                complaints.filter(
                  c => c.status === "Rejected"
                ).length
              }
            </h3>

            <p className="text-muted mb-0">
              Rejected
            </p>
          </div>
        </div>
      </div>

    </div>

    {/* Search Filter */}

    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <div className="row">

          <div className="col-md-8">

            <input
              type="text"
              className="form-control"
              placeholder="Search by title or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="col-md-4">

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

      </div>
    </div>

    {/* Table */}

    <div className="card shadow border-0">

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>User</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredComplaints.map(
                (complaint) => (

                  <tr key={complaint.id}>

                    <td>
                      <strong>
                        {complaint.title}
                      </strong>
                    </td>

                    <td>
                      {complaint.category}
                    </td>

                    <td>
                      {complaint.user_email}
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

                      <select
                        className="form-select"
                        value={
                          complaint.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            complaint.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="In Progress">
                          In Progress
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>

                      </select>

                    </td>

                    <td>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          deleteComplaint(
                            complaint.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
);
}

export default AdminComplaints;