import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    
    // Sovereign Design Standards - Absolute 0px, font-brand, cinematic duration
    const baseStyles = 'inline-flex items-center justify-center font-brand font-bold uppercase tracking-[0.5em] transition-all duration-cine ease-out disabled:opacity-40 disabled:pointer-events-none active:scale-95 border-0 rounded-none';
    
    const variants = {
      primary: 'bg-gold text-black hover:bg-gold-light hover:tracking-[0.7em]',
      secondary: 'layer-2 text-gold border border-quiet hover:border-gold hover:bg-gold/5 hover:tracking-[0.6em]',
      outline: 'bg-transparent text-gold border border-gold hover:bg-gold hover:text-black hover:tracking-[0.7em]',
      ghost: 'bg-transparent text-ghost/40 hover:text-gold hover:tracking-[0.6em] transition-all',
    };
    
    const sizes = {
      sm: 'h-12 px-8 text-[10px]',
      md: 'h-14 px-12 text-[11px]',
      lg: 'h-20 px-16 text-[13px]',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-4 flex gap-1">
            <span className="w-1 h-1 bg-current animate-pulse"></span>
            <span className="w-1 h-1 bg-current animate-pulse delay-75"></span>
            <span className="w-1 h-1 bg-current animate-pulse delay-150"></span>
          </div>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
