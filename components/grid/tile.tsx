import clsx from 'clsx';
import Image from 'next/image';
import Label from '../label';

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    maxAmount?: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        'group flex w-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-700 animate-in fade-in slide-in-from-bottom-4 hover:shadow-xl dark:bg-black',
        {
          'relative border-2 border-[#285e2c]': active,
          'border-neutral-200 dark:border-neutral-800': !active
        }
      )}
    >
      <div className="relative w-full overflow-hidden bg-neutral-50" style={{ paddingBottom: '105%' }}>
        {props.src ? (
          <Image
            className={clsx('absolute inset-0 h-full w-full object-cover transition duration-1000 ease-in-out group-hover:scale-110', {
              'opacity-50': !isInteractive
            })}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            {...props}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#285e2c] opacity-30 uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          maxAmount={label.maxAmount}
          currencyCode={label.currencyCode}
        />
      ) : null}
    </div>
  );
}