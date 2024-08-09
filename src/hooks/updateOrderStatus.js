import axios from "axios";

export const updateOrderStatus = async (orderId) => {
  try {
    const response = await axios.get(
      `https://fake-store-api.mock.beeceptor.com/api/orders/status`,
      {
        params: {
          order_id: orderId,
          status: "picked",
        },
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
};
