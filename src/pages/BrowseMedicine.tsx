import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowLeft, ShoppingCart, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Medicine {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  prescription: boolean;
  inStock: boolean;
  category: string;
  discount?: number;
}

const BrowseMedicine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);

  const medicines: Medicine[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      brand: "Generic",
      price: 12.99,
      originalPrice: 15.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      category: "Pain Relief",
      discount: 20
    },
    {
      id: 2,
      name: "Vitamin D3 1000IU",
      brand: "HealthPlus",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      category: "Vitamins"
    },
    {
      id: 3,
      name: "Omega-3 Fish Oil",
      brand: "NatureCare",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8ca6?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      category: "Supplements"
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      brand: "MediTech",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop",
      prescription: false,
      inStock: false,
      category: "Medical Devices"
    },
    {
      id: 5,
      name: "Ibuprofen 400mg",
      brand: "Pharma",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      category: "Pain Relief"
    },
    {
      id: 6,
      name: "Multivitamin Complex",
      brand: "HealthPlus",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop",
      prescription: false,
      inStock: true,
      category: "Vitamins"
    }
  ];

  const categories = ['Pain Relief', 'Vitamins', 'Supplements', 'Medical Devices', 'Prescription'];
  const brands = ['Generic', 'HealthPlus', 'NatureCare', 'MediTech', 'Pharma'];

  useEffect(() => {
    let filtered = medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(medicine.category);
      const matchesBrand = selectedBrand === 'all' || medicine.brand === selectedBrand;
      const matchesPrice = medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
      const matchesAvailability = availability === 'all' || 
                                 (availability === 'in-stock' && medicine.inStock) ||
                                 (availability === 'prescription' && medicine.prescription);

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesAvailability;
    });

    setFilteredMedicines(filtered);
  }, [searchTerm, selectedCategories, selectedBrand, priceRange, availability]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const FilterComponent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <label htmlFor={category} className="text-sm">{category}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={1}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Brand</h3>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger>
            <SelectValue placeholder="All brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All brands</SelectItem>
            {brands.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All items</SelectItem>
            <SelectItem value="in-stock">In stock</SelectItem>
            <SelectItem value="prescription">Prescription required</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBrand('all');
          setPriceRange([0, 100]);
          setAvailability('all');
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Browse Medicines</h1>
            <Link to="/cart">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search medicines, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterComponent />
                </div>
              </SheetContent>
            </Sheet>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="p-6 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterComponent />
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredMedicines.length} products found</p>
            </div>

            {filteredMedicines.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-4">No medicines found matching your criteria</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategories([]);
                  setSelectedBrand('all');
                  setPriceRange([0, 100]);
                  setAvailability('all');
                }}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredMedicines.map((medicine) => (
                  <Card key={medicine.id} className={`group hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-row' : 'transform hover:-translate-y-1'
                  }`}>
                    <div className={viewMode === 'list' ? 'w-32 h-32 shrink-0' : ''}>
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className={`object-cover ${
                          viewMode === 'list' 
                            ? 'w-full h-full rounded-l-lg' 
                            : 'w-full h-48 rounded-t-lg'
                        }`}
                      />
                      {medicine.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          {medicine.discount}% OFF
                        </Badge>
                      )}
                      {!medicine.inStock && (
                        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                          viewMode === 'list' ? 'rounded-l-lg' : 'rounded-t-lg'
                        }`}>
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'flex-1 p-4' : ''}`}>
                      <CardContent className={viewMode === 'list' ? 'p-0' : 'p-4'}>
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
                      
                      <CardFooter className={viewMode === 'list' ? 'p-0 pt-4' : 'p-4 pt-0'}>
                        <Button 
                          className="w-full" 
                          disabled={!medicine.inStock}
                        >
                          {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseMedicine;
