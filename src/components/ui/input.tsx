import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import cn from '@lib/utils';

const inputVariants = cva(
  'flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-input bg-background text-primary placeholder:text-muted-foreground',
        form: 'border-primary-super-light bg-white text-primary placeholder:text-primary-light rounded-[0.375rem] disabled:opacity-80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
