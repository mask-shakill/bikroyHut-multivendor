"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";

const SignupForm = () => {
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-400 to-teal-500 flex-col items-center justify-center p-12 text-white">
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 9h6" />
            <path d="M9 15h6" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-center mb-8">
          To keep connected with us please login with your personal info
        </p>
        <button className="border-2 border-white text-white hover:bg-white hover:bg-opacity-10 rounded-full py-2 px-12 font-medium transition-colors">
          SIGN IN
        </button>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-teal-500">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-600">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-600">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 border-gray-200 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="mobileNumber" className="text-gray-600">
                Mobile Number *
              </Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                className="mt-1 border-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-600">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 border-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-600">
                Password (min 6 characters) *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 border-gray-200 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-full py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "SIGN UP"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
