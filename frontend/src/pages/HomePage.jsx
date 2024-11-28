import { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import CategoryItem from "../components/CategoryItem";
import BotpressChat from "../components/BotPress.jsx";

const HomePage = () => {
  const {
    categories,
    fetchCategories,
    searchCategories,
    loading,
  } = useProductStore();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchCategories(searchQuery);
    } else {
      await fetchCategories();
    }
  };

  return (

      <div className="relative min-h-screen text-white overflow-hidden">

        {/*Test chatbot*/}
        <BotpressChat></BotpressChat>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
            Explore Our Categories
          </h1>
          <form className="mb-6 flex justify-center" onSubmit={handleSearch}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-1/2 px-4 py-2 text-gray-900 rounded-md"
            />
            <button
                type="submit"
                className="ml-4 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md"
            >
              Search
            </button>
          </form>
          <p className="text-center text-lg sm:text-xl text-gray-400 mb-12">
            Discover high-quality components and devices to upgrade your setup.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
                <p className="col-span-full text-center text-gray-300">Loading...</p>
            ) : categories.length > 0 ? (
                categories.map((category) => (
                    <CategoryItem category={category} key={category.name}/>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-300">
                  No categories found.
                </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default HomePage;
