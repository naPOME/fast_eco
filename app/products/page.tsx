"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/products/ProductCard";
import { SearchBar } from "@/components/products/SearchBar";
import { productApi } from "@/services/api";
import { Product } from "@/types/product";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);
  const limit = 10;

  const loadProducts = useCallback(async (reset: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    try {
      const currentSkip = reset ? 0 : skip;
      const response = searchQuery
        ? await productApi.searchProducts(searchQuery, limit, currentSkip)
        : await productApi.getProducts(limit, currentSkip);

      if (reset) {
        setProducts(response.products);
      } else {
        setProducts((prev) => [...prev, ...response.products]);
      }
      
      setTotal(response.total);
      setSkip(currentSkip + limit);
      setHasMore(currentSkip + limit < response.total);
    } catch (error) {
      console.error("Error loading products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [skip, searchQuery, loading]);

  // Initial load
  useEffect(() => {
    loadProducts(true);
  }, []);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSkip(0);
    setProducts([]);
    setHasMore(true);
  }, []);

  // Load products when search query changes
  useEffect(() => {
    if (searchQuery !== undefined) {
      loadProducts(true);
    }
  }, [searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">All Products</h1>
            <p className="text-muted-foreground">
              {total > 0 ? `Showing ${products.length} of ${total} products` : "No products found"}
            </p>
          </div>
          <Link href="/products/create">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Loading indicator for infinite scroll */}
            <div ref={observerTarget} className="flex justify-center py-8">
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Loading more products...</span>
                </div>
              )}
              {!hasMore && products.length > 0 && (
                <p className="text-muted-foreground">No more products to load</p>
              )}
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">
                {searchQuery ? `No products found for "${searchQuery}"` : "No products available"}
              </p>
              {searchQuery && (
                <Button variant="outline" onClick={() => handleSearch("")}>
                  Clear Search
                </Button>
              )}
            </div>
          )
        )}

        {/* Initial loading state */}
        {loading && products.length === 0 && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </main>
    </div>
  );
}
