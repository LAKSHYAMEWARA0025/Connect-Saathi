import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceOrientation from "./useDeviceOrientation";
import AuthForm from "./AuthForm";

function LoginSignUp() {
  const { orientation, device } = useDeviceOrientation();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    navigate("/create-profile");
  };

  const handleLoginSuccess = () => {
    navigate("/home");
  };

  const handleSubmit = async (fields) => {
    setLoading(true);
    setError("");
    
    try {
      // For demo purposes, we're using setTimeout to simulate API call
      // In a real app, you would use fetch or axios to send data to your backend
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      if (mode === "signup") {
        if (fields.username === "taken") {
          throw new Error("Username already taken");
        }
        if (fields.password === "password") {
          throw new Error("Password too weak");
        }
        
        // This is where you would send the data to your backend
        // Example with fetch:

        const userData = mode == "signup" ? {
          username: fields.username,
          name: fields.name,
          email: fields.email,
          password: fields.password
        } : {
          username: fields.username,
          password: fields.password
        }
        
        const response = await fetch(
          "https://connect-saathi.vercel.app/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Signup failed');
        }
        
        
        // For demo, we'll just show the data that would be sent
        console.log("Data sent to backend:", {
          username: fields.username,
          name: fields.name,
          email: fields.email,
          password: fields.password
        });
        
        alert("Signed up successfully!");
        localStorage.setItem('user_auth', JSON.stringify({
          username: fields.username,
          password: fields.password
        }));
        handleSignupSuccess();

      } else {
        // Login logic would go here
        alert("Logged in successfully!");
        handleLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Layout: vertical stack for mobile/portrait, side-by-side for desktop/landscape
  const isVertical = device === "mobile" && orientation === "portrait";

  return (
    <div
      className={`min-h-screen flex ${
        isVertical ? "flex-col" : "flex-row"
      } items-stretch bg-gradient-to-br from-blue-200 via-purple-200 to-blue-100`}
    >
      <div
        className={`flex flex-col justify-center ${
          isVertical
            ? "items-center py-8"
            : "items-start pl-16 pr-8 w-1/2 min-h-screen"
        } bg-gradient-to-br from-blue-700 to-purple-700 text-white`}
      >
        <h1 className="text-4xl font-extrabold mb-4">
          <span className="text-purple-300">Connect</span>
          <span className="text-blue-200">Saathi</span>
        </h1>
        <p className="text-lg font-medium">
          {isVertical
            ? "Welcome! Please login or create an account."
            : "Welcome to ConnectSaathi. A skill based, match making platform."}
        </p>
      </div>
      <div
        className={`flex flex-1 justify-center items-center ${
          isVertical ? "py-8" : ""
        }`}
      >
        <AuthForm
          mode={mode}
          switchMode={setMode}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default LoginSignUp;