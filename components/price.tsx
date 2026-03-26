const Price = ({
  amount,
  className,
  currencyCode = 'USD',
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {

  // Create a reusable formatter to keep code clean
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  });

  if (amount.includes('-')) {
    const [min, max] = amount.split('-').map(p => p.trim());

    // Using ?? '0' tells TypeScript: "If min/max is undefined, use '0'"
    return (
      <p suppressHydrationWarning={true} className={className}>
        {`${formatter.format(parseFloat(min ?? '0'))} - ${formatter.format(parseFloat(max ?? '0'))}`}
      </p>
    );
  }

  // Default single price rendering
  return (
    <p suppressHydrationWarning={true} className={className}>
      {formatter.format(parseFloat(amount))}
    </p>
  );
};

export default Price;