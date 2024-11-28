import { useEffect } from 'react';
import { useOrderStore } from '../stores/useOrderStore';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from "framer-motion";


const OrdersList = () => {
  const { orders, fetchAllOrders, updateOrderStatus} = useOrderStore();

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const handleStatusChange = (orderId, event) => {
    const newStatus = event.target.value;
    updateOrderStatus(orderId, newStatus);
  };

  if (!orders) {
    return <LoadingSpinner />;
  }

  return (
    <motion.div 
      className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-2xl font-semibold text-emerald-300 mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-lg text-gray-400">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-700 p-6 rounded-lg shadow-md border-l-4 border-emerald-500">
              <h2 className="text-lg font-semibold text-emerald-300 mb-2">Order #{order._id}</h2>
              
              <div className="text-gray-300 mb-4">
                <p><span className="font-medium">Status:</span> {order.status}</p>
                <p><span className="font-medium">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-400 font-semibold mb-2">Products:</h3>
                <ul className="space-y-2">
                  {order.products.map((item) => (
                    <li key={item.product._id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-500"
                      />
                      <div>
                        <p className="text-gray-300 font-medium">{item.product.name}</p>
                        <p className="text-gray-400 text-sm">{item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <label htmlFor={`status-${order._id}`} className="block text-sm font-semibold text-gray-400 mb-2">
                  Update Status:
                </label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e)}
                  className="block w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-300 focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrdersList;
