import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    
    // Tailwind v4 utility classes based on our custom @theme config
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none rounded-[6px]';
    
    const variants = {
      primary: 'bg-brand-primary text-text-on-brand hover:bg-brand-secondary',
      secondary: 'bg-brand-secondary text-text-on-brand hover:bg-brand-primary',
      glass: 'glass text-text-primary hover:bg-white/40',
      ghost: 'bg-transparent text-text-primary hover:bg-brand-light',
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg font-semibold',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
