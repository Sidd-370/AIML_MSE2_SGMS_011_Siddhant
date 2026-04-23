import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "", email: "", password: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    await API.post("/register", data);
    alert("Registered");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={(e)=>setData({...data,name:e.target.value})} />

      <input placeholder="Email"
        onChange={(e)=>setData({...data,email:e.target.value})} />

      <input placeholder="Password"
        onChange={(e)=>setData({...data,password:e.target.value})} />

      <button onClick={register}>Register</button>
    </div>
  );
}