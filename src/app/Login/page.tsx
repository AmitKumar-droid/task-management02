"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig/firebase"; // Import Firebase Auth functions

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying login errors
  const [loading, setLoading] = useState(false); // To show loading indicator during login
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while processing login

    try {
      // Attempt Firebase login
      await signInWithEmailAndPassword(auth, email, password);
      
      // If login is successful, show success message and navigate to Task Management page
      setSuccessMessage(true);

      // Hide success message after 1 second and redirect to Task Management page
      setTimeout(() => {
        setSuccessMessage(false);
        router.push("/Taskmanagement");
      }, 1000);
    } catch (error: any) {
      // If an error occurs, display an error message (e.g., wrong credentials)
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-black font-semibold text-center mb-6">Login</h2>

      {successMessage && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-green-500 text-white text-center py-2 rounded-t-lg">
          Successfully logged in! Redirecting to task management...
        </div>
      )}

      {errorMessage && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-red-500 text-white text-center py-2 rounded-t-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 text-black block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-black text-sm">
        Don't have an account?{" "}
        <Link href="/Signup" className="text-blue-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
