import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="card border-secondary col-md-6 col-sm-7 col-10 mx-auto my-3">
      <div class="card-header">
        <h4 className="mb-0">Log In</h4>
      </div>
      <form class="card-body form-group" onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label>Email address:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={`form-control bg-secondary text-white ${error && error.toLowerCase().includes("email") ? "is-invalid" : ""}`}
            placeholder="example123@example.com"
          />
          <div className="invalid-feedback">{error}</div>
        </div>
        <div className="form-group mb-2">
          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={`form-control bg-secondary text-white ${error && error.toLowerCase().includes("password") ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{error}</div>
        </div>
        <input type="submit" value="Log In" disabled={isLoading} className="btn btn-success m-2 ms-0"></input>
      </form>
    </div>
  );
};

export default Login;
