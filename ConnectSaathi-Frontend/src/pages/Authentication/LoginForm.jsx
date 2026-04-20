import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  hiddenLeft: { x: "-100%", scale: 0.9, opacity: 0, skewY: "-3deg" },
  hiddenRight: { x: "100%", scale: 0.9, opacity: 0, skewY: "-3deg" },
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    skewY: "-3deg",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  },
};

const AuthForm = () => {
  const [currentForm, setCurrentForm] = useState("signup1");
  const [isLoading, setIsLoading] = useState(false);
  const [shakeForm, setShakeForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    loginEmail: "",
    loginPassword: "",
    remember: false,
  });

  const inputRefs = {
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    loginEmail: useRef(null),
    loginPassword: useRef(null),
  };


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    focusInput(name);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (type === "signup1") return setCurrentForm("signup2");

    if (type === "signup2") {
      if (formData.password !== formData.confirmPassword) {
        setShakeForm(true);
        setTimeout(() => setShakeForm(false), 500);
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Authentication successful!");
    }, 2000);
  };

  const focusInput = (inputName) => {
    inputRefs[inputName]?.current?.focus();
  };

  const InputGroup = ({ id, name, type, label, value }) => (
    <div className="w-full relative mb-6">
      <input
        ref={inputRefs[name]}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        required
        className="border-0 border-b-2 border-cyan-400 w-full p-2 bg-transparent text-sm peer focus:outline-none focus:border-blue-400"
      />
      <label
        htmlFor={id}
        className="absolute top-2 left-0 text-cyan-600 text-sm transition-all peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-valid:scale-75 peer-valid:-translate-y-6 peer-valid:text-blue-500"
      >
        {label}
      </label>
    </div>
  );

  const SubmitButton = ({ label }) => (
    <button
      type="submit"
      className="w-full py-3 rounded-full border-2 border-blue-400 bg-blue-400 text-white hover:bg-white hover:text-blue-500"
    >
      {label}
    </button>
  );

  const FormWrapper = ({ children }) => (
    <div className="w-80 sm:w-96 max-h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col">
      <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-cyan-400 relative rounded-t-2xl overflow-hidden">
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
      <div className="p-6 flex-1 flex flex-col justify-between">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full flex justify-center min-h-[500px]">
        <AnimatePresence mode="wait">
          {currentForm === "signup1" && (
            <motion.div
              key="signup1"
              initial="hiddenLeft"
              animate={shakeForm ? "shake" : "center"}
              exit="hiddenRight"
              variants={variants}
              className="absolute"
            >
              <FormWrapper>
                <h1 className="text-blue-500 text-xl font-bold mb-6">
                  Create an Account
                </h1>
                <form onSubmit={(e) => handleSubmit(e, "signup1")}>
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
                  <SubmitButton label="Get Started" />
                </form>
                <p className="text-center text-sm mt-4">
                  Already have an account?{" "}
                  <button
                    className="text-blue-500 font-bold"
                    onClick={() => setCurrentForm("login")}
                  >
                    Log in.
                  </button>
                </p>
              </FormWrapper>
            </motion.div>
          )}

          {currentForm === "signup2" && (
            <motion.div
              key="signup2"
              initial="hiddenRight"
              animate={shakeForm ? "shake" : "center"}
              exit="hiddenLeft"
              variants={variants}
              className="absolute"
            >
              <FormWrapper>
                <h1 className="text-blue-500 text-xl font-bold mb-6">
                  Set Your Password
                </h1>
                <form onSubmit={(e) => handleSubmit(e, "signup2")}>
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
                  <SubmitButton label="Sign Up" />
                </form>
                <p className="text-center text-sm mt-4">
                  <button
                    className="text-blue-500 font-bold"
                    onClick={() => setCurrentForm("signup1")}
                  >
                    Go back.
                  </button>
                </p>
              </FormWrapper>
            </motion.div>
          )}

          {currentForm === "login" && (
            <motion.div
              key="login"
              initial="hiddenLeft"
              animate="center"
              exit="hiddenRight"
              variants={variants}
              className="absolute"
            >
              <FormWrapper>
                <h1 className="text-blue-500 text-xl font-bold mb-6">Login</h1>
                <form onSubmit={(e) => handleSubmit(e, "login")}>
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
                      checked={formData.remember}
                      onChange={handleInputChange}
                      className="w-3 h-3 border-2 border-blue-400 rounded-full appearance-none checked:bg-blue-400 checked:border-blue-400"
                    />
                    <label className="ml-3 text-sm text-cyan-600">
                      Remember me
                    </label>
                  </div>
                  <SubmitButton label="Log in" />
                </form>
                <p className="text-center text-sm mt-4">
                  No account?{" "}
                  <button
                    className="text-blue-500 font-bold"
                    onClick={() => setCurrentForm("signup1")}
                  >
                    Sign up.
                  </button>
                </p>
              </FormWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
