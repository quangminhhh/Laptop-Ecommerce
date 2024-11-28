import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

// Import các biểu tượng từ react-icons
import { FaMicrochip, FaMemory, FaHdd, FaDesktop, FaExpand, FaBatteryFull, FaWeight, FaWindows } from "react-icons/fa";
import { PiGraphicsCardDuotone } from "react-icons/pi";

const ViewProductPage = () => {
    const { id } = useParams();
    const { getProductById, currentProduct, loading } = useProductStore();
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    
    useEffect(() => {
        getProductById(id);
    }, [id, getProductById]);

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart");
            return;
        }
        addToCart(currentProduct);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">Product not found</p>
            </div>
        );
    }

    const specificationsIcons = {
        processor: <FaMicrochip className="text-emerald-400 mr-2" />,
        ram: <FaMemory className="text-emerald-400 mr-2" />,
        storage: <FaHdd className="text-emerald-400 mr-2" />,
        graphicsCard: <PiGraphicsCardDuotone className="text-emerald-400 mr-2" />,
        screenSize: <FaExpand className="text-emerald-400 mr-2" />,
        resolution: <FaDesktop className="text-emerald-400 mr-2" />,
        battery: <FaBatteryFull className="text-emerald-400 mr-2" />,
        weight: <FaWeight className="text-emerald-400 mr-2" />,
        operatingSystem: <FaWindows className="text-emerald-400 mr-2" />
    };

    // Define animation variants for labels
    const labelVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-7xl mx-auto bg-transparentrounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12 ">
                    
                    <div className="relative">
                        <img 
                            src={currentProduct.image} 
                            alt={currentProduct.name}
                            className="w-full rounded-lg shadow-lg object-cover"
                        />
                    </div>

                    <div className="flex flex-col space-y-6">
                        <h1 className="text-4xl font-bold text-gray-100">{currentProduct.name}</h1>
                        <p className="text-2xl font-semibold text-emerald-400">${currentProduct.price}</p>
                        <p className="text-gray-300 leading-relaxed">{currentProduct.description}</p>

                        <button
                            onClick={handleAddToCart}
                            className="flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 transition duration-300 px-6 py-3 text-lg font-medium text-white shadow-md"
                        >
                            <ShoppingCart className="mr-2" size={22} />
                            Add to Cart
                        </button>

                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-4 text-gray-100">Specifications</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentProduct.specifications && Object.entries(currentProduct.specifications).map(([key, value]) => (
                                    <motion.div
                                        key={key}
                                        className="flex items-center bg-gray-800 p-5 rounded-lg shadow-md"
                                        initial="hidden"
                                        animate="visible"
                                        variants={labelVariants}
                                        transition={{ duration: 0.5, delay: 0.1 * Object.keys(currentProduct.specifications).indexOf(key) }}
                                    >
                                        {specificationsIcons[key] || <FaMicrochip className="text-emerald-100 mr-2" />}
                                        <div>
                                            <p className="text-lg font-medium text-gray-100 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                            <p className="text-xl font-semibold text-white">{value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProductPage;
