import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response =
        await API.post(
          "/auth/login/",
          formData
        );

      console.log(
        "Login Response:",
        response.data
      );

       localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      localStorage.setItem(
        "user_email",
        response.data.email || ""
      );

      localStorage.setItem(
        "user_name",
        response.data.name || ""
      );

      localStorage.setItem(
        "role",
        response.data.role || "user"
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
     } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Login
              </h2>

              <form
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100"
                >
                  {loading
                    ? "Logging In..."
                    : "Login"}
                </button>
              </form>
                <p className="text-center mt-3">
  Don't have an account?{" "}
  <a href="/register" className="text-primary">
    Register Here
  </a>
</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;