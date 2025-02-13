import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export enum ButtonVariant {
  Primary = 'primary',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Danger = 'danger',
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  outline?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = ButtonVariant.Primary, size = ButtonSize.Medium, isLoading, outline, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    
    const variants = {
      [ButtonVariant.Primary]: outline
        ? 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500'
        : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      [ButtonVariant.Success]: outline
        ? 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500'
        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
      [ButtonVariant.Info]: outline
        ? 'border-2 border-sky-600 text-sky-600 hover:bg-sky-50 focus:ring-sky-500'
        : 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500',
      [ButtonVariant.Warning]: outline
        ? 'border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 focus:ring-yellow-500'
        : 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      [ButtonVariant.Danger]: outline
        ? 'border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500'
        : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      [ButtonSize.Small]: 'px-3 py-1.5 text-sm',
      [ButtonSize.Medium]: 'px-4 py-2 text-sm',
      [ButtonSize.Large]: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';