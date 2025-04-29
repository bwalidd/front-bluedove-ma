// src/components/ui/accordion.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  children: React.ReactNode;
}

export const AccordionContent: React.FC<{
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
}> = ({ className, children, isOpen }) => {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        isOpen ? "max-h-96" : "max-h-0",
        className
      )}
    >
      <div className={cn("pb-4 pt-0", !isOpen && "hidden")}>{children}</div>
    </div>
  );
};

export const AccordionTrigger: React.FC<{
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}> = ({ className, children, isOpen, onClick }) => {
  return (
    <div className="flex">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          className
        )}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
    </div>
  );
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  trigger,
  children,
  className,
}) => {
  const context = React.useContext(AccordionContext);
  
  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }
  
  const { openItems, onToggle } = context;
  const isOpen = openItems.includes(value);
  
  return (
    <div className={cn("border-b", className)}>
      <AccordionTrigger
        isOpen={isOpen}
        onClick={() => onToggle(value)}
      >
        {trigger}
      </AccordionTrigger>
      <AccordionContent isOpen={isOpen}>{children}</AccordionContent>
    </div>
  );
};

// Create context
const AccordionContext = React.createContext<{
  openItems: string[];
  onToggle: (value: string) => void;
} | null>(null);

export const Accordion: React.FC<AccordionProps> = ({
  type = "single",
  collapsible = false,
  defaultValue = [],
  className,
  children,
}) => {
  const defaultOpenItems = Array.isArray(defaultValue)
    ? defaultValue
    : [defaultValue].filter(Boolean);
  
  const [openItems, setOpenItems] = useState<string[]>(defaultOpenItems);
  
  const onToggle = (value: string) => {
    setOpenItems((prevOpenItems) => {
      const isOpen = prevOpenItems.includes(value);
      
      if (type === "single") {
        if (isOpen && collapsible) {
          return [];
        }
        return [value];
      }
      
      if (isOpen) {
        return prevOpenItems.filter((item) => item !== value);
      }
      
      return [...prevOpenItems, value];
    });
  };
  
  return (
    <AccordionContext.Provider value={{ openItems, onToggle }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};