import React, { useState } from "react";
import "./../styles/Auth.css";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      // Send API request to backend (Nest.js)
      console.log({ email, password });
    };

    
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="form-group">
            <label>Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group-checkbox">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
          <p>
            Don't have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    );
};  

export default RegisterForm;
