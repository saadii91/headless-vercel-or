import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) => {
  return (
    <div className="flex w-full flex-col px-4 pb-4 pt-4 transition-all duration-500 ease-in-out group-hover:bg-[#285e2c]">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between gap-2">
          <p className="line-clamp-1 text-sm font-bold uppercase tracking-tight text-[#285e2c] transition-colors duration-300 group-hover:text-white">
            {title}
          </p>

          <div className="flex-none rounded-md border border-neutral-100 bg-white px-2 py-0.5 transition-all duration-300 group-hover:border-white/20 group-hover:bg-[#285e2c]">
            <Price
              className="text-[#285e2c] text-xs font-black transition-colors duration-300 group-hover:text-white"
              amount={amount}
              currencyCode={currencyCode}
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex w-full items-center justify-center rounded-md bg-[#285e2c] py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-300 group-hover:bg-white group-hover:text-[#285e2c] shadow-sm">
            Buy Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Label;