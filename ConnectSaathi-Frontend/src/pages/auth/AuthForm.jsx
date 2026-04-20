import React, { useState } from "react";

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function AuthForm({ mode, switchMode, onSubmit, error, loading }) {
  const [fields, setFields] = useState({
    username: "",
    name: "",
    email: "",
    password: ""
  });
  const [touched, setTouched] = useState({});

  const handleChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const handleBlur = e => {
    setTouched({ ...touched, [e.target.name]: true });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(fields);
  };

  const errors = {};
  if (mode === "signup") {
    if (!fields.username) errors.username = "Username required";
    if (!fields.name) errors.name = "Name required";
    if (!fields.email) errors.email = "Email required";
    else if (!validateEmail(fields.email)) errors.email = "Invalid email";
    if (!fields.password) errors.password = "Password required";
    else if (fields.password.length < 6) errors.password = "Min 6 chars";
  } else {
    if (!fields.username) errors.username = "Username required";
    if (!fields.password) errors.password = "Password required";
  }

  return (
    <form
      className="w-full max-w-sm bg-white bg-opacity-90 rounded-xl shadow-xl px-8 py-8 flex flex-col gap-3"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="flex mb-4">
        <button
          type="button"
          className={`flex-1 py-2 rounded-l-lg font-semibold transition-colors ${
            mode === "login"
              ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white"
              : "bg-gray-100 text-blue-700"
          }`}
          onClick={() => switchMode("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-r-lg font-semibold transition-colors ${
            mode === "signup"
              ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white"
              : "bg-gray-100 text-purple-700"
          }`}
          onClick={() => switchMode("signup")}
        >
          Sign Up
        </button>
      </div>
      <h2 className="text-2xl font-bold text-blue-700 mb-2">
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>
      <div>
        <input
          name="username"
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={fields.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.username && touched.username
              ? "border-purple-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.username && touched.username && (
          <span className="text-sm text-red-500">{errors.username}</span>
        )}
      </div>
      {mode === "signup" && (
        <>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.name && touched.name
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.name && touched.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.email && touched.email
                  ? "border-purple-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.email && touched.email && (
              <span className="text-sm text-red-500">{errors.email}</span>
            )}
          </div>
        </>
      )}
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={fields.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.password && touched.password
              ? "border-purple-500"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
        {errors.password && touched.password && (
          <span className="text-sm text-red-500">{errors.password}</span>
        )}
      </div>
      {error && (
        <div className="text-sm text-red-600 font-medium">{error}</div>
      )}
      <button
        type="submit"
        className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold text-lg shadow-md hover:from-purple-500 hover:to-blue-600 transition-all disabled:opacity-50"
        disabled={Object.keys(errors).length > 0 || loading}
      >
        {loading
          ? "Processing..."
          : mode === "login"
          ? "Login"
          : "Sign Up"}
      </button>
      {mode === "login" && (
        <a
          href="#"
          className="text-right hidden text-xs text-blue-600 hover:underline mt-2"
        >
          Forgot password?
        </a>
      )}
      <div className="text-center mt-2 text-sm">
        {mode === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <span
          className="text-purple-600 font-semibold cursor-pointer hover:underline"
          onClick={() => switchMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </span>
      </div>
    </form>
  );
}
