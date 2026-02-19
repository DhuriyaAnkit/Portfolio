import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-secondary border border-border rounded-xl p-6',
      elevated: 'bg-secondary border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200',
      outlined: 'bg-transparent border-2 border-border rounded-xl p-6 hover:border-primary transition-colors duration-200',
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export default Card;
