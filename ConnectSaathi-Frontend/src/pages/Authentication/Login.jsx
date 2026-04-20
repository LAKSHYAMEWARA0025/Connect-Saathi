import React, { useState, useEffect } from "react";

const AuthForm = () => {
  const [currentForm, setCurrentForm] = useState("signup1"); // 'signup1', 'signup2', 'login'
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    loginPassword: "",
    remember: false,
  });

  const regex = [
    /^[a-zA-Z0-9_]+$/,
    /^[a-z0-9.%]+@[a-z]{2,}\.[a-z]{2,}$/,
    /^[a-zA-Z0-9_.@]+$/,
  ];

  // Live input validation
  const validateInput = (value, type, id) => {
    if (type === "text") {
      if (id === "email" || id === "loginEmail") return value;
      if (!regex[0].test(value) && value !== "") {
        return value.slice(0, -1);
      }
    } else if (type === "password") {
      if (!regex[2].test(value) && value !== "") {
        return value.slice(0, -1);
      }
    }
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      const validatedValue = validateInput(value, e.target.type, name);
      setFormData((prev) => ({ ...prev, [name]: validatedValue }));
    }
  };

  // Auto-fill stored credentials
  useEffect(() => {
    if (currentForm === "login") {
      // Note: localStorage is not available in Claude.ai artifacts
      // This would work in a real environment
      const storedAuth = null; // localStorage.getItem('user_auth');
      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setFormData((prev) => ({
          ...prev,
          loginEmail: parsedAuth.email,
          loginPassword: parsedAuth.password,
          remember: true,
        }));
      }
    }
  }, [currentForm]);

  const saveAuth = (data) => {
    if (!formData.remember) return;
    // Note: localStorage is not available in Claude.ai artifacts
    // localStorage.setItem('user_auth', JSON.stringify({
    //   email: data.email,
    //   password: data.password,
    // }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "signup1") {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentForm("signup2");
        setIsAnimating(false);
      }, 600);
      return;
    }

    if (type === "signup2") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData =
        type === "signup2"
          ? {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              registrationType: "signup",
            }
          : {
              email: formData.loginEmail,
              password: formData.loginPassword,
              registrationType: "login",
            };

      console.log("User data:", userData);

      // Simulate successful response
      if (type === "login") {
        saveAuth({
          email: formData.loginEmail,
          password: formData.loginPassword,
        });
      }

      setIsLoading(false);
      alert("Authentication successful!");
    }, 2000);
  };

  const switchToLogin = () => {
    setCurrentForm("login");
  };

  const switchToSignup = () => {
    setCurrentForm("signup1");
  };

  const goBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentForm("signup1");
      setIsAnimating(false);
    }, 600);
  };

  const FormImage = () => (
    <div className="w-full h-24 sm:h-28 md:h-32 lg:h-36 relative rounded-t-2xl bg-gradient-to-br from-blue-400 to-cyan-400 overflow-hidden flex-shrink-0">
      <svg
        className="absolute bottom-[-1px] left-0 right-0 w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1300 148"
      >
        <path
          fill="white"
          fillRule="evenodd"
          d="M.005 121C311 121 409.898-.25 811 0c400 0 500 121 789 121v77H0s.005-48 .005-77z"
          transform="matrix(-1 0 0 1 1600 0)"
        />
      </svg>
    </div>
  );

  const InputGroup = ({ id, name, type, label, value, required = true }) => (
    <div className="w-full relative mb-6">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="border-0 border-b-2 border-cyan-400 w-full p-2 transition-colors duration-300 focus:outline-none focus:border-blue-400 bg-transparent text-sm sm:text-base peer"
      />
      <label
        htmlFor={id}
        className="absolute top-2 left-0 cursor-text transition-all duration-300 text-cyan-600 text-sm sm:text-base peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-valid:scale-75 peer-valid:-translate-y-6 peer-valid:text-blue-500"
      >
        {label}
      </label>
    </div>
  );

  const SubmitButton = ({ value, onClick }) => (
    <button
      type="submit"
      onClick={onClick}
      className="w-full py-3 sm:py-4 text-center rounded-full border-2 border-blue-400 font-bold bg-blue-400 text-white my-4 transition-all duration-300 hover:bg-white hover:text-blue-500 cursor-pointer text-sm sm:text-base"
    >
      {value}
    </button>
  );

  const LoadingOverlay = () => (
    <div
      className={`fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm z-50 ${
        isLoading ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center text-gray-300">
        <div className="mb-8 flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
        <span className="text-sm sm:text-base">Loading... Hold Tight</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center font-sans overflow-hidden p-4 sm:p-6 bg-gray-100">
      <div className="relative w-full flex items-center justify-center min-h-[500px] sm:min-h-[500px]">
        {/* Signup Form 1 */}
        <div
          className={`absolute transform transition-all duration-700 ${
            currentForm === "signup1"
              ? "translate-x-0 scale-100 z-20"
              : currentForm === "signup2"
              ? "-translate-x-1/2 scale-90 z-10"
              : "translate-y-full opacity-0 z-0"
          } ${isAnimating ? "scale-110" : ""}`}
          style={{
            transform: `${
              currentForm === "signup1"
                ? "skew(0deg, -3deg)"
                : currentForm === "signup2"
                ? "translateX(-10%) scale(0.9) skew(0deg, -3deg)"
                : "translateY(200%) skew(0deg, -3deg)"
            }`,
          }}
        >
          <div className="w-80 sm:w-96 max-h-[500px] sm:max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col">
            <FormImage />
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex-1 flex flex-col justify-between">
              <h1 className="mb-6 text-blue-500 text-xl sm:text-2xl lg:text-3xl font-bold">
                Create an Account
              </h1>

              <form
                onSubmit={(e) => handleSubmit(e, "signup1")}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <InputGroup
                    id="username"
                    name="username"
                    type="text"
                    label="Name"
                    value={formData.username}
                  />
                  <InputGroup
                    id="email"
                    name="email"
                    type="text"
                    label="Email"
                    value={formData.email}
                  />
                </div>

                <SubmitButton value="Get Started" />
              </form>

              <span className="text-center text-xs sm:text-sm text-cyan-600 mt-auto">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={switchToLogin}
                  className="text-blue-500 font-bold hover:underline cursor-pointer"
                >
                  Log in.
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Signup Form 2 */}
        <div
          className={`absolute transform transition-all duration-700 ${
            currentForm === "signup2"
              ? "translate-x-0 scale-100 z-20"
              : currentForm === "signup1"
              ? "translate-x-1/2 scale-90 z-10"
              : "translate-y-full opacity-0 z-0"
          } ${isAnimating ? "scale-110" : ""}`}
          style={{
            transform: `${
              currentForm === "signup2"
                ? "skew(0deg, -3deg)"
                : currentForm === "signup1"
                ? "translateX(10%) scale(0.9) skew(0deg, -3deg)"
                : "translateY(200%) skew(0deg, -3deg)"
            }`,
          }}
        >
          <div className="w-80 sm:w-96 max-h-[500px] sm:max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col">
            <FormImage />
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex-1 flex flex-col justify-between">
              <h1 className="mb-6 text-blue-500 text-xl sm:text-2xl lg:text-3xl font-bold">
                Set Your Password
              </h1>

              <form
                onSubmit={(e) => handleSubmit(e, "signup2")}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <InputGroup
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formData.password}
                  />
                  <InputGroup
                    id="confirmPassword"
                    name="confirmPassword"
                    type="text"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                  />
                </div>

                <SubmitButton value="Sign Up" />
              </form>

              <span className="text-center text-xs sm:text-sm text-cyan-600 mt-auto">
                <button
                  type="button"
                  onClick={goBack}
                  className="text-blue-500 font-bold hover:underline cursor-pointer"
                >
                  Go back.
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div
          className={`absolute transform transition-all duration-500 ${
            currentForm === "login"
              ? "translate-y-0 z-30"
              : "translate-y-full z-0"
          }`}
          style={{
            transform: `${
              currentForm === "login"
                ? "translateY(0) skew(0deg, -3deg)"
                : "translateY(200%) skew(0deg, -3deg)"
            }`,
          }}
        >
          <div className="w-80 sm:w-96 max-h-[500px] sm:max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col">
            <FormImage />
            <div className="p-4 sm:p-6 lg:p-8 xl:p-12 flex-1 flex flex-col justify-between">
              <h1 className="mb-6 text-blue-500 text-xl sm:text-2xl lg:text-3xl font-bold">
                Login
              </h1>

              <form
                onSubmit={(e) => handleSubmit(e, "login")}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <InputGroup
                    id="loginEmail"
                    name="loginEmail"
                    type="text"
                    label="Email"
                    value={formData.loginEmail}
                  />
                  <InputGroup
                    id="loginPassword"
                    name="loginPassword"
                    type="password"
                    label="Password"
                    value={formData.loginPassword}
                  />

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="w-3 h-3 border-2 border-blue-400 rounded-full appearance-none checked:bg-blue-400 checked:border-blue-400 relative cursor-pointer"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-3 text-xs sm:text-sm text-cyan-600"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <SubmitButton value="Log in" />
              </form>

              <span className="text-center text-xs sm:text-sm text-cyan-600 mt-auto">
                No account?{" "}
                <button
                  type="button"
                  onClick={switchToSignup}
                  className="text-blue-500 font-bold hover:underline cursor-pointer"
                >
                  Sign up.
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <LoadingOverlay />
    </div>
  );
};

export default AuthForm;
