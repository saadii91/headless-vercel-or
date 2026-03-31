const Price = ({
  amount,
  className,
  currencyCode = 'USD', // This is your default if none is provided
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
} & React.ComponentProps<'p'>) => {

  // Force 'en-US' to ensure the $ symbol and US decimal formatting
  const formatter = new Intl.NumberFormat('en-US', {
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