import React, { useState } from "react";
import { updateOrderStatus } from "../hooks/updateOrderStatus";
import useOrders from "../hooks/useOrders";

const OrderTable = () => {
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

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Filter by Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">All</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="processing">Processing</option>
          <option value="pending">Pending</option>
        </select>
      </div>

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
                  <button
                    onClick={() => handleUpdateStatus(order.order_id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Mark as Picked
                  </button>
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
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage >= totalPages - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
