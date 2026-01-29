import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'accent' | 'ghost' | 'outline';
    fullWidth?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) => {

    // Gemensam bas-stil för ALLA knappar (rundning, font, flex-layout)
    const baseStyles = "rounded-4xl flex items-center justify-center gap-2 font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100";

    // Specifika stilar för varje variant
    const variants = {

        primary: "bg-primary hover:bg-primary/90 text-p-white px-5 py-3 lg:py-2 glass-effect-input shadow-md hover:shadow-lg focus-visible-primary",

        accent: "bg-accent text-primary px-6 py-3 text-lg hover:scale-105 shadow-lg focus-visible-white",

        ghost: "text-primary hover:bg-secondary/20 border-2 border-transparent hover:border-secondary/30 px-4 py-3 lg:py-2 focus-visible-primary",

        outline: "text-primary border-2 border-primary/20 hover:bg-secondary/10 hover:border-primary/40 px-5 py-3 lg:py-2 focus-visible-primary",
    };

    // Hantera bredd separat
    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
