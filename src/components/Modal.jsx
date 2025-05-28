"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Modal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState(
    product || { name: "", price: "", description: "", image: "" }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("upload_preset", "Student-Alliance");

    setUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dlgksnq6u/image/upload",
        {
          method: "POST",
          body: formDataUpload,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          image: data.secure_url,
          imagePublicId: data.public_id,
        }));
      }
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (uploading) {
      alert("Please wait until image upload is complete.");
      return;
    }

    if (!formData.name || !formData.price || !formData.image) {
      alert("Please fill in all required fields: name, price, and image.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    console.log("Submitting payload:", payload);

    setSaving(true);
    try {
      const url = product
        ? `http://localhost:5000/api/products/${product._id}`
        : "http://localhost:5000/api/products";

      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        onSave(result);
        onClose();
      } else {
        console.error("Failed:", result.message);
        alert("Failed: " + result.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An error occurred.");
    } finally {
      setSaving(false);
    }
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
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center relative hover:shadow-md transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {uploading ? (
                <p className="text-blue-500">Uploading...</p>
              ) : formData.image ? (
                <img
                  src={formData.image}
                  alt="Selected"
                  className="h-20 w-20 mx-auto rounded-lg object-cover"
                />
              ) : (
                <p className="text-blue-500">Click to choose an image</p>
              )}
            </div>
          </div>
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
            disabled={uploading || saving}
          >
            {uploading || saving ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
