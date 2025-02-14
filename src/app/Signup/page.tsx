"use client";

import { useState } from "react";
import Link from "next/link";
import { auth, createUserWithEmailAndPassword } from "../firebaseConfig/firebase"; // import Firebase Auth methods

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState(false); // Track success message visibility
  const [loading, setLoading] = useState(false); // Loading state to disable the button during signup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        // Firebase user registration
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Show success message after successful registration
        setSuccessMessage(true);

        // Reset the form fields
        setFormData({ name: "", email: "", password: "" });

        // Hide the success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      } catch (error) {
        // Handle any errors (e.g. email already in use, weak password, etc.)
        setErrors({ email: "This email is already in use." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-black font-semibold text-center mb-6">Signup</h2>
      {successMessage && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-green-500 text-white text-center py-2 rounded-t-lg">
          Successfully signed up! You can now log in.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-black text-center text-sm">
        Already have an account?{" "}
        <Link href="/Login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
