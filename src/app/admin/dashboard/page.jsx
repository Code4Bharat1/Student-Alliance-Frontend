"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import ProductTable from "@/components/ProductTable";

export default function AdminDashboard(props) {
  // Receive products, onEditProduct, onDeleteProduct from layout via props
  const { products, onEditProduct, onDeleteProduct, isLoading } = props;
  const router = useRouter();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check Redux first, fallback to localStorage for hard reloads
    const localToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!isAuthenticated && !token && !localToken) {
      router.replace("/form"); // Redirect to login
    }
  }, [isAuthenticated, token, router]);

  return (
    <div>
      <ProductTable
        products={products}
        onEdit={onEditProduct}
        onDelete={onDeleteProduct}
        isLoading={isLoading}
      />
    </div>
  );
}
