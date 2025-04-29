import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CheckoutForm from "@/components/checkout";
import bluedoveLogo from "@/assets/bluedove-logo.png";
import { useCheckout } from "@/components/CheckoutContext"; // Import the hook directly

const CheckoutPage: React.FC = () => {
  // Get the checkout data from the context
  const { checkoutData } = useCheckout();
  
  // Extract necessary data from context
  const {
    selectedFeatures,
    selectedStorage,
    selectedSupport,
    basePlatformCost,
    featureCosts,
    totalMonthlyCost,
    totalCameraCount
  } = checkoutData;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 md:px-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={bluedoveLogo} alt="Bluedove Logo" className="h-8" />
          </Link>

          <Link to="/" className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete Your ZARK Subscription</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              You're just a few steps away from transforming your standard cameras into intelligent monitoring systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <CheckoutForm />
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-lg font-medium mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Platform</span>
                    <span>${basePlatformCost?.toFixed(2) || "49.00"}</span>
                  </div>
                  
                  {/* Dynamic AI Features Section */}
                  {selectedFeatures && selectedFeatures.length > 0 ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Selected AI Features</span>
                        <span>${featureCosts?.toFixed(2) || "0.00"}</span>
                      </div>
                      
                      {/* List of selected features */}
                      <div className="pl-4 space-y-1 text-sm text-gray-400">
                        {selectedFeatures.map((feature, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{feature.name} ({feature.cameraCount} camera{feature.cameraCount !== 1 ? 's' : ''})</span>
                            <span>${feature.monthlyCost?.toFixed(2) || "0.00"}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-400">No AI Features Selected</span>
                      <span>$0.00</span>
                    </div>
                  )}
                  
                  {/* Storage Plan */}
                  <div className="flex justify-between">
                    <span className="text-gray-400">{selectedStorage?.name || "7-Day Storage"}</span>
                    <span>${selectedStorage?.price?.toFixed(2) || "49.00"}</span>
                  </div>
                  
                  {/* Support Plan */}
                  <div className="flex justify-between">
                    <span className="text-gray-400">{selectedSupport?.name || "Basic Support"}</span>
                    <span>{selectedSupport?.price === 0 ? "Included" : `$${selectedSupport?.price?.toFixed(2) || "0.00"}`}</span>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4 mb-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${totalMonthlyCost?.toFixed(2) || "49.00"}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Billed monthly</div>
                </div>

                <div className="text-sm text-gray-400">
                  <p className="mb-2">Your subscription includes:</p>
                  <ul className="space-y-1 list-disc pl-5">
                    <li>{totalCameraCount || 0} Camera License{totalCameraCount !== 1 ? 's' : ''}</li>
                    {selectedFeatures && selectedFeatures.map((feature, index) => (
                      <li key={index}>{feature.name}</li>
                    ))}
                    <li>{selectedStorage?.name || "7-Day Storage"}</li>
                    <li>{selectedSupport?.name || "Basic Support"}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-sm font-medium uppercase text-gray-400 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-400 mb-4">Our team is available to assist you with your purchase.</p>
                <div className="flex space-x-4">
                  <Link to="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Chat with Sales
                  </Link>
                  <Link to="#" className="text-blue-400 hover:text-blue-300 text-sm">
                    Schedule a Call
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Bluedove. All rights reserved.
            </div>

            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CheckoutPage;