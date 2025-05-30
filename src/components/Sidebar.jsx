"use client";

import {
  AiOutlineDashboard,
  AiOutlineTool,
  AiOutlineRobot,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { MdTv } from "react-icons/md";
import { FiPackage, FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const path = pathname.split("/")[2] || "dashboard";
    setActiveItem(path);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, path: "dashboard" },
    { name: "IFPD", icon: <MdTv />, path: "ifpd" },
    { name: "3D Printers", icon: <AiOutlineTool />, path: "3d-printers" },
    { name: "STEM & Robotics", icon: <AiOutlineRobot />, path: "stem-robotics" },
  ];

  const productSubItems = [
    { name: "Camera", icon: <AiOutlineDashboard />, path: "camera" },
    { name: "Digital Board", icon: <AiOutlineDashboard />, path: "digital_board" },
    { name: "Mic", icon: <AiOutlineDashboard />, path: "mic" },
    { name: "Cable", icon: <AiOutlineDashboard />, path: "cable" },
    { name: "Speaker", icon: <AiOutlineDashboard />, path: "speaker" },
    { name: "Light", icon: <AiOutlineDashboard />, path: "light" },
    { name: "Stands", icon: <AiOutlineDashboard />, path: "stand" },
    { name: "OPS", icon: <AiOutlineDashboard />, path: "ops" },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <motion.aside
      className={`fixed top-0 left-0 h-full z-50 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent"
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Admin Panel
          </motion.h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 text-amber-400 transition-colors"
        >
          {isCollapsed ? <AiOutlineMenuUnfold size={20} /> : <AiOutlineMenuFold size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={`/admin/${item.path}`}
            onClick={() => setActiveItem(item.path)}
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "space-x-4"
            } p-3 rounded-lg transition-all duration-200 ease-in-out ${
              activeItem === item.path
                ? "bg-amber-500/20 text-amber-400 border-l-4 border-amber-400"
                : "hover:bg-gray-700/50"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            {!isCollapsed && (
              <motion.span
                className="text-lg font-medium"
                initial={{ opacity: 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.1 }}
              >
                {item.name}
              </motion.span>
            )}
          </Link>
        ))}

        {/* Products Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProductsOpen(!productsOpen)}
            className={`w-full flex items-center ${
              isCollapsed ? "justify-center" : "space-x-4"
            } p-3 rounded-lg transition-all duration-200 ease-in-out ${
              pathname.includes("products")
                ? "bg-amber-500/20 text-amber-400 border-l-4 border-amber-400"
                : "hover:bg-gray-700/50"
            }`}
          >
            <span className="text-2xl">
              <FiPackage />
            </span>
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-medium">Products</span>
                <motion.span
                  className="ml-2"
                  animate={{ rotate: productsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoIosArrowDown size={16} />
                </motion.span>
              </div>
            )}
          </button>

          <AnimatePresence initial={false}>
            {!isCollapsed && productsOpen && (
              <motion.div
                className="pl-10 mt-1 space-y-1 overflow-auto"
                style={{
                  maxHeight: 200,
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {productSubItems.map((subItem, idx) => (
                  <Link
                    key={idx}
                    href={`/admin/${subItem.path}`}
                    onClick={() => setActiveItem(subItem.path)}
                    className={`block text-sm px-2 py-1 rounded hover:bg-gray-700 transition-colors ${
                      pathname.includes(subItem.path)
                        ? "text-amber-400"
                        : "text-white/80"
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-4"
          } p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer`}
        >
          <span className="text-2xl text-red-400">
            <FiLogOut />
          </span>
          {!isCollapsed && (
            <motion.span
              className="text-lg font-medium text-red-400"
              initial={{ opacity: 1 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              Logout
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
}