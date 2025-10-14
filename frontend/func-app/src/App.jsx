import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { API_CONFIG } from "./config";

const api = axios.create(API_CONFIG);

export default function App() {
  const [functions, setFunctions] = useState([]);
  const [formData, setFormData] = useState({
    f_id: "",
    funcname: "",
    funccap: "",
    contactno: "",
    email: "",
    candname: ""
  });
  const [getId, setGetId] = useState("");
  const [selectedFunc, setSelectedFunc] = useState(null);

  // Fetch all functions
  const fetchFunctions = () => {
    api
      .get("/viewfunc")
      .then((res) => setFunctions(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Book / Update function
  const handleSubmit = (e) => {
    e.preventDefault();

    const isUpdate = functions.find(
      (f) => f.f_id === parseInt(formData.f_id)
    );

    if (isUpdate) {
      // ✅ Update with PUT /updatefunc/{id}
      api
        .put(`/updatefunc/${formData.f_id}`, formData)
        .then((res) => {
          alert(res.data || "Function updated successfully!");
          resetForm();
          fetchFunctions();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to update function!");
        });
    } else {
      // ✅ Create with POST /bookfunc
      api
        .post("/bookfunc", formData)
        .then((res) => {
          alert(res.data || "Function booked successfully!");
          resetForm();
          fetchFunctions();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to book function!");
        });
    }
  };

  const resetForm = () => {
    setFormData({
      f_id: "",
      funcname: "",
      funccap: "",
      contactno: "",
      email: "",
      candname: ""
    });
  };

  // Delete function
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this function?")) {
      api
        .delete(`/deletefunc/${id}`)
        .then(() => {
          alert("Function deleted successfully!");
          fetchFunctions();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete function!");
        });
    }
  };

  // Get function by ID
  const handleGetById = (e) => {
    e.preventDefault();
    api
      .get(`/func/${getId}`)
      .then((res) => setSelectedFunc(res.data))
      .catch((err) => {
        console.error(err);
        alert("Function not found!");
        setSelectedFunc(null);
      });
  };

  // Prefill form for editing
  const handleEdit = (func) => {
    setFormData(func);
  };

  // Field labels mapping
  const fieldLabels = {
    f_id: "Function ID",
    funcname: "Function Name",
    funccap: "Capacity",
    contactno: "Contact Number",
    email: "Email Address",
    candname: "Candidate Name"
  };

  return (
    <div className="container">
      <h1 className="page-title">Function Management Dashboard</h1>

      <div className="dashboard">
        {/* Form for Book / Update */}
        <div className="card">
          <h2 className="card-title">
            {functions.find((f) => f.f_id === parseInt(formData.f_id))
              ? "Update Function"
              : "Book New Function"}
          </h2>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div key={key} className="form-group">
                <label htmlFor={key}>{fieldLabels[key] || key}</label>
                <input
                  id={key}
                  className="form-control"
                  type={
                    key === "f_id"
                      ? "number"
                      : key === "email"
                      ? "email"
                      : "text"
                  }
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className={`btn ${
                functions.find((f) => f.f_id === parseInt(formData.f_id))
                  ? "btn-success"
                  : "btn-primary"
              }`}
            >
              {functions.find((f) => f.f_id === parseInt(formData.f_id))
                ? "Update"
                : "Book"}
            </button>
          </form>
        </div>

        {/* Get Function by ID */}
        <div className="card">
          <h2 className="card-title">Find Function</h2>
          <form onSubmit={handleGetById}>
            <div className="form-group">
              <label htmlFor="getId">Enter Function ID</label>
              <input
                id="getId"
                className="form-control"
                type="number"
                value={getId}
                onChange={(e) => setGetId(e.target.value)}
                placeholder="Enter function ID"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Find
            </button>
          </form>

          {selectedFunc && (
            <div className="function-details">
              <h3>Function Details</h3>
              <p>
                <strong>ID:</strong> <span>{selectedFunc.f_id}</span>
              </p>
              <p>
                <strong>Name:</strong> <span>{selectedFunc.funcname}</span>
              </p>
              <p>
                <strong>Capacity:</strong> <span>{selectedFunc.funccap}</span>
              </p>
              <p>
                <strong>Contact:</strong> <span>{selectedFunc.contactno}</span>
              </p>
              <p>
                <strong>Email:</strong> <span>{selectedFunc.email}</span>
              </p>
              <p>
                <strong>Candidate:</strong> <span>{selectedFunc.candname}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* All Functions Table */}
      <div className="table-container">
        <h2 className="card-title">All Functions</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Capacity</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Candidate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {functions.length > 0 ? (
              functions.map((f) => (
                <tr key={f.f_id}>
                  <td>{f.f_id}</td>
                  <td>{f.funcname}</td>
                  <td>{f.funccap}</td>
                  <td>{f.contactno}</td>
                  <td>{f.email}</td>
                  <td>{f.candname}</td>
                  <td className="action-buttons">
                    <button
                      onClick={() => handleEdit(f)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.f_id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No functions found. Add a new one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
