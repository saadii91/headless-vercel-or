import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition-all duration-300 hover:border-[#285e2c] hover:bg-neutral-50 group active:scale-95">
      <ShoppingBagIcon
        className={clsx(
          'h-5 w-5 transition-transform group-hover:scale-110 text-neutral-700',
          className
        )}
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#285e2c] text-[10px] font-bold text-white shadow-md ring-2 ring-white animate-in zoom-in duration-300">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}