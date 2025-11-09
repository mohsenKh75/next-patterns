"use client";

import Image from "next/image";
import { Product } from "@/src/services/types/product";
import { Button } from "@/src/components/atoms/Button";

interface ProductIdProps {
  product: Product;
}

export function ProductId({ product }: ProductIdProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div
          className="relative aspect-square product-image-container"

        >
          <Image
            preload
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
            src={product.image}
            alt={product.title}
            fill
            className="object-contain rounded-lg"

          />
        </div>

        {/* Product Details */}
        <div className="product-content-container flex flex-col gap-4 animate-slide-in-right">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category}
          </p>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="mt-4">
            <Button>add TCart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
