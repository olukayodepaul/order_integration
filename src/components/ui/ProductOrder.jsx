import React, { useState } from "react";
import { updateOrderStatus } from "../../hooks/updateOrderStatus";
import useOrders from "../../hooks/useOrders";
import { Button, SelectBtn } from "../index";

const ProductOrder = () => {
  const [status, setStatus] = useState("");
  const {
    orders,
    totalPages,
    setCurrentPage,
    currentPage,
    error,
    refetchOrders,
  } = useOrders(status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(0);
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      await updateOrderStatus(orderId);
      if (refetchOrders) {
        refetchOrders();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  const options = [
    { value: "", label: "All" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "processing", label: "Processing" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <div className="p-4">
      <SelectBtn
        id="status"
        value={status}
        onChange={handleStatusChange}
        options={options}
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left font-semibold">Order ID</th>
            <th className="py-2 px-4 text-left font-semibold">User ID</th>
            <th className="py-2 px-4 text-left font-semibold">Total Price</th>
            <th className="py-2 px-4 text-left font-semibold">Status</th>
            <th className="py-2 px-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.order_id} className="border-b">
                <td className="py-2 px-4">{order.order_id}</td>
                <td className="py-2 px-4">{order.user_id}</td>
                <td className="py-2 px-4">${order.total_price.toFixed(2)}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4">
                  <Button
                    onClick={() => handleUpdateStatus(order.order_id)}
                    className="mr-2"
                  >
                    Mark as Picked
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="mr-2"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductOrder;
