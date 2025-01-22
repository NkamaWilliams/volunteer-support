export default function signUp() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-800 to-blue-400">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h2 className="mb-4 text-center text-xl font-semibold">Sign Up</h2>

        <div className="mb-4">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
          Sign up
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <a href="#" className="font-semibold text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
