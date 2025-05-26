"use client";

import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const printerData = [
    {
      title: '3D Printer (CR-5 Pro H)',
      image: '/images/printer1.png',
      link: '/pri1',
    },
    {
      title: '3D Printer (Creator 3)',
      image: '/images/printer2.png',
      link: '/pri2',
    },
    {
      title: '3D Printer (Ender 5 Plus)',
      image: '/images/printer3.png',
      link: '/pri3',
    },
    {
      title: '3D printer (Ender 5 S 1)',
      image: '/images/printer4.png',
      link: '/pri4',
    },
    {
      title: '3D Printer (LD-002H)',
      image: '/images/printer5.png',
      link: '/pri5',
    },
    {
      title: '3D Printer (Sermoon VI)',
      image: '/images/printer6.png',
      link: '/pri6',
    },
    {
      title: '3D printer (Ender 5 S 1)',
      image: '/images/printer7.png',
      link: '/pri7',
    },
    {
      title: '3D Printer (Sermoon VI)',
      image: '/images/printer8.png',
      link: '/pri8',
    },
  ];

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

        {/* 3D Printers Section */}
        <div className="bg-white text-black mt-10">
          {/* Header Section */}
          <motion.div
            className="text-center py-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl font-bold">3D Printers</h1>
          </motion.div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-16">
            {printerData.map((printer, index) => (
              <motion.div
                key={index}
                className="rounded-md overflow-hidden  border-gray-500 shadow hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="p-4 bg-white">
                  <Image
                    src={printer.image}
                    alt={printer.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
                <div className="p-4 text-center font-semibold text-sm flex-grow">
                  {printer.title}
                </div>
                <div className="bg-white p-4 text-center">
                  {/* <a
                    href={printer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Product
                    </button>
                  </a> */}
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
