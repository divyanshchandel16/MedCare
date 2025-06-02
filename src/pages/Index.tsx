import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Shield, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState(0);

  const featuredMedicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Generic",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      discount: 20
    },
    {
      id: 2,
      name: "Vitamin D3 1000IU",
      brand: "HealthPlus",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      brand: "NatureCare",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      brand: "MediTech",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
      prescription: false,
      inStock: false
    }
  ];

  const addToCart = (productId: number) => {
    setCartItems(prev => prev + 1);
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">MediCare+</span>
              </Link>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search medicines, vitamins, health products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="w-5 h-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                      {cartItems}
                    </Badge>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
                <span className="sr-only">Account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Get your medicines delivered safely to your doorstep. Licensed pharmacy with over 10,000 products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/browse">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Browse Medicines
                  </Button>
                </Link>
                <Link to="/upload-prescription">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Upload Prescription
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop"
                alt="Healthcare professional"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Licensed & Verified</h3>
              <p className="text-gray-600">All medicines are sourced from licensed manufacturers and verified for authenticity.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">Same-day delivery available in metro cities. Express delivery nationwide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Packaging</h3>
              <p className="text-gray-600">Temperature-controlled packaging ensures medicine quality during transit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Popular medicines and health products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMedicines.map((medicine) => (
              <Card key={medicine.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative">
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {medicine.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {medicine.discount}% OFF
                      </Badge>
                    )}
                    {!medicine.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">
                      {medicine.prescription ? 'Prescription Required' : 'Over the Counter'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mb-1 line-clamp-2">{medicine.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-3">{medicine.brand}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${medicine.price}</span>
                    {medicine.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${medicine.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(medicine.id)}
                    disabled={!medicine.inStock}
                  >
                    {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated on Health & Wellness</h2>
          <p className="text-xl text-blue-100 mb-8">Get health tips, medicine alerts, and exclusive offers delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 bg-white"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MediCare+</span>
              </div>
              <p className="text-gray-400">Your trusted online pharmacy for quality medicines and healthcare products.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/browse" className="hover:text-white transition-colors">Browse Medicines</Link></li>
                <li><Link to="/upload-prescription" className="hover:text-white transition-colors">Upload Prescription</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Health Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 1-800-MEDICARE</p>
                <p>📧 support@medicareplus.com</p>
                <p>⏰ 24/7 Customer Support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediCare+. All rights reserved. Licensed Online Pharmacy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
