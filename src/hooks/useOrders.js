import { useState, useEffect } from "react";
import axios from "axios";

const useOrders = (status) => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(null);
  const ordersPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://fake-store-api.mock.beeceptor.com/api/orders`
        );

        if (response.data && Array.isArray(response.data)) {
          const fetchedOrders = response.data;
          const filteredOrders = status
            ? fetchedOrders.filter(
                (order) => order.status.toLowerCase() === status.toLowerCase()
              )
            : fetchedOrders;

          const start = currentPage * ordersPerPage;
          const end = (currentPage + 1) * ordersPerPage;
          setOrders(filteredOrders.slice(start, end));
          setTotalPages(Math.ceil(filteredOrders.length / ordersPerPage));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Order Error:", error);
        setError(error.message);
      }
    };

    fetchOrders();
  }, [status, currentPage]);

  return { orders, totalPages, setCurrentPage, currentPage, error };
};

export default useOrders;
