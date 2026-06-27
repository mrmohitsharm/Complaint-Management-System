import { useState } from "react";
import API from "../services/api";

function CreateComplaint() {

const [formData, setFormData] = useState({
title: "",
description: "",
category: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();


const user_email =
  localStorage.getItem("user_email");

try {

  await API.post(
    "/complaints/create/",
    {
      ...formData,
      user_email,
    }
  );

  alert("Complaint Submitted Successfully");

  setFormData({
    title: "",
    description: "",
    category: "",
  });

} catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    "Error Creating Complaint"
  );
}


};

return ( <div className="container mt-5">

```
  <div className="row justify-content-center">

    <div className="col-md-8">

      <div className="card shadow-lg border-0">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Create New Complaint
          </h3>

        </div>

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label">
                Complaint Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter complaint title"
                value={formData.title}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Category
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Water">
                  Water
                </option>

                <option value="Internet">
                  Internet
                </option>

                <option value="Road">
                  Road
                </option>

                <option value="Cleaning">
                  Cleaning
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <div className="mb-4">

              <label className="form-label">
                Description
              </label>

              <textarea
                name="description"
                rows="5"
                className="form-control"
                placeholder="Describe your issue..."
                value={formData.description}
                onChange={handleChange}
                required
              />

            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Submit Complaint
            </button>

          </form>

        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default CreateComplaint;
