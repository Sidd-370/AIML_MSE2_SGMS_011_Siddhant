import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/login", data);
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <button onClick={login}>Login</button>
    </div>
  );
}