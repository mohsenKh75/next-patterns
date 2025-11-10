import { LinkButton } from "@/src/components/atoms/LinkButton";
import type { Product } from "@/src/services/types/product";
import { SmartImage } from "../../atoms/Image";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {


  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <SmartImage
          style={{
            viewTransitionName: `product-image-${product.id}`,
          }}
          src={product.image}
          alt={product.title}
          fill
          placeholder="blur"
          blurDataURL={product.image} //NOTE: we could also use a small base64 blur image
          className='object-contain p-4'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          csr

        />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-1 flex-col gap-2">
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            ⭐ {product.rating.rate}
          </span>
          <span className="text-gray-400">•</span>
          <span>{product.rating.count} reviews</span>
        </div>

        {/* Price and Action */}
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <LinkButton href={`/products/${product.id}`} size="sm" variant="primary">
            View Details
          </LinkButton>
        </div>
      </div>
    </article>
  );
};
