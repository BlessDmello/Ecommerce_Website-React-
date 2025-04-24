import { ArrowRight, Truck, ShieldCheck, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50",
    icon: Truck,
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence using our secure payment system",
    icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Get help anytime with our round-the-clock customer service",
    icon: HeadphonesIcon,
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1674027392887-751d6396b710?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          backgroundPosition: "center top",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to MelloMart
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover amazing products at unbeatable prices
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              title: "Grocery",
              image:
                "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Electronics",
              image:
                "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            },
            {
              title: "Fashion",
              image:
                "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            },
            {
              title: "Home & Living",
              image:
                "https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            },
          ].map((category, index) => (
            <div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden group"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  to={`/products?category=${encodeURIComponent(category.title)}`}
                  className="text-white text-2xl font-bold"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {category.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
