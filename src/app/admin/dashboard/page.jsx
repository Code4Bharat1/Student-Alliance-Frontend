"use client";

import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal"; // Assuming this exists
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Custom hook for authenticated product persistence
function useProductStore(token) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from backend on mount
  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  return { products, setProducts, isLoading };
}

export default function Admin() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Read token from localStorage
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const { products, setProducts, isLoading } = useProductStore(token);

  const handleAddProduct = () => {
    setIsModalOpen(true);
    setSelectedProduct(null);
  };

  const handleEditProduct = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const saveProduct = async (product) => {
    try {
      if (selectedProduct) {
        // Update product
        const res = await axios.put(
          `http://localhost:5000/api/products/${product.id}`,
          product,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(
          products.map((p) => (p.id === product.id ? res.data.product : p))
        );
      } else {
        // Create product
        const res = await axios.post(
          "http://localhost:5000/api/products",
          product,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts([...products, res.data.product]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <ProductTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          isLoading={isLoading}
        />
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
