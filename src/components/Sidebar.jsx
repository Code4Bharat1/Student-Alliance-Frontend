"use client";

import { 
  AiOutlineDashboard, 
  AiOutlineTool, 
  AiOutlineRobot, 
  AiOutlineMenuFold, 
  AiOutlineMenuUnfold 
} from "react-icons/ai";
import { MdTv } from "react-icons/md";
import { FiPackage, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const path = pathname.split("/")[2] || "dashboard";
    setActiveItem(path);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <AiOutlineDashboard />, path: "dashboard" },
    { name: "Products", icon: <FiPackage />, path: "products" },
    { name: "IFPD", icon: <MdTv />, path: "ifpd" },
    { name: "3D Printers", icon: <AiOutlineTool />, path: "3d-printers" },
    { name: "STEM & Robotics", icon: <AiOutlineRobot />, path: "stem-robotics" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.aside
      className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen shadow-2xl flex flex-col ${isCollapsed ? "w-20" : "w-64"}`}
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
            className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-4"} p-3 rounded-lg transition-all duration-200 ease-in-out ${
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
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-4"} p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer`}
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