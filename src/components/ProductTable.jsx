"use client";

import {
  TrashIcon,
  PencilIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductTable({ onEdit }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        if (!res.data || res.data.length === 0) {
          console.warn("No products found in the database.");
        }

        if (FormData.length === 0) {
          console.warn("No products found in the database.");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    const handleProductAdded = () => fetchProducts();
    window.addEventListener("productAdded", handleProductAdded);

    return () => {
      window.removeEventListener("productAdded", handleProductAdded);
    };

  }, []);

      const handleDelete = async (id) => {
        const productToDelete = products.find((p) => p._id === id);
        try {
          await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
          setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (error) {
          console.error("Delete failed:", error);
        } finally {
          setConfirmDeleteId(null);
        }
      };

  const handleDeleteClick = (id) => setConfirmDeleteId(id);
  const handleConfirmDelete = () =>
    confirmDeleteId && handleDelete(confirmDeleteId);
  const handleCancelDelete = () => setConfirmDeleteId(null);

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <div className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="text-red-600">
                <TrashIcon className="h-12 w-12 mx-auto" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Delete Product?
              </h2>
              <p className="text-gray-500 text-sm">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelDelete}
                  className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-blue-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center">
                  <div className="flex justify-center items-center space-x-2 text-blue-600">
                    <ArrowPathIcon className="h-6 w-6 animate-spin" />
                    <span>Loading products...</span>
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No products found. Add your first product!
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={rowVariants}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-blue-50/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <img
                      className="h-12 w-12 rounded-lg object-cover shadow-sm border border-gray-200"
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.name}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    {product.category && (
                      <div className="text-xs text-gray-500 mt-1">
                        {product.category}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 inline-flex text-sm font-semibold rounded-full bg-green-100 text-green-800">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(product)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100"
                        title="Edit product"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteClick(product._id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                        title="Delete product"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {products.length > 0 && !isLoading && (
        <div className="mt-4 text-sm text-gray-500">
          Showing {products.length}{" "}
          {products.length === 1 ? "product" : "products"}
        </div>
      )}
    </div>
  );
}
