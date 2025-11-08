"use client";

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { productApi } from "@/services/api";
import { Product } from "@/types/product";
import axios from "axios";

const heroSlides = [
  {
    badge: "Beauty Collection",
    title: "Discover Your Perfect Glow",
    description: "Premium skincare, makeup, and beauty essentials for radiant skin",
    bgColor: "from-rose-50 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50",
    category: "beauty",
    image: "https://c1.wallpaperflare.com/preview/854/72/952/black-white-flat-lay-cosmetics-makeup-brush-kit.jpg",
  },
  {
    badge: "Fragrance Paradise",
    title: "Signature Scents Await",
    description: "Luxurious perfumes and colognes that define your presence",
    bgColor: "from-purple-50 to-violet-100 dark:from-purple-900/50 dark:to-violet-900/50",
    category: "fragrances",
    image: "https://ads-perfumes.com/wp-content/uploads/2025/03/Niche-perfumes.jpg",
  },
  {
    badge: "Fashion Forward",
    title: "Summer Arrival of Outfit",
    description: "Trendy clothing and accessories that match your unique style",
    bgColor: "from-amber-50 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50",
    category: "fashion",
    image: "https://assets.vogue.com/photos/66da738bbd1f0f52e7b90ddc/1:1/w_3000,h_3000,c_limit/RALPHLAUREN_SS25_BACKSTAGE_EMILYMALAN_23.jpg",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = selectedCategory === "all" 
          ? await productApi.getProducts(8, 0)
          : await productApi.getProductsByCategory(selectedCategory, 8, 0);
        setProducts(response.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users?limit=6");
        setCustomers(response.data.users);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await productApi.getCategories();
        setCategories(cats.slice(0, 6)); // Show only first 6 categories
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setLoading(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Carousel Section */}
        <section className="relative overflow-hidden">
          <div className="relative">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="relative h-[600px] md:h-[700px]">
                  <div className="absolute inset-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-20`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />
                  </div>

                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl">
                        <Badge variant="secondary" className="w-fit mb-4 bg-white/90 backdrop-blur">
                          {slide.badge}
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
                          {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-lg">
                          {slide.description}
                        </p>
                        <Link href="/products">
                          <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90 shadow-xl">
                            Explore Products
                            <ArrowRight className="h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Featured Cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                  alt="Fashion Collection"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50/80 to-amber-100/80 dark:from-amber-900/60 dark:to-amber-800/60">
                  <div className="text-center space-y-4 p-6">
                    <h3 className="text-2xl font-bold">Where dreams meet couture</h3>
                    <Link href="/products">
                      <Button variant="outline" className="gap-2">
                        Shop Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-64 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                  alt="Women's Fashion"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-50/80 to-rose-100/80 dark:from-rose-900/60 dark:to-rose-800/60">
                  <div className="text-center space-y-4 p-6">
                    <h3 className="text-2xl font-bold">Enchanting styles for every woman</h3>
                    <Link href="/products">
                      <Button variant="outline" className="gap-2">
                        Shop Now
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Popular Products */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Popular products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                variant={selectedCategory === "all" ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => handleCategoryChange("all")}
              >
                All
              </Badge>
              {categories.map((category) => {
                const categoryName = typeof category === 'string' ? category : category.name || category.slug || '';
                const categoryValue = typeof category === 'string' ? category : category.slug || category.name || '';
                
                return (
                  <Badge
                    key={categoryValue}
                    variant={selectedCategory === categoryValue ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm capitalize"
                    onClick={() => handleCategoryChange(categoryValue)}
                  >
                    {categoryName.replace(/-/g, " ")}
                  </Badge>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative h-64 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discountPercentage > 0 && (
                        <Badge className="absolute top-2 right-2" variant="destructive">
                          -{Math.round(product.discountPercentage)}%
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.discountPercentage > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg">View All Products</Button>
            </Link>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="bg-slate-50 dark:bg-slate-900 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">Over 350+ Customer</h2>
              <p className="text-muted-foreground">reviews from our clients</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 max-w-6xl mx-auto scrollbar-hide">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex flex-col items-center justify-center p-3 hover:scale-105 transition-transform"
                >
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={customer.image}
                      alt={`${customer.firstName} ${customer.lastName}`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold text-center truncate w-full">{customer.firstName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusive Offer */}
        <section className="container mx-auto px-4 py-16">
          <Card className="relative overflow-hidden bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 border-none">
            <Image
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=1200&q=80"
              alt="Newsletter"
              fill
              className="object-cover opacity-20"
            />
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                EXCLUSIVE FASHION OFFERS
              </h2>
              <p className="text-lg mb-6">AWAIT FOR YOUR</p>
              <Button size="lg" className="gap-2">
                Subscribe Newsletter
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-slate-900 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">FAQ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p> 2025 FastEco. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
