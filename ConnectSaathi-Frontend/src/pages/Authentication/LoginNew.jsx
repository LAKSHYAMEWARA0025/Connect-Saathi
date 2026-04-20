import React, { useRef, useState } from "react";
// import "@fontsource/bebas-neue";

const regex = [
  /^[a-zA-Z0-9_]+$/, // Username
  /^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/, // Email
  /^[a-zA-Z0-9_.@]+$/, // Password
];

const minLengths = [3, 3, 8];

export default function App() {
  const [formType, setFormType] = useState("signup");
  const [inputs, setInputs] = useState(["", "", ""]);
  const [errors, setErrors] = useState(["", "", ""]);

  const overlayRef = useRef();
  const greetingRef = useRef();
  const formRef = useRef();
  const loginHeaderRef = useRef();
  const signupHeaderRef = useRef();
  const buttonContainerRef = useRef();

  const switchForm = () => {
    const isSignup = formType === "signup";
    setErrors(["", "", ""]);
    setInputs(["", "", ""]);

    loginHeaderRef.current.style.transition = "0.5s";
    signupHeaderRef.current.style.transition = "0.5s";
    formRef.current.style.transition = "0.5s";
    greetingRef.current.style.transition = "0.5s";
    overlayRef.current.style.transition = "1.5s";

    if (isSignup) {
      loginHeaderRef.current.style.transform = "translateX(-100%)";
      signupHeaderRef.current.style.transform = "translateX(100%)";
      formRef.current.style.transform = "translateX(120%)";
      formRef.current.style.opacity = 0;
      greetingRef.current.style.transform = "translateX(-100%)";
      greetingRef.current.style.opacity = 0;
      overlayRef.current.style.transform =
        "rotateZ(-80deg) skew(-40deg) translateY(25%) translateX(88%)";
      setTimeout(() => {
        formRef.current.style.transform = "translateX(-220%)";
        greetingRef.current.style.transform = "translateX(100%)";
      }, 600);
      setTimeout(() => {
        formRef.current.style.opacity = 1;
        greetingRef.current.style.opacity = 1;
        formRef.current.style.transform = "translateX(-110%)";
        greetingRef.current.style.transform = "translateX(55%)";
        loginHeaderRef.current.style.transform = "translateX(0%)";
      }, 2000);
    } else {
      loginHeaderRef.current.style.transform = "translateX(-100%)";
      signupHeaderRef.current.style.transform = "translateX(100%)";
      formRef.current.style.transform = "translateX(-220%)";
      greetingRef.current.style.transform = "translateX(100%)";
      formRef.current.style.opacity = 0;
      greetingRef.current.style.opacity = 0;
      overlayRef.current.style.transform =
        "skew(-40deg) translateY(-10%) translateX(-110%)";
        setTimeout(() => {
          formRef.current.style.transform = "translateX(120%)";
          greetingRef.current.style.transform = "translateX(-100%)";
        }, 600);
      setTimeout(() => {
        formRef.current.style.opacity = 1;
        greetingRef.current.style.opacity = 1;
        formRef.current.style.transform = "translateX(0%)";
        greetingRef.current.style.transform = "translateX(-70%)";
        loginHeaderRef.current.style.transform = "translateX(0%)";
        signupHeaderRef.current.style.transform = "translateX(0%)";
      }, 2000);
    }
    setFormType(isSignup ? "login" : "signup");
  };

  const validate = (index, value) => {
    const isShort = value.length < minLengths[index];
    const isValid = regex[index].test(value);

    if (isShort) return "short";
    if (!isValid) return "invalid";
    return "";
  };

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const errorType = validate(index, value);
    const newErrors = [...errors];
    newErrors[index] = errorType;
    setErrors(newErrors);
  };

  const getErrorMessage = (type, index) => {
    const messages = [
      [
        "Please fill out this field !",
        "Only letters, numbers and _ is allowed !",
        "input must contain at least 3 characters",
      ],
      ["Please fill out this field !", "Invalid email", "Invalid email"],
      [
        "Please fill out this field !",
        "Only letters, numbers, _ and @ is allowed !",
        "Password must contain at least 8 characters",
      ],
    ];
    return type ? messages[index][type === "short" ? 2 : 1] : "";
  };

  const handleSubmit = () => {
    const newErrors = inputs.map((input, index) => validate(index, input));
    setErrors(newErrors);
    const isValid = newErrors.every((e) => e === "");
    if (isValid) alert(`${formType === "signup" ? "Signed Up" : "Logged In"}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-[750px] h-[450px] border-[1.5px] border-black rounded-xl shadow-xl overflow-hidden">
        <div
          ref={overlayRef}
          className="absolute w-[950px] h-[1300px] bg-black skew-x-[-40deg] -translate-x-[98%] -translate-y-[10%] transition-transform duration-[1500ms]"
        ></div>

        <div className="flex h-[15%] w-full justify-between bg-white">
          <div
            ref={loginHeaderRef}
            className="w-1/2 text-center flex flex-col-reverse font-bebas text-2xl"
          >
            Login
          </div>
          <div
            ref={signupHeaderRef}
            className="w-1/2 text-center flex flex-col-reverse font-bebas text-2xl"
          >
            Sign Up
          </div>
        </div>

        <div className="flex h-[85%] bg-white">
          <div className="w-1/2 pt-10">
            <div
              ref={greetingRef}
              className="hidden md:flex w-[200%] justify-between transform -translate-x-[70%] transition-transform duration-500"
            >
              <div className="text-white pl-2">
                <h1 className="text-xl">WELCOME BACK !</h1>
                <p className="pl-[20%]">BECOME THE PERSON NO ONE</p>
                <p className="pl-[36%]">THOUGHT YOU ARE</p>
                <p className="pl-[50%]">CAPABLE OF</p>
              </div>
              <div className="text-white pl-5">
                <h1 className="text-xl">NAMASTE 🙏</h1>
                <p className="text-xs">
                  WE HAVE TWO LIVES AND THE SECOND <br /> ONE BEGINS WHEN YOU
                  REALIZE <br /> THAT YOU HAVE ONLY ONE
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 pl-5">
            <div
              ref={formRef}
              className="h-full w-[95%] transition-transform overflow-hidden"
            >
              <form
                onSubmit={(e) => e.preventDefault()}
                className="h-[65%] flex flex-col justify-evenly"
              >
                {["Username", "Email", "Password"].map((label, idx) => (
                  <div key={idx} className="relative border-b-2 border-black">
                    <input
                      type={
                        label === "Password"
                          ? "password"
                          : label === "Email"
                          ? "email"
                          : "text"
                      }
                      placeholder=" "
                      value={inputs[idx]}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      className="peer bg-transparent w-[85%] h-8 outline-none text-sm text-black"
                    />
                    <i className="material-icons absolute right-2 transition-all duration-300 text-black bottom-0 peer-focus:bottom-full peer-placeholder-shown:bottom-0">
                      {label === "Username"
                        ? "person_pin"
                        : label === "Email"
                        ? "email"
                        : "lock"}
                    </i>
                    <label className="absolute left-0 text-black text-base transform transition-all duration-300 pointer-events-none bottom-0 peer-focus:bottom-full peer-placeholder-shown:bottom-0">
                      {label}
                    </label>
                  </div>
                ))}
              </form>
              <div
                ref={buttonContainerRef}
                className="w-[200%] h-[15%] mt-4 flex justify-between items-center pl-10"
              >
                <button
                  className="w-64 h-[70%] bg-black text-white rounded-3xl"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <button
                  className="w-64 h-[70%] bg-black text-white rounded-3xl"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              <div className="text-center mt-2">
                <p>
                  {formType === "signup"
                    ? "Already have an account?"
                    : "Don't have an account yet?"}
                </p>
                <a href="#" className="text-blue-600" onClick={switchForm}>
                  {formType === "signup" ? "Login" : "Sign Up"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

