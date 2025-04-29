import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define badge variants using class-variance-authority
const badgeVariants = cva(
  // Base styles applied to all badges
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900",
  {
    variants: {
      variant: {
        // Different color variants
        default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-purple-600 text-white hover:bg-purple-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        danger: "bg-red-600 text-white hover:bg-red-700",
        warning: "bg-amber-600 text-white hover:bg-amber-700",
        info: "bg-cyan-600 text-white hover:bg-cyan-700",
        
        // Outline variants
        outline: "border border-gray-700 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50",
        "outline-primary": "border border-blue-700 text-blue-400 hover:bg-blue-900/20",
        "outline-secondary": "border border-purple-700 text-purple-400 hover:bg-purple-900/20",
        "outline-success": "border border-green-700 text-green-400 hover:bg-green-900/20",
        "outline-danger": "border border-red-700 text-red-400 hover:bg-red-900/20",
        "outline-warning": "border border-amber-700 text-amber-400 hover:bg-amber-900/20",
        "outline-info": "border border-cyan-700 text-cyan-400 hover:bg-cyan-900/20",
        
        // Subtle variants with transparent backgrounds
        subtle: "bg-gray-800/40 text-gray-300 hover:bg-gray-800/60",
        "subtle-primary": "bg-blue-900/20 text-blue-400 hover:bg-blue-900/40",
        "subtle-secondary": "bg-purple-900/20 text-purple-400 hover:bg-purple-900/40",
        "subtle-success": "bg-green-900/20 text-green-400 hover:bg-green-900/40",
        "subtle-danger": "bg-red-900/20 text-red-400 hover:bg-red-900/40",
        "subtle-warning": "bg-amber-900/20 text-amber-400 hover:bg-amber-900/40",
        "subtle-info": "bg-cyan-900/20 text-cyan-400 hover:bg-cyan-900/40",
      },
      size: {
        // Different size variants
        xs: "h-4 text-[10px] px-1.5",
        sm: "h-5 text-xs px-2",
        md: "h-6 text-xs px-2.5",
        lg: "h-7 text-sm px-3",
      },
      rounded: {
        // Different border radius options
        default: "rounded-full",
        sm: "rounded-md",
        lg: "rounded-xl",
        none: "rounded-none",
      },
      withIcon: {
        // Adjust padding when there's an icon
        true: "pl-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "default",
    },
  }
);

// Props interface for Badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  withDot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
  clickable?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      withIcon,
      icon,
      withDot,
      dotColor,
      removable,
      onRemove,
      clickable,
      children,
      ...props
    },
    ref
  ) => {
    // Custom dot color class based on the dotColor prop
    const dotColorClass = dotColor
      ? `bg-${dotColor}-500`
      : variant?.startsWith("outline")
      ? `bg-${variant.replace("outline-", "")}-400`
      : variant?.startsWith("subtle")
      ? `bg-${variant.replace("subtle-", "")}-400`
      : "bg-current";

    const hasIconOrDot = icon || withDot;

    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({
            variant,
            size,
            rounded,
            withIcon: hasIconOrDot,
          }),
          clickable && "cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {withDot && (
          <span
            className={cn(
              "mr-1 inline-block h-1.5 w-1.5 rounded-full",
              dotColorClass
            )}
          />
        )}

        {/* Icon */}
        {icon && (
          <span className="mr-1 flex items-center text-current">{icon}</span>
        )}

        {/* Label */}
        <span>{children}</span>

        {/* Remove button */}
        {removable && (
          <button
            type="button"
            className="ml-1 inline-flex items-center justify-center rounded-full text-current hover:bg-gray-700/30 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              if (onRemove) onRemove();
            }}
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Remove badge</span>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };