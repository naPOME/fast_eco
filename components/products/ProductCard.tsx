"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { toggleFavorite } from "@/app/redux/slices/favoritesSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(toggleFavorite(product));

    if (isFavorite) {
      toast.success("Removed from favorites");
    } else {
      toast.success("Added to favorites");
    }
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
        <div className="relative h-64 bg-slate-100 dark:bg-slate-800">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2" variant="destructive">
              -{Math.round(product.discountPercentage)}%
            </Badge>
          )}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="mb-2 text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold mb-2 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
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
  );
}