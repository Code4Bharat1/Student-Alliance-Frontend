"use client";

import Modal from "@/components/Modal";
import ProductTable from "@/components/ProductTable";

export default function AdminDashboard(props) {
  // Receive products, onEditProduct, onDeleteProduct from layout via props
  const { products, onEditProduct, onDeleteProduct, isLoading } = props;

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
