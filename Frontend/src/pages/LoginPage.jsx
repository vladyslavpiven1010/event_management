import React from "react";
import LoginForm from "../components/LoginForm";
import "./../styles/Auth.css"; // Ensure global styles or page-specific overrides are applied

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
