// CheckoutContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our features
export interface Feature {
  id: string;
  name: string;
  description: string;
  pricePerCamera: number;
  icon: string;
  cameraCount?: number;
  monthlyCost?: number;
}

// Define type for storage and support plans
export interface Plan {
  id: string;
  name: string;
  price: number;
  default?: boolean;
}

// Define the checkout data structure
export interface CheckoutData {
  selectedFeatures: Feature[];
  featureCameraCounts: Record<string, number>;
  selectedStorage: Plan | null;
  selectedSupport: Plan | null;
  totalMonthlyCost: number;
  basePlatformCost: number;
  featureCosts: number;
  storageCost: number;
  supportCost: number;
  totalCameraCount: number;
}

// Define the context type
interface CheckoutContextType {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
}

// Create the context with default values
const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

// Provider props type
interface CheckoutProviderProps {
  children: ReactNode;
}

// Provider component
export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    selectedFeatures: [],
    featureCameraCounts: {},
    selectedStorage: null,
    selectedSupport: null,
    totalMonthlyCost: 0,
    basePlatformCost: 49,
    featureCosts: 0,
    storageCost: 0,
    supportCost: 0,
    totalCameraCount: 0
  });

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

// Custom hook to use the checkout context
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}