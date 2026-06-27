import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [complaints, setComplaints] =
    useState([]);

  const userEmail =
    localStorage.getItem("user_email");

  const userName =
    localStorage.getItem("user_name");

  const role =
    localStorage.getItem("role");

  const fetchComplaints = async () => {
    try {
      const response =
        await API.get("/complaints/");

      if (role === "admin") {
        setComplaints(response.data);
      } else {
        const userComplaints =
          response.data.filter(
            (complaint) =>
              complaint.user_email ===
              userEmail
          );

        setComplaints(userComplaints);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

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

  const inProgressComplaints =
    complaints.filter(
      (c) =>
        c.status ===
        "In Progress"
    ).length;

  const chartData = {
    labels: [
      "Pending",
      "Resolved",
      "In Progress",
    ],

    datasets: [
      {
        data: [
          pendingComplaints,
          resolvedComplaints,
          inProgressComplaints,
        ],

        backgroundColor: [
          "#ffc107",
          "#198754",
          "#0d6efd",
        ],
      },
    ],
  };

  return (
    <div className="container py-4">

      {/* Header */}

      <div className="text-center mb-4">

        <h1 className="fw-bold">

          {role === "admin"
            ? "Admin Dashboard"
            : "User Dashboard"}

        </h1>

        <p className="text-muted">

          Welcome,
          <strong>
            {" "}
            {userName}
          </strong>

        </p>

      </div>

      {/* Statistics */}

      <div className="row g-3 mb-4">

        <div className="col-md-4">

          <div className="card border-0 shadow text-center bg-primary text-white">

            <div className="card-body">

              <h2>
                {totalComplaints}
              </h2>

              <h5>
                {role === "admin"
                  ? "Total Complaints"
                  : "My Complaints"}
              </h5>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow text-center bg-warning">

            <div className="card-body">

              <h2>
                {pendingComplaints}
              </h2>

              <h5>Pending</h5>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card border-0 shadow text-center bg-success text-white">

            <div className="card-body">

              <h2>
                {resolvedComplaints}
              </h2>

              <h5>Resolved</h5>

            </div>

          </div>

        </div>

      </div>

      {/* Summary + Chart */}

      {/* Summary + Chart */}

<div className="row g-4">

  {/* LEFT SIDE */}

  <div className="col-lg-8">

    <div
      className="card shadow border-0"
      style={{
        minHeight: "500px",
      }}
    >

      <div className="card-body">

        <h2 className="fw-bold text-center mb-4">
          Analytics & Summary
        </h2>

        <div className="row">

          {/* Chart */}

          <div className="col-md-6 text-center">

            <div
              style={{
                width: "250px",
                margin: "auto",
              }}
            >
              <Pie data={chartData} />
            </div>

          </div>

          {/* Summary */}

          <div className="col-md-6">

            <h4 className="mb-4">
              Summary
            </h4>

            <hr />

            <p className="fs-5">
              <strong>Total:</strong>{" "}
              {totalComplaints}
            </p>

            <p className="fs-5">
              <strong>Pending:</strong>{" "}
              {pendingComplaints}
            </p>

            <p className="fs-5">
              <strong>In Progress:</strong>{" "}
              {inProgressComplaints}
            </p>

            <p className="fs-5">
              <strong>Resolved:</strong>{" "}
              {resolvedComplaints}
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
  {role === "admin" && (

  <div className="col-lg-4">

    <div
      className="card shadow border-0 h-100"
      style={{
        minHeight: "420px",
      }}
    >

      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">

        <h3 className="fw-bold mb-3">
          Complaint Management
        </h3>

        <p className="text-muted">
          Review, update and manage all complaints
        </p>

        <Link
          to="/admin"
          className="btn btn-warning btn-lg mt-3"
        >
          Open Admin Panel
        </Link>

      </div>

    </div>

  </div>

)}

  {/* RIGHT SIDE */}

 {role === "user" && (
  <div className="col-lg-4">

    <div
      className="card shadow border-0 h-100"
      style={{
        minHeight: "500px",
      }}
    >

      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">

        <h3 className="fw-bold mb-3">
          Complaint Center
        </h3>

        <p className="text-muted mb-4">
          Create and track your complaints
        </p>

        <Link
          to="/create-complaint"
          className="btn btn-primary btn-lg w-75 mb-3"
        >
          Create Complaint
        </Link>

        <Link
          to="/my-complaints"
          className="btn btn-success btn-lg w-75"
        >
          My Complaints
        </Link>

      </div>

    </div>

  </div>
)}



      </div>

    </div>
  );
}

export default Dashboard;