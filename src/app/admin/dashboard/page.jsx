"use client";

import Header from "@/components/Header";
import Modal from "@/components/Modal";
import ProductTable from "@/components/ProductTable";
import Sidebar from "@/components/Sidebar";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

// Custom hook for product persistence
function useProductStore() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
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

  // Save to localStorage when changed
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

export default function Admin() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Token check on mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/admin/form");
    } else {
      try {
        const decoded = jwtDecode(token);
        // Optional: validate expiration
        if (decoded.exp * 1000 < Date.now()) {
          Cookies.remove("token");
          router.push("/admin/form");
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        Cookies.remove("token");
        router.push("/login");
      }
    }
  }, [router]);

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
      const updatedProducts = products.map((p) =>
        p.id === product.id ? product : p
      );
      setProducts(updatedProducts);
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Header onAddProduct={handleAddProduct} />
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
