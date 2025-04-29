"use client"

import React, { useState, useMemo, useCallback } from "react"
import { Info } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { useCheckout, Feature, Plan } from "@/components/CheckoutContext" // Import types from context

// AI features with their monthly costs per camera
const aiFeatures: Feature[] = [
  {
    id: "people-counting",
    name: "People Counting",
    description: "Track foot traffic and occupancy in real-time",
    pricePerCamera: 5,
    icon: "👥",
  },
  {
    id: "theft-detection",
    name: "Theft Detection",
    description: "Identify suspicious behavior and potential theft",
    pricePerCamera: 8,
    icon: "🚨",
  },
  {
    id: "face-recognition",
    name: "Face Recognition",
    description: "Securely identify and authenticate individuals",
    pricePerCamera: 10,
    icon: "👤",
  },
  {
    id: "emotion-analysis",
    name: "Emotion Analysis",
    description: "Understand customer sentiment and reactions",
    pricePerCamera: 7,
    icon: "😊",
  },
  {
    id: "smart-advertising",
    name: "Smart Advertising",
    description: "Deliver targeted content based on demographics",
    pricePerCamera: 9,
    icon: "📢",
  },
  {
    id: "wait-time-analysis",
    name: "Wait Time Analysis",
    description: "Monitor and optimize queue management",
    pricePerCamera: 6,
    icon: "⏱️",
  },
  {
    id: "object-counting",
    name: "Object Counting",
    description: "Track inventory, assets, and objects with precision",
    pricePerCamera: 5,
    icon: "📦",
  },
]

// Storage plans
const storagePlans: Plan[] = [
  { id: "7-day", name: "7-Day Storage", price: 49, default: true },
  { id: "30-day", name: "30-Day Storage", price: 99 },
  { id: "90-day", name: "90-Day Storage", price: 199 },
]

// Support plans
const supportPlans: Plan[] = [
  { id: "basic", name: "Basic Support", price: 0, default: true },
  { id: "priority", name: "Priority Support", price: 49 },
  { id: "premium", name: "Premium 24/7 Support", price: 149 },
]

// Feature item props interface
interface FeatureItemProps {
  feature: Feature;
  isSelected: boolean;
  cameraCount: number;
  onToggle: (id: string) => void;
  onCameraChange: (id: string, value: number[]) => void;
}

// Feature component to reduce re-renders
const FeatureItem: React.FC<FeatureItemProps> = ({
  feature,
  isSelected,
  cameraCount,
  onToggle,
  onCameraChange,
}) => {
  const handleCameraChange = useCallback(
    (value: number[]) => {
      onCameraChange(feature.id, value)
    },
    [feature.id, onCameraChange],
  )

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-xl">{feature.icon}</div>
          <div>
            <div className="font-medium">{feature.name}</div>
            <div className="text-sm text-gray-400">${feature.pricePerCamera}/camera/month</div>
          </div>
        </div>
        <Switch checked={isSelected} onCheckedChange={() => onToggle(feature.id)} />
      </div>

      {isSelected && (
        <div className="pl-8 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">Number of cameras:</div>
            <div className="text-lg font-bold">{cameraCount}</div>
          </div>

          <Slider value={[cameraCount]} max={10} min={1} step={1} onValueChange={handleCameraChange} className="mb-2" />

          <div className="flex justify-between text-xs text-gray-400">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Plan option props interface
interface PlanOptionProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

// Plan option component
const PlanOption: React.FC<PlanOptionProps> = ({ plan, isSelected, onSelect }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-medium">{plan.name}</div>
      <div className="text-sm text-gray-400">{plan.price === 0 ? "Included" : `$${plan.price}/month`}</div>
    </div>
    <Button variant={isSelected ? "default" : "outline"} size="sm" onClick={() => onSelect(plan.id)}>
      {isSelected ? "Selected" : "Select"}
    </Button>
  </div>
)

export function PricingPlans(): JSX.Element {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedStorage, setSelectedStorage] = useState<string>("7-day")
  const [selectedSupport, setSelectedSupport] = useState<string>("basic")
  const navigate = useNavigate()
  const { setCheckoutData } = useCheckout() // Get the context function

  // Track camera counts per feature instead of a global count
  const [featureCameraCounts, setFeatureCameraCounts] = useState<Record<string, number>>(
    Object.fromEntries(aiFeatures.map((feature) => [feature.id, 0]))
  )

  const handleFeatureCameraChange = useCallback((featureId: string, value: number[]) => {
    setFeatureCameraCounts((prev) => ({
      ...prev,
      [featureId]: value[0],
    }))
  }, [])

  const toggleFeature = useCallback(
    (featureId: string) => {
      setSelectedFeatures((prev) => {
        const isSelected = prev.includes(featureId)

        // If we're adding the feature and it has 0 cameras, set it to 1
        if (!isSelected && featureCameraCounts[featureId] === 0) {
          setFeatureCameraCounts((prevCounts) => ({
            ...prevCounts,
            [featureId]: 1,
          }))
        }

        return isSelected ? prev.filter((id) => id !== featureId) : [...prev, featureId]
      })
    },
    [featureCameraCounts],
  )

  // Memoize calculations to prevent recalculation on every render
  const { featureCosts, totalCameraCount, basePlatformCost, storageCost, supportCost, totalMonthlyCost } = useMemo(() => {
    // Calculate feature costs
    const featureCosts = selectedFeatures.reduce((total, featureId) => {
      const feature = aiFeatures.find((f) => f.id === featureId)
      return total + (feature ? feature.pricePerCamera * featureCameraCounts[featureId] : 0)
    }, 0)

    // Calculate total camera count for display purposes
    const totalCameraCount = Object.entries(featureCameraCounts)
      .filter(([featureId]) => selectedFeatures.includes(featureId))
      .reduce((sum, [_, count]) => sum + count, 0)

    // Calculate base platform cost
    const basePlatformCost = 49

    // Calculate storage cost
    const storageCost = storagePlans.find((plan) => plan.id === selectedStorage)?.price || 0

    // Calculate support cost
    const supportCost = supportPlans.find((plan) => plan.id === selectedSupport)?.price || 0

    // Calculate total monthly cost
    const totalMonthlyCost = basePlatformCost + featureCosts + storageCost + supportCost

    return { featureCosts, totalCameraCount, basePlatformCost, storageCost, supportCost, totalMonthlyCost }
  }, [selectedFeatures, featureCameraCounts, selectedStorage, selectedSupport])

  // Memoize the selected storage and support plans
  const selectedStoragePlan = useMemo(() => storagePlans.find((plan) => plan.id === selectedStorage), [selectedStorage])

  const selectedSupportPlan = useMemo(() => supportPlans.find((plan) => plan.id === selectedSupport), [selectedSupport])

  // Handle the checkout process
  const handleCheckout = () => {
    // Get all the selected features with details
    const selectedFeaturesDetails = selectedFeatures.map(featureId => {
      const feature = aiFeatures.find(f => f.id === featureId)
      if (!feature) return null;
      
      const cameraCount = featureCameraCounts[featureId]
      return {
        ...feature,
        cameraCount,
        monthlyCost: feature.pricePerCamera * cameraCount
      }
    }).filter(Boolean) as Feature[] // Filter out any null values and type assert
    
    // Update the checkout context with all necessary data
    setCheckoutData({
      selectedFeatures: selectedFeaturesDetails,
      featureCameraCounts,
      selectedStorage: selectedStoragePlan || null,
      selectedSupport: selectedSupportPlan || null,
      totalMonthlyCost,
      basePlatformCost,
      featureCosts,
      storageCost,
      supportCost,
      totalCameraCount
    })
    
    // Navigate to checkout page
    navigate("/checkout")
  }

  return (
    <div className="space-y-12">
      {/* Animated Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-16"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Choose <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">Your Plan</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column: Configuration */}
        <div className="space-y-8">
          {/* AI Features Selection */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Select AI Features</CardTitle>
              <CardDescription>Choose only the AI capabilities you need and set camera count for each</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiFeatures.map((feature) => (
                <FeatureItem
                  key={feature.id}
                  feature={feature}
                  isSelected={selectedFeatures.includes(feature.id)}
                  cameraCount={featureCameraCounts[feature.id]}
                  onToggle={toggleFeature}
                  onCameraChange={handleFeatureCameraChange}
                />
              ))}
            </CardContent>
          </Card>

          {/* Storage Options */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Data Storage</CardTitle>
              <CardDescription>How long do you need to store your data?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {storagePlans.map((plan) => (
                <PlanOption
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedStorage === plan.id}
                  onSelect={setSelectedStorage}
                />
              ))}
            </CardContent>
          </Card>

          {/* Support Options */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Support Plan</CardTitle>
              <CardDescription>Choose your level of support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {supportPlans.map((plan) => (
                <PlanOption
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedSupport === plan.id}
                  onSelect={setSelectedSupport}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column: Summary and Checkout */}
        <div className="space-y-8">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-4">
            <CardHeader>
              <CardTitle>Your Custom Plan</CardTitle>
              <CardDescription>Summary of your selected options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Features */}
              <div>
                <h3 className="font-medium mb-3">Selected AI Features</h3>
                {selectedFeatures.length > 0 ? (
                  <div className="space-y-2">
                    {selectedFeatures.map((featureId) => {
                      const feature = aiFeatures.find((f) => f.id === featureId)
                      const cameraCount = featureCameraCounts[featureId]
                      return feature ? (
                        <div key={feature.id} className="flex justify-between">
                          <div className="flex items-center">
                            <span className="mr-2">{feature.icon}</span>
                            <span>
                              {feature.name} ({cameraCount} {cameraCount === 1 ? "camera" : "cameras"})
                            </span>
                          </div>
                          <span>${feature.pricePerCamera * cameraCount}/month</span>
                        </div>
                      ) : null
                    })}
                  </div>
                ) : (
                  <div className="text-gray-400 italic">No AI features selected</div>
                )}
              </div>

              <Separator />

              {/* Cost Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Platform Fee</span>
                  <span>$49/month</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    AI Features ({totalCameraCount} total {totalCameraCount === 1 ? "camera" : "cameras"})
                  </span>
                  <span>${featureCosts}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedStoragePlan?.name}</span>
                  <span>${selectedStoragePlan?.price}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedSupportPlan?.name}</span>
                  <span>{selectedSupportPlan?.price === 0 ? "Included" : `$${selectedSupportPlan?.price}/month`}</span>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <div className="text-right">
                  <div className="text-3xl font-bold">${totalMonthlyCost}</div>
                  <div className="text-sm text-gray-400">per month</div>
                </div>
              </div>

              {/* CTA Button */}
              <Button onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-700 h-12 mt-4">Get Started</Button>

              {/* Guarantee */}
              <div className="text-center text-sm text-gray-400">
                30-day money-back guarantee. No long-term contracts.
              </div>
            </CardContent>
          </Card>

          {/* Need Help Card */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Info className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Need help choosing?</h3>
                  <p className="text-gray-400 mb-4">
                    Our experts can help you design the perfect solution for your specific needs.
                  </p>
                  <Button variant="outline">Schedule Consultation</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Card */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-2">Enterprise Solutions</h3>
              <p className="text-gray-400 mb-4">
                Need more than 50 cameras or have specific compliance requirements? Contact our enterprise team for a
                custom quote.
              </p>
              <Button variant="outline">Contact Enterprise Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
