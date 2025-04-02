import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Product } from "../types";
import { Star, ShoppingCart, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Products() {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(2000);
  const dispatch = useDispatch();
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setCategoryFilter(category);
    }
  }, [location]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under-200" && product.price < 200) ||
      (priceFilter === "200-500" &&
        product.price >= 200 &&
        product.price <= 500) ||
      (priceFilter === "over-500" && product.price > 500);

    // const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      (categoryFilter === "Grocery" && product.category === "groceries") ||
      (categoryFilter === "Electronics" &&
        (product.category === "laptops" ||
          product.category === "mobile-accessories")) || // Filter laptops under Electronics
      (categoryFilter === "Fashion" &&
        (product.category === "beauty" ||
          product.category === "fragrances" ||
          product.category === "mens-shirts" ||
          product.category === "mens-shoes" ||
          product.category === "mens-watches")) ||
      (categoryFilter === "Home & Living" &&
        (product.category === "furniture" ||
          product.category === "home-decoration" ||
          product.category === "kitchen-accessories")) ||
      product.category === categoryFilter;

    return matchesPrice && matchesCategory;
  });

  // const filteredProducts1 = products.filter(product => {
  //   const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
  //   const matchesPrice = product.price <= priceRange;
  //   return matchesCategory && matchesPrice;
  // });

  // const categories = ['all', ...new Set(products.map(product => product.category))];
  // const maxPrice = Math.max(...products.map(product => product.price));

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  //     </div>
  //   );
  // }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      {/* <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Prices</option>
            <option value="under-200">Under $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="over-500">Over $500</option>
          </select>
        </div> */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          >
            <option value="all">All Prices</option>
            <option value="under-200">Under $200</option>
            <option value="200-500">$200 - $500</option>
            <option value="over-500">Over $500</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-200"
          >
            <option value="all">All Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Living">Home & Living</option>
          </select>
        </div>
      </div>

      {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home & Living">Home & Living</option>
          </select>
        </div> */}
      {/* </div> */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        {/* <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>$0</span>
              <span>${priceRange}</span>
            </div>
          </div>
        </div> */}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-48 object-cover"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    />
                  </Link>
                  <div className="p-4">
                    <Link
                      to={`/products/${product.id}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <h3 className="text-lg font-semibold mb-2 hover:text-indigo-600">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold">
                          ${product.price}
                        </span>
                        {product.discountPercentage > 0 && (
                          <span className="ml-2 text-sm text-green-600">
                            {Math.round(product.discountPercentage)}% off
                          </span>
                        )}
                      </div>
                      {/* <button
                        onClick={() => dispatch(addToCart(product))}
                        className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="h-6 w-6" />
                      </button> */}
                      <button
                        onClick={() => dispatch(addToCart(product))}
                        className={`p-2 ${
                          cartItems.some((item) => item.id === product.id)
                            ? "text-green-600 hover:text-green-800"
                            : "text-indigo-600 hover:text-indigo-800"
                        } transition-colors`}
                        aria-label="Add to cart"
                      >
                        {cartItems.some((item) => item.id === product.id) ? (
                          <CheckCircle className="h-6 w-6" /> // Icon for "added to cart"
                        ) : (
                          <ShoppingCart className="h-6 w-6" /> // Default cart icon
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            //   <div className="text-center text-gray-600 text-lg">
            //   No products match your filters. Please try adjusting the filters.
            // </div>
            <div className="flex flex-col items-center justify-center text-center text-gray-600 text-lg py-12">
              <p className="font-semibold text-gray-800">
                No products match your filters.
              </p>
              <p className="text-gray-500">
                Please try adjusting the filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  // setCategoryFilter("all");
                  setPriceFilter("all");
                }}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
