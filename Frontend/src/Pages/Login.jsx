import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

  const handleLogin = async() => {
    setError(""); //

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, {
        username,
        password,
      });

        if (response.data.user) {
          localStorage.setItem("teacherId", response.data.user.id);
        }
      console.log("res",response);

      alert("Login Successful!");
      navigate("/dashboard"); 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="Username"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
