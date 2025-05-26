"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // Animation library for smooth effects

export default function Modal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(
    product || { name: "", price: "", description: "", image: null }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert file to a URL
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 border-gray-700 text-black bg-gradient-to-r from-blue-500 to-pink-500 bg-opacity-80 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl w-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h3>
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 transition"
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Price
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 transition"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 transition resize-none"
            ></textarea>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Image
            </label>
            <input
              type="String"
              name="price"
              placeholder="Link of the Product Image"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 transition"
            />
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center relative hover:shadow-md transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Selected"
                  className="h-20 w-20 mx-auto rounded-lg object-cover"
                />
              ) : (
                <p className="text-blue-500">Click to choose an image</p>
              )}
            </div>
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
