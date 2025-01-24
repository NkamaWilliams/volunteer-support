"use client";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-xl font-semibold text-center mb-4">Sign In Here</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="janedoe@gmail.com"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Sign In
        </button>

        <p className="text-center text-gray-700 text-sm mt-4">
          New to this platform? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
