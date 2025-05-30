"use client";

import Modal from "@/components/Modal";
import ProductTable from "@/components/ProductTable";
import { useState, useEffect } from "react";

// Create a custom hook for product persistence
function useProductStore() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products on initial render  
  useEffect(() => {
    const loadProducts = () => {
      try {
        const storedProducts = localStorage.getItem("dashboard_products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Save products whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("dashboard_products", JSON.stringify(products));
    }
  }, [products, isLoading]);

  // Sync across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "dashboard_products") {
        try {
          const newProducts = JSON.parse(e.newValue || "[]");
          if (JSON.stringify(newProducts) !== JSON.stringify(products)) {
            setProducts(newProducts);
          }
        } catch (error) {
          console.error("Failed to sync products:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [products]);

  return { products, setProducts, isLoading };
}

export default function AdminDashboard() {
  const { products, setProducts, isLoading } = useProductStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div>
      <main className="flex-1 p-0">
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