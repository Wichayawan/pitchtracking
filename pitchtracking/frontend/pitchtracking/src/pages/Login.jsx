import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-white">
        {/* Left side */}
        <div className="w-1/2 bg-gradient-to-b from-cyan-500 to-blue-600 p-8 flex items-center justify-center">
          <img
            src="/login-illustration.png" // เตรียมไฟล์ไว้ที่ public/
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Right side - Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-[#0071bc] drop-shadow-md mb-8">
            KOBELCO
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  placeholder="Enter your password"
                />
                <span className="absolute right-3 top-2.5 cursor-pointer text-gray-500">
                  👁️
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#0071bc] text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
