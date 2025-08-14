import React, { useState } from "react";
import kobelcoLogo from "../assets/Kobelco-Logo.png";
import loginImage from "../assets/login_image.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
          <form className="space-y-6 w-72 mx-auto">
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
                  className="w-full px-4 py-2 border border-gray-100 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
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
