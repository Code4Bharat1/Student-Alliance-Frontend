"use client";

import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Image from "next/image";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/category/STEM%20%26%20Robotics"
        );
        setProducts(res.data);
        if (!res.data || res.data.length === 0) {
          console.warn("No products found in the database.");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    setIsModalOpen(true);
    setSelectedProduct(null);
  };

  const saveProduct = (product) => {
    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p._id === product._id ? product : p
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts([...products, product]);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 p-6 overflow-y-auto ml-64"> 

          {/* Products Section */}
          <div className="bg-white text-black mt-10">
            {/* Header */}
            <motion.div
              className="text-center py-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl font-bold">STEM & Robotics</h1>
            </motion.div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-16">
              {products.map((product, index) => (
                <motion.div
                  key={product._id || index}
                  className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 bg-white flex flex-col"
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full aspect-[4/3] bg-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-4 text-center font-semibold text-sm flex-grow">
                    {product.name}
                  </div>
                  {/* Add more product details/buttons as needed */}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <Modal
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
            onSave={saveProduct}
          />
        )}
      </div>
    </>
  );
}
