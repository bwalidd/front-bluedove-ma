// src/components/ui/toast.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = React.createContext<{
  toasts: Array<{
    id: string;
    title?: string;
    description?: string;
    variant?: "default" | "destructive" | "success";
  }>,
  addToast: (toast: { 
    title?: string; 
    description?: string; 
    variant?: "default" | "destructive" | "success";
    duration?: number;
  }) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {}
})

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-gray-800 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white",
        destructive:
          "border-red-900/50 bg-red-900/20 text-red-400",
        success: "border-green-900/50 bg-green-900/20 text-green-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
        {onClose && (
          <button
            className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = "Toast"

const ToastViewport = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

export interface ToastProviderProps {
  children: React.ReactNode
}

export function ToastContainer({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<{
    [id: string]: {
      id: string;
      title?: string;
      description?: string;
      variant?: "default" | "destructive" | "success";
      timeoutId?: NodeJS.Timeout;
    };
  }>({});
  
  const addToast = React.useCallback(
    ({ title, description, variant = "default", duration = 5000 }: { 
      title?: string; 
      description?: string; 
      variant?: "default" | "destructive" | "success";
      duration?: number;
    }) => {
      const id = Math.random().toString(36).substring(2, 9);
      
      const timeoutId = setTimeout(() => {
        removeToast(id);
      }, duration);
      
      setToasts((prev) => ({
        ...prev,
        [id]: { id, title, description, variant, timeoutId },
      }));
      
      return id;
    },
    []
  );
  
  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => {
      // Clear the timeout to prevent memory leaks
      if (prev[id]?.timeoutId) {
        clearTimeout(prev[id].timeoutId);
      }
      
      const newToasts = { ...prev };
      delete newToasts[id];
      return newToasts;
    });
  }, []);
  
  const contextValue = React.useMemo(
    () => ({
      toasts: Object.values(toasts),
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );
  
  return (
    <ToastProvider.Provider value={contextValue}>
      {children}
      <ToastViewport>
        {Object.values(toasts).map(({ id, title, description, variant }) => (
          <Toast
            key={id}
            variant={variant}
            title={title}
            description={description}
            onClose={() => removeToast(id)}
          />
        ))}
      </ToastViewport>
    </ToastProvider.Provider>
  );
}

export const useToast = () => {
  const { addToast, removeToast } = React.useContext(ToastProvider);
  
  return {
    toast: (props: {
      title?: string;
      description?: string;
      variant?: "default" | "destructive" | "success";
      duration?: number;
    }) => addToast(props),
    dismiss: (id: string) => removeToast(id),
  };
};