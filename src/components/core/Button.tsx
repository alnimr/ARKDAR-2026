import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'crimson' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    
    // Sovereign Design Standards
    const baseStyles = 'inline-flex items-center justify-center font-latin font-bold uppercase tracking-widest transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none active:scale-95 border';
    
    const variants = {
      primary: 'bg-brand-primary text-surface-dark border-brand-secondary hover:bg-brand-secondary shadow-[0_8px_20px_rgba(184,146,42,0.2)]',
      secondary: 'layer-1 text-brand-primary border-sovereign hover:bg-brand-primary/10',
      crimson: 'bg-brand-crimson text-white border-white/10 hover:brightness-110 shadow-[0_8px_20px_rgba(122,21,21,0.3)]',
      ghost: 'bg-transparent text-foreground/60 border-transparent hover:text-brand-primary transition-colors',
    };
    
    const sizes = {
      sm: 'h-10 px-6 text-[10px] tracking-[0.15em]',
      md: 'h-12 px-10 text-[11px] tracking-[0.2em]',
      lg: 'h-16 px-14 text-xs tracking-[0.3em]',
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
