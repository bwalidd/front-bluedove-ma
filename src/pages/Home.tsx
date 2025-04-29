import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/Header";
import { SparklesCore } from "../components/ui/sparkles";
import Info from "../components/Info";
import ContactPage from "../components/contact";

// Custom hook to detect laptop/desktop viewport
const useIsLaptop = () => {
  const [isLaptop, setIsLaptop] = React.useState(typeof window !== 'undefined' && window.innerWidth > 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLaptop;
};

// Custom hook to detect when pricing component is visible
const usePricingVisibility = () => {
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  
  useEffect(() => {
    // Function to handle scroll and check if pricing section is in viewport
    const handleScroll = () => {
      const pricingElement = document.getElementById('pricing-section');
      if (pricingElement) {
        const rect = pricingElement.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
        );
        setIsPricingVisible(isVisible);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return isPricingVisible;
};

export default function Home() {
  const isLaptop = useIsLaptop();
  const isPricingVisible = usePricingVisibility();
  const infoRef = useRef(null);
  
  // Modify Info component to add ID reference for pricing section
  const InfoWithRefs = () => {
    const originalInfo = <Info ref={infoRef} />;
    
    // Add a marker div that will have the ID for detecting pricing visibility
    return (
      <>
        {React.cloneElement(originalInfo, {}, 
          React.Children.map(originalInfo.props.children, child => {
            // If the child is PricingPlans, wrap it in a div with an ID
            if (child?.type?.name === 'PricingPlans') {
              return (
                <div id="pricing-section">
                  {child}
                </div>
              );
            }
            return child;
          })
        )}
      </>
    );
  };
  
  // Only show sparkles when not on pricing section and on laptop
  const showSparkles = isLaptop && !isPricingVisible;
  
  return (
    <div className="min-h-screen bg-black text-white container mx-auto max-w-[85%]">
      <div className="relative overflow-hidden">
        {/* header */}
        <Header />
        
        {/* Info component with marker for pricing section */}
        <InfoWithRefs />
        
        {/* Conditional sparkles animation */}
        <div>
          {showSparkles && (
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1.5}
              particleDensity={10}
              className="w-full h-full absolute -top-16 left-0 z-0"
              particleColor="#FFFFFF"
            />
          )}
        </div>
      </div>
      <ContactPage />
    </div>
  );
}