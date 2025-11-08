"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productApi } from "@/services/api";
import { Product } from "@/types/product";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productApi.getProduct(Number(params.id));
        setProduct(data);
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          stock: data.stock.toString(),
          brand: data.brand,
          category: data.category,
        });
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = "Stock must be 0 or greater";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setSaving(true);
    try {
      await productApi.updateProduct(Number(params.id), {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        brand: formData.brand,
        category: formData.category,
      });
      toast.success("Product updated successfully!");
      router.push(`/products/${params.id}`);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products"><Button>Back to Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href={`/products/${params.id}`}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Save className="h-7 w-7" />
              Edit Product
            </CardTitle>
            <p className="text-muted-foreground mt-2">Update product information</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product title" className={errors.title ? "border-destructive" : ""} />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" rows={4} className={`flex w-full rounded-md border ${errors.description ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`} />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) <span className="text-destructive">*</span></Label>
                  <Input id="price" name="price" type="number" step="0.01" min="0" value={formData.price} onChange={handleChange} placeholder="0.00" className={errors.price ? "border-destructive" : ""} />
                  {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock <span className="text-destructive">*</span></Label>
                  <Input id="stock" name="stock" type="number" min="0" value={formData.stock} onChange={handleChange} placeholder="0" className={errors.stock ? "border-destructive" : ""} />
                  {errors.stock && <p className="text-sm text-destructive">{errors.stock}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand <span className="text-destructive">*</span></Label>
                  <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand name" className={errors.brand ? "border-destructive" : ""} />
                  {errors.brand && <p className="text-sm text-destructive">{errors.brand}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleChange} placeholder="Enter category" className={errors.category ? "border-destructive" : ""} />
                  {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="submit" size="lg" className="flex-1" disabled={saving}>
                  {saving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : <><Save className="h-4 w-4 mr-2" />Save Changes</>}
                </Button>
                <Link href={`/products/${params.id}`} className="flex-1">
                  <Button type="button" variant="outline" size="lg" className="w-full" disabled={saving}>Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}