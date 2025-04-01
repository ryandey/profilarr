import * as React from 'react';
import {Slot} from '@radix-ui/react-slot';
import {cva} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:cursor-pointer',
    {
        variants: {
            variant: {
                default: 'bg-blue-500 text-white shadow hover:bg-blue-600',
                destructive:
                    'bg-destructive text-destructive-foreground  hover:bg-destructive/90',
                outline:
                    'rounded-md border border-gray-300 text-foreground dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-blue-500/50 hover:text-blue-500 dark:hover:border-blue-500/50 dark:hover:text-blue-400 transition-all duration-150 ease-in-out group',
                secondary:
                    'bg-secondary text-secondary-foreground transition-all duration-200 hover:bg-muted dark:hover:brightness-115',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-11 rounded-lg px-4',
                icon: 'h-9 w-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export const Button = React.forwardRef(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export {buttonVariants};
