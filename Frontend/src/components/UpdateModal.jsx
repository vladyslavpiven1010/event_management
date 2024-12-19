import React, { useState, useEffect } from "react";
import Modal from "./../pages/Modal";
import '../styles/Profile.css'
import Cookies from "js-cookie";
import axios from "axios";

const UpdateModal = ({ userId, companyId, isCompany, onClose }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      // Fetch user or company data when the modal opens
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = Cookies.get("token");
          const endpoint = isCompany
            ? `http://localhost:5001/company/${companyId}`
            : `http://localhost:5001/user/${userId}`;
          const response = await axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
          alert("Failed to load data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userId, companyId, isCompany]);
  
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;
      setData((prevData) => ({ ...prevData, [name]: newValue }));
    };
  
    const handleSaveChanges = async () => {
      try {
        const token = Cookies.get("token");
        const endpoint = isCompany
          ? `http://localhost:5001/company/${companyId}`
          : `http://localhost:5001/user/${userId}`;
        await axios.patch(endpoint, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`${isCompany ? "Company" : "User"} data updated successfully!`);
        onClose();
      } catch (error) {
        console.error("Error updating data:", error.message);
        alert("Failed to update data.");
      }
    };
  
    if (loading) return <div>Loading data...</div>;
  
    return (
      <Modal onClose={onClose}>
        <h2>{isCompany ? "Edit Company" : "Edit Profile"}</h2>
        <form>
          {isCompany ? (
            <div div className="form-group">
                <>
                  <label>
                    Company Name:
                    <input
                      type="text"
                      name="name"
                      value={data.name || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={data.description || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Country Code:
                    <input
                      type="text"
                      name="country_code"
                      value={data.country_code || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Verified:
                    <input
                      type="checkbox"
                      name="is_verified"
                      checked={data.is_verified || false}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
            </div>
          ) : (
            <div div className="form-group">
                <>
                  <label>
                    <h3>Username</h3>
                    <input
                      type="text"
                      name="username"
                      value={data.username || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                  <h3>Name</h3>
                    <input
                      type="text"
                      name="name"
                      value={data.name || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <h3>Email</h3>
                    <input
                      type="email"
                      name="email"
                      value={data.email || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <h3>Bio</h3>
                    <textarea
                      name="bio"
                      value={data.bio || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    <h3>Gender</h3>
                    <select
                      name="gender"
                      value={data.gender || ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </>
            </div>
          )}
          <button type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
        </form>
      </Modal>
    );
  };
  
  export default UpdateModal;
  