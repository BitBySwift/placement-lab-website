interface PriceDisplayProps {
  discountedPrice: number;
  originalPrice: number;
  showDiscount?: boolean;
}

export default function PriceDisplay({
  discountedPrice,
  originalPrice,
  showDiscount = true,
}: PriceDisplayProps) {
  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  const format = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      <span className="text-3xl font-bold text-white">{format(discountedPrice)}</span>
      {showDiscount && (
        <>
          <span className="text-gray-400 line-through text-lg">{format(originalPrice)}</span>
          <span className="badge bg-red-500/20 text-red-400 border border-red-500/30 text-xs">
            {discount}% OFF
          </span>
        </>
      )}
    </div>
  );
}
