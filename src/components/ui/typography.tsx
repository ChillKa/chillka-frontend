import cn from '@lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef } from 'react';

const H1 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h1';
  return (
    <Comp
      ref={ref}
      className={cn('text-5xl font-bold -tracking-[0.012em]', className)}
      {...props}
    />
  );
});

H1.displayName = 'H1';
export { H1 };

const H2 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h2';
  return (
    <Comp
      ref={ref}
      className={cn('text-3xl font-bold -tracking-[0.0075em]', className)}
      {...props}
    />
  );
});

H2.displayName = 'H2';
export { H2 };

const H3 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h3';
  return (
    <Comp
      ref={ref}
      className={cn('text-2xl font-bold -tracking-[0.006em]', className)}
      {...props}
    />
  );
});

H3.displayName = 'H3';
export { H3 };

const H4 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'h4';
  return (
    <Comp
      ref={ref}
      className={cn('text-xl font-bold -tracking-[0.005em]', className)}
      {...props}
    />
  );
});

H4.displayName = 'H4';
export { H4 };

const P = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    asChild?: boolean;
  }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      ref={ref}
      className={cn('text-base/7 font-normal', className)}
      {...props}
    />
  );
});

P.displayName = 'P';
export { P };

const Blockquote = forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'blockquote';
  return (
    <Comp
      ref={ref}
      className={cn(
        'mt-6 border-l-2 pl-6 font-normal italic text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});

Blockquote.displayName = 'Blockquote';
export { Blockquote };

const Lead = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp ref={ref} className={cn('text-xl font-bold', className)} {...props} />
  );
});

Lead.displayName = 'Lead';
export { Lead };

const Large = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    asChild?: boolean;
  }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp ref={ref} className={cn('text-lg font-bold', className)} {...props} />
  );
});

Large.displayName = 'Large';
export { Large };

const Small = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      ref={ref}
      className={cn('text-sm font-medium leading-none', className)}
      {...props}
    />
  );
});

Small.displayName = 'Small';
export { Small };

const Subtle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      ref={ref}
      className={cn('text-sm text-slate-500', className)}
      {...props}
    />
  );
});

Subtle.displayName = 'Subtle';
export { Subtle };

//designer didn't add the style on figma
const Muted = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'span';
  return (
    <Comp
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});

Muted.displayName = 'Muted';
export { Muted };

//designer didn't change the style on figma
const InlineCode = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    asChild?: boolean;
  }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'code';
  return (
    <Comp
      ref={ref}
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-bold',
        className
      )}
      {...props}
    />
  );
});

InlineCode.displayName = 'InlineCode';
export { InlineCode };

//designer didn't change the style on figma
const List = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      {...props}
    />
  );
});

List.displayName = 'List';
export { List };
