"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
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
          <Link
            href="/login"
            className="flex-1 flex items-center justify-center font-medium text-lg text-white text-opacity-70"
          >
            Login
          </Link>
          <div className="absolute top-0 h-full w-1/2 bg-opacity-20 rounded-t-lg left-1/2" />
          <button className="flex-1 flex items-center justify-center font-medium text-lg text-white">
            Sign Up
          </button>
        </div>

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Create Account
            </h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Full Name
                </label>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-black placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
              </div>

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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign Up
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white text-opacity-70">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-white font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
