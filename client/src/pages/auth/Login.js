import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImg from "../../assests/lbg.jpg";
import Logo from "../../assests/logo.jpg";
import axios from "axios";
import { triggerNotification } from "../../utils/toastUtil";

const Login = () => {
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { emailId, password } = formData;

    if (!emailId || !password) {
      triggerNotification("error", "Please enter both email and password.");
      return;
    }

    if (!isValidEmail(emailId)) {
      triggerNotification("error", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7777/auth/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        const fullName = `${response.data.user.first_Name} ${response.data.user.LastName}`;
        const userWithName = { ...response.data.user, name: fullName };
        localStorage.setItem("user", JSON.stringify(userWithName));

        triggerNotification("success", "Login successful.");
        navigate("/dashboard", { replace: true });

      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong.";
      triggerNotification("error", errMsg);
    }
  };

  return (
    <div
      className="relative bg-no-repeat bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${loginImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-400 opacity-75"></div>

      <div className="flex flex-col sm:flex-row justify-center items-center min-h-screen">
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-96 shadow-lg">
            <div className="mb-4 text-center">
              <img
                src={Logo}
                alt="Quizero Logo"
                className="h-16 mb-3 rounded shadow-lg mx-auto"
              />
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label htmlFor="emailId" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="emailId"
                  name="emailId"
                  type="text"
                  placeholder="mail@gmail.com"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Don't have an account?
                  <span
                    className="text-green-500 cursor-pointer hover:underline ml-1"
                    onClick={() => navigate("/registration")}
                  >
                    Register
                  </span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full font-semibold shadow-lg transition duration-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
