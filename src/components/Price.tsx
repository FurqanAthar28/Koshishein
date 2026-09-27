type PriceProps = {
  price: number;
  originalPrice?: number;
  className?: string;
};

export default function Price({ price, originalPrice, className }: PriceProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;

  return (
    <span className={`price${className ? ` ${className}` : ""}`}>
      {hasDiscount && (
        <s className="price-original">PKR {originalPrice.toLocaleString()}</s>
      )}
      <strong>PKR {price.toLocaleString()}</strong>
    </span>
  );
}
