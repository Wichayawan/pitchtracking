import React, { useState } from "react";
import kobelcoLogo from "../assets/Kobelco-Logo.png";
import loginImage from "../assets/login_image.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // ล็อกอินจำลอง (ภายหลังค่อยเชื่อม backend)
    localStorage.setItem("auth", "true");
    navigate("/parts", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="flex w-full max-w-5xl rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-br from-cyan-500 to-blue-600 p-8 hidden md:flex items-center justify-center">
          <img
            src={loginImage} // ใช้ path จริงตามภาพที่คุณมี
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <img
            src={kobelcoLogo}
            alt="Login_Logo"
            className="h-40 w-60 mx-auto"
          />
          <form className="space-y-6 w-72 mx-auto"onSubmit={onSubmit}>
            {/* Username */}
            <div>
              <label className="block text-gray-600 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                placeholder=""
              />
            </div>

            {/* Password */}
            <div>
  <label className="block text-gray-600 mb-1">Password</label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      className="w-full px-4 pr-12 py-2 border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
      placeholder=""
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      // ใช้ inset-y-0 + flex items-center ให้อยู่กลางแนวตั้งสวย ๆ
      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
    </button>
  </div>
</div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#0071bc] text-white font-semibold hover:bg-blue-700 transition"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
