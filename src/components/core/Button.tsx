import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    
    // Sovereign Design Standards
    const baseStyles = 'inline-flex items-center justify-center font-body font-bold uppercase tracking-widest transition-all duration-300 ease-out disabled:opacity-50 disabled:pointer-events-none rounded-sovereign active:scale-95';
    
    const variants = {
      primary: 'bg-brand-primary text-white hover:bg-brand-secondary shadow-[0_12px_24px_-8px_rgba(145,16,16,0.5)] border border-white/10',
      secondary: 'glass-sovereign text-brand-primary hover:text-white hover:bg-brand-primary border border-brand-primary/30',
      glass: 'glass-sovereign text-foreground hover:bg-brand-primary/10 border border-brand-primary/10',
      ghost: 'bg-transparent text-foreground/40 hover:text-brand-primary transition-colors',
    };
    
    const sizes = {
      sm: 'h-10 px-6 text-[9px] font-numbers font-black tracking-[0.2em]',
      md: 'h-14 px-10 text-[10px] font-numbers font-black tracking-[0.3em]',
      lg: 'h-20 px-16 text-xs font-numbers font-black tracking-[0.4em]',
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
