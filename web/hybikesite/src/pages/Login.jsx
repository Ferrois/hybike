import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../Components/Button";
import Header from "../Components/Header";
import { Input } from "../Components/Input";
import { useAuth } from "../Context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const status = await login(username, password);
      console.log(status)
      toast("Logged in successfully", { type: "success" })
    } catch (err) {
      console.log(err.response.data);
      toast(err.response.data.message, { type: "error" })
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-700 text-white">
      <Header/>
      <div className="flex flex-grow items-center justify-center flex-col">
        <div className="text-2xl pb-5">Login.</div>
      <form className="w-1/2 max-w-xs flex flex-col mx-auto">
        <label>Username</label>
        <Input
          className="bg-gray-100 border-black border-2 rounded-md"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Password</label>
        <Input
          className="bg-gray-100 border-black border-2 rounded-md"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link to="/register" className="text-blue-300 underline hover:text-blue-200">Create your account</Link>
        <Button
          onClick={(e) => handleLogin(e)}
          className="bg-blue-500 rounded-md shadow-md border-gray-800 border-2 mt-2 text-white font-bold"
        >
          Login
        </Button>
      </form></div>
    </div>
  );
}
