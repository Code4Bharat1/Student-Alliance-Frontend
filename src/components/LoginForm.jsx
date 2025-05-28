"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-4"
    >
      <div className="bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white border-opacity-20">
        <div className="flex relative h-16">
          <div className="absolute top-0 h-full w-1/2 bg-opacity-20 rounded-t-lg left-0" />
          <button className="flex-1 flex items-center justify-center font-medium text-lg text-white">
            Login
          </button>
          <Link
            href="/signup"
            className="flex-1 flex items-center justify-center font-medium text-lg text-white text-opacity-70"
          >
            Sign Up
          </Link>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Email
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-black placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Password
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-black placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                    placeholder="••••••••"
                    required
                    minLength="6"
                  />
                </motion.div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded bg-white bg-opacity-10 border-white border-opacity-20 text-white focus:ring-white focus:ring-opacity-50"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white text-opacity-80"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-white font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Login
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white text-opacity-70">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-white font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
