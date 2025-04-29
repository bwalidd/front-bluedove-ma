"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom" // Using React Router instead of Next.js router
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Building2 } from "lucide-react"

const CheckoutForm = () => {
  const navigate = useNavigate() // React Router's navigation hook
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process payment and redirect
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        navigate("/admin") // React Router navigation
      }, 2000)
    }
  }

  return (
    <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-blue-600" : "bg-gray-700"}`}
            >
              <span className="text-sm font-medium">1</span>
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? "bg-blue-600" : "bg-gray-700"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-blue-600" : "bg-gray-700"}`}
            >
              <span className="text-sm font-medium">2</span>
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? "bg-blue-600" : "bg-gray-700"}`}></div>
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-blue-600" : "bg-gray-700"}`}
            >
              <span className="text-sm font-medium">3</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">Step {step} of 3</div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-4">Account Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Acme Inc." required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-4">Billing Information</h2>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" placeholder="123 Main St." required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" placeholder="California" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" placeholder="94103" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-medium mb-4">Payment Method</h2>

              <Tabs defaultValue="credit-card">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="credit-card" className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Credit Card
                  </TabsTrigger>
                  <TabsTrigger value="invoice" className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Invoice
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credit-card" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoice" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="poNumber">Purchase Order Number</Label>
                    <Input id="poNumber" placeholder="PO-12345" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Billing Email</Label>
                    <Input id="billingEmail" type="email" placeholder="billing@example.com" required />
                  </div>

                  <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
                    <p className="text-sm text-blue-300">
                      Invoice payment terms are Net 30. We'll send an invoice to your billing email address.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center space-x-2 mt-4">
                <input type="checkbox" id="terms" className="rounded border-gray-700 bg-gray-800" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div></div>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : step < 3 ? (
                "Continue"
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default CheckoutForm;