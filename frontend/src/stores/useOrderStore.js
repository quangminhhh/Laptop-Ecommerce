import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useOrderStore = create((set) => ({
  orders: [],
  orderDetails: null,

  fetchOrders: async () => {
    try {
      const response = await axios.get('/api/orders');
      set({ orders: response.data });
    } catch (error) {
      toast.error(`Error fetching orders: ${error.response?.data?.message || error.message}`);
    }
  },
  fetchAllOrders: async () => {
    try {
      const response = await axios.get('/api/orders/all');
      set({ orders: response.data });
    } catch (error) {
      toast.error(`Error fetching all orders: ${error.response?.data?.message || error.message}`);
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, { status });
      set((state) => ({
        orders: state.orders.map((order) => (order._id === orderId ? { ...order, status } : order)),
      }));
      toast.success(`Order status updated to ${response.data.status}`);
    } catch (error) {
      toast.error(`Error updating order status: ${error.response?.data?.message || error.message}`);
    }
  },
  
  removeOrder: async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      set((state) => ({
        orders: state.orders.filter((order) => order._id !== orderId),
      }));
      toast.success('Delivered order successfully');
    } catch (error) {
      toast.error(`Error removing order: ${error.response?.data?.message || error.message}`);
    }
  },
}));