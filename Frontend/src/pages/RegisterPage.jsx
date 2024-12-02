import React from "react";
import RegisterForm from "../components/RegisterForm";
import "./../styles/Auth.css"; // Ensure global styles or page-specific overrides are applied

const RegisterPage = () => {
  return (
    <div className="login-page">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
