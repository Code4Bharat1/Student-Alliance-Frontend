"use client";

import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const defaultProducts = [
    {
      title: 'IFPD',
      image: '/images/65_inch.png',
      // link: '/product1',
    },
    {
      title: '3D PRINTERS',
      image: '/images/printer2.png',
      // link: '/product2',
    },
    {
      title: 'STEM & ROBOTICS',
      image: '/images/k2.jpg',
      // link: '/product3',
    },
    {
      title: 'CAMERA',
      image: '/shop/cam3.jpg',
      // link: '/product3',
    },
    {
      title: 'DIGITAL BOARDS',
      image: '/shop/digital-d2.png',
      // link: '/product3',
    },
    {
      title: 'LIGHT',
      image: '/shop/light1.png',
      // link: '/product3',
    },
    {
      title: 'MIC',
      image: '/shop/mic1.png',
      // link: '/product3',
    },
    {
      title: 'OPS',
      image: '/shop/opsx.png',
      // link: '/product3',
    },
    {
      title: 'SPEAKER',
      image: '/shop/speaker1.png',
      // link: '/product3',
    },
    {
      title: 'STAND',
      image: '/shop/stand.png',
      // link: '/product3',
    },
   
  ];

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    setIsModalOpen(true);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const saveProduct = (product) => {
    if (selectedProduct) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p.id === product.id ? product : p
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Header onAddProduct={handleAddProduct} />

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
            <h1 className="text-4xl font-bold">Products</h1>
           
          </motion.div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16">
            {defaultProducts.map((product, index) => (
              <motion.div
                key={index}
                className="rounded-md overflow-hidden border border-gray-300 shadow hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full aspect-[4/3] bg-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-4 text-center font-semibold text-sm flex-grow">
                  {product.title}
                </div>
                <div className="bg-white p-4 text-center">
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-5 rounded">
                    Add Product
                    </button> */}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </main>

      {isModalOpen && (
        <Modal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={saveProduct}
        />
      )}
    </div>
  );
}
