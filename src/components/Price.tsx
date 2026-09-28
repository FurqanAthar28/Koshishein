import { discountPercent, formatAmount, type Product } from "@/lib/shopify";

type PriceProps = {
  product: Product;
  className?: string;
};

export default function Price({ product, className }: PriceProps) {
  const discount = discountPercent(product);

  return (
    <span className={`price${className ? ` ${className}` : ""}`}>
      {discount > 0 && (
        <span className="price-badge">−{discount}%</span>
      )}
      {product.originalPrice && (
        <s className="price-original">
          {formatAmount(product, product.originalPrice)}
        </s>
      )}
      <strong>{formatAmount(product, product.price)}</strong>
    </span>
  );
}
