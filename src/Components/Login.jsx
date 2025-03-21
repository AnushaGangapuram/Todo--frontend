import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser } from "../service/AuthService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = (name, value) => {
    let error = "";
    if (name === "username") {
      if (!value) {
        error = "Username is required.";
      } else if (value.length < 3) {
        error = "Username must be at least 3 characters long.";
      }
    }
    if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate field on change
    const errorMessage = validate(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Final validation check before submitting
    const usernameError = validate("username", formData.username);
    const passwordError = validate("password", formData.password);
    setErrors({ username: usernameError, password: passwordError });
  
    if (usernameError || passwordError) return;
  
    try {
      const response = await loginUser(formData);
      
      // Redirect to Todo page if login is successful
      if (response) {
        navigate("/todos"); // Change this to your actual Todo route
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      setMessage(error.message || "Login failed.");
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card w-50 mx-auto p-4">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={errors.username || errors.password}>
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>

        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default Login;

