"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import Image from "next/image";

async function getProduct(id) {
  try {
    if (!id) {
      throw new Error("Product ID is required");
    }

    console.log("🔍 Fetching product with ID:", id);

    const res = await axios.get(`http://localhost:5000/api/products/${id}`);

    if (res.status !== 200) {
      throw new Error(`Unexpected response status: ${res.status}`);
    }

    if (!res.data) {
      throw new Error("No product data received from server");
    }

    console.log("✅ Product found:", !!res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage =
        error.response.data?.message || error.response.statusText;

      switch (statusCode) {
        case 400:
          throw new Error(`Invalid request: ${errorMessage}`);
        case 404:
          throw new Error(`Product not found with ID: ${id}`);
        case 500:
          throw new Error(`Server error: ${errorMessage}`);
        default:
          throw new Error(`Request failed (${statusCode}): ${errorMessage}`);
      }
    } else if (error.request) {
      throw new Error(
        "No response from server. Please check if the backend is running"
      );
    } else {
      throw error;
    }
  }
}

export default function ProductDetail({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unwrappeParams = use(params);
  const productId = unwrappeParams?.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Unable to Load Product
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Product Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            The requested product could not be found in our catalog.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2 p-6">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name || "Product image"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {product.additionalImages &&
                product.additionalImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      More Images
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {product.additionalImages.map(
                        (img, idx) =>
                          img ? ( // Only render if img is truthy (not empty string)
                            <div
                              key={idx}
                              className="relative h-24 rounded-md overflow-hidden"
                            >
                              <Image
                                src={img}
                                alt={`Additional image ${idx + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : null // Skip rendering if img is empty
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div className="p-8 md:w-1/2">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {product.category || "Uncategorized"}
                </span>
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-5 w-5 ${
                        star <= (product.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating ? `${product.rating}/5` : "No ratings"}
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.discount && product.discount > 0 && (
                    <span className="ml-2 text-sm text-red-500 line-through">
                      ₹
                      {(product.price / (1 - product.discount / 100)).toFixed(
                        2
                      )}
                    </span>
                  )}
                  {product.discount && product.discount > 0 && (
                    <span className="ml-2 text-sm font-medium text-white bg-red-500 px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <span
                    className={`text-sm font-medium ${
                      product.stocks > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stocks > 0
                      ? `In Stock (${product.stocks} available)`
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">
                  Description
                </h3>
                <p className="mt-2 text-gray-600">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    Features
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {product.features.map((f, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex space-x-4">
                <button
                  type="button"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
