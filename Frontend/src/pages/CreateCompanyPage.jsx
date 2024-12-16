import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/Auth.css";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const CreateCompanyForm = () => {
  const location = useLocation();
  const token = location.state?.token || ""; // Retrieve token passed from ProfilePage
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    country_code: "",
  });

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.country_code) {
      setFormError("All fields are required!");
      return;
    }

    try {
      setFormError("");
      setSuccessMessage("");
      // API request
      const response = await axios.post(
        "http://localhost:5001/company",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
        }
      );
      
      // Update token with the new one from the response
      Cookies.set("token", response.data.accessToken);
      setSuccessMessage("Company created successfully!");
      
      const userToken = Cookies.get("token");
      console.log("User Token: ", userToken)

      const decodedToken = jwtDecode(userToken);
      const userId = decodedToken?.sub;
      console.log("User Sub:", userId)

      navigate(`/profile/${userId}`)
      console.log("Company Created:", response.data);

    } catch (error) {
      console.error("Error creating company:", error);
      setFormError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // const handleRefreshToken = async () => {
  //   try {
  //     const accessToken = Cookies.get("token");
  //     console.log("Access token:", accessToken)

  //     const response = await axios.post("http://localhost:5001/auth/refresh", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     Cookies.set("token", response.data.accessToken);
  //     console.log("Refresh token:", response.data.accessToken)
  //   } catch (err) {
  //     console.error("Error refreshing token:", err.message);
  //     setFormError("Session expired. Please log in again.");
  //   }
  // };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {formError && <p className="form-error">{formError}</p>}
        {successMessage && <p className="form-success">{successMessage}</p>}
        <h1>Create a Company</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter company description"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="country_code">Country Code:</label>
          <input
            type="text"
            id="country_code"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            placeholder="Enter country code (e.g., US)"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Company
        </button>
      </form>
    </div>
  );
};

export default CreateCompanyForm;