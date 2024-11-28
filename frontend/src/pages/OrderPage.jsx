import { useEffect, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import LoadingSpinner from "../components/LoadingSpinner";
import { FaCheckCircle } from "react-icons/fa";

const OrderPage = () => {
  const { orders, fetchOrders, removeOrder } = useOrderStore();
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders().catch((error) => {
      console.error("Failed to load orders:", error);
    });
  }, [fetchOrders]);

  const getProgress = (status) => {
    switch (status) {
      case "Processing":
        return 33;
      case "Delivering":
        return 50;
      case "Shipped":
        return 75;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  const handleMarkAsReceived = async (orderId) => {
    setLoadingOrderId(orderId);
    try {
      await removeOrder(orderId);
      console.log("Order marked as received!");
    } catch (error) {
      console.error("Failed to mark as received:", error);
    } finally {
      setLoadingOrderId(null);
    }
  };

  if (!orders) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-extrabold text-emerald-500 mb-8">
        Your Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-xl text-gray-00">No orders available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transform hover:scale-105 transition duration-200"
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                Order ID: {order._id}
              </h2>
              <p className="text-gray-500 mb-4">
                <span className="font-semibold">Status:</span> {order.status}
              </p>

              <div className="relative bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-600"
                      : "bg-emerald-500"
                  } transition-all duration-500 ease-in-out`}
                  style={{ width: `${getProgress(order.status)}%` }}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-700">
                  {getProgress(order.status)}%
                </span>
              </div>

              <p className="text-gray-800 mb-3">
                <span className="font-semibold">Total Amount:</span> $
                {order.totalAmount.toFixed(2)}
              </p>
              <div>
                <ul className="space-y-2">
                  {order.products.map((item) => (
                    <li
                      key={item.product?._id || item.id}
                      className="flex items-center space-x-4"
                    >
                      {item.product ? (
                        <>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          />
                          <div>
                            <p className="text-gray-800 font-medium">
                              {item.product.name}
                            </p>
                            <p className="text-gray-500 text-sm">
                              {item.quantity} x ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Product details unavailable
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleMarkAsReceived(order._id)}
                className={`mt-5 px-4 py-2 w-full flex items-center justify-center font-semibold rounded-lg shadow 
                  ${
                    order.status === "Delivered"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                disabled={
                  order.status !== "Delivered" || loadingOrderId === order._id
                }
              >
                {loadingOrderId === order._id ? (
                  "Processing..."
                ) : (
                  <>
                    <FaCheckCircle className="mr-2" /> Mark as Received
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
