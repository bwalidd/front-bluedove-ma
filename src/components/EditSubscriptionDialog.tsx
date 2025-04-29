// EditSubscriptionDialog.tsx
import React, { useState, useEffect, useMemo } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Edit2, Info, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

// Types
interface Feature {
  id: string;
  name: string;
  description: string;
  pricePerCamera: number;
  icon: string;
}

interface EditSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: {
    name: string;
    amount: number;
    interval: string;
    features: string[];
  };
  onSave: (newPlan: any) => void;
}

// AI features with their monthly costs per camera (same as in your pricing component)
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
];

// Storage plans
const storagePlans = [
  { id: "7-day", name: "7-Day Storage", price: 49 },
  { id: "30-day", name: "30-Day Storage", price: 99 },
  { id: "90-day", name: "90-Day Storage", price: 199 },
];

// Support plans
const supportPlans = [
  { id: "basic", name: "Basic Support", price: 0 },
  { id: "priority", name: "Priority Support", price: 49 },
  { id: "premium", name: "Premium 24/7 Support", price: 149 },
];

// Helper function to map feature strings to feature objects
const mapFeatureStringsToObjects = (featureStrings: string[]): { id: string, cameraCount: number }[] => {
  const result: { id: string, cameraCount: number }[] = [];
  
  // Extract features with camera counts
  featureStrings.forEach(str => {
    // Check if it's a camera count feature
    const cameraMatch = str.match(/(\d+) Camera/);
    if (cameraMatch) {
      return; // Skip the camera licenses entry - we'll recalculate this
    }
    
    // Find matching feature
    const feature = aiFeatures.find(f => str.includes(f.name));
    if (feature) {
      // Default to 1 camera if not specified
      result.push({ id: feature.id, cameraCount: 1 });
    }
  });
  
  return result;
};

// Calculate total camera count from feature strings
const getTotalCameraCount = (featureStrings: string[]): number => {
  const cameraMatch = featureStrings.find(str => str.match(/(\d+) Camera/));
  if (cameraMatch) {
    const match = cameraMatch.match(/(\d+) Camera/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  return 0;
};

const EditSubscriptionDialog: React.FC<EditSubscriptionDialogProps> = ({
  isOpen,
  onClose,
  currentPlan,
  onSave
}) => {
  // Extract current features
  const initialFeatures = useMemo(() => 
    mapFeatureStringsToObjects(currentPlan.features),
  [currentPlan.features]);
  
  const initialCameraCount = useMemo(() => 
    getTotalCameraCount(currentPlan.features),
  [currentPlan.features]);
  
  // State for feature selection
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialFeatures.map(f => f.id)
  );
  
  // Track camera counts per feature
  const [featureCameraCounts, setFeatureCameraCounts] = useState<Record<string, number>>(
    Object.fromEntries(
      initialFeatures.map(f => [f.id, f.cameraCount])
    )
  );
  
  // Billing cycle
  const [billingInterval, setBillingInterval] = useState<string>(currentPlan.interval);
  
  // Storage and support
  const [selectedStorage, setSelectedStorage] = useState<string>(
    currentPlan.features.some(f => f.includes("30-Day")) ? "30-day" : 
    currentPlan.features.some(f => f.includes("90-Day")) ? "90-day" : "7-day"
  );
  
  const [selectedSupport, setSelectedSupport] = useState<string>(
    currentPlan.features.some(f => f.includes("Premium")) ? "premium" :
    currentPlan.features.some(f => f.includes("Priority")) ? "priority" : "basic"
  );

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures(prev => {
      const isSelected = prev.includes(featureId);
      
      // If we're adding the feature and it has 0 cameras, set it to 1
      if (!isSelected && (!featureCameraCounts[featureId] || featureCameraCounts[featureId] === 0)) {
        setFeatureCameraCounts(prevCounts => ({
          ...prevCounts,
          [featureId]: 1,
        }));
      }
      
      return isSelected ? prev.filter(id => id !== featureId) : [...prev, featureId];
    });
  };

  // Handle camera count changes
  const handleCameraChange = (featureId: string, value: number[]) => {
    setFeatureCameraCounts(prev => ({
      ...prev,
      [featureId]: value[0],
    }));
  };
  
  // Storage plan option component
  const StoragePlanOption = ({ id, name, price }: { id: string, name: string, price: number }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-400">${price}/month</div>
      </div>
      <Button 
        variant={selectedStorage === id ? "default" : "outline"} 
        size="sm" 
        onClick={() => setSelectedStorage(id)}
        className={selectedStorage === id ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700"}
      >
        {selectedStorage === id ? "Selected" : "Select"}
      </Button>
    </div>
  );
  
  // Support plan option component
  const SupportPlanOption = ({ id, name, price }: { id: string, name: string, price: number }) => (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-400">{price === 0 ? "Included" : `$${price}/month`}</div>
      </div>
      <Button 
        variant={selectedSupport === id ? "default" : "outline"} 
        size="sm" 
        onClick={() => setSelectedSupport(id)}
        className={selectedSupport === id ? "bg-blue-600 hover:bg-blue-700" : "border-gray-700"}
      >
        {selectedSupport === id ? "Selected" : "Select"}
      </Button>
    </div>
  );
  
  // Calculate costs
  const costs = useMemo(() => {
    // Base platform cost
    const basePlatformCost = 49;
    
    // Feature costs
    const featureCosts = selectedFeatures.reduce((total, featureId) => {
      const feature = aiFeatures.find(f => f.id === featureId);
      const cameraCount = featureCameraCounts[featureId] || 0;
      return total + (feature ? feature.pricePerCamera * cameraCount : 0);
    }, 0);
    
    // Storage cost
    const storageCost = storagePlans.find(plan => plan.id === selectedStorage)?.price || 0;
    
    // Support cost
    const supportCost = supportPlans.find(plan => plan.id === selectedSupport)?.price || 0;
    
    // Total camera count
    const totalCameraCount = Object.entries(featureCameraCounts)
      .filter(([featureId]) => selectedFeatures.includes(featureId))
      .reduce((sum, [_, count]) => sum + count, 0);
    
    // Total cost
    const totalMonthlyCost = basePlatformCost + featureCosts + storageCost + supportCost;
    
    // Apply annual discount if applicable
    const annualDiscount = billingInterval === 'annually' ? 0.15 : 0;
    const discountedTotal = totalMonthlyCost * (1 - annualDiscount);
    
    // Calculate annual equivalent for display
    const annualEquivalent = discountedTotal * 12;
    
    return {
      basePlatformCost,
      featureCosts,
      storageCost,
      supportCost,
      totalCameraCount,
      totalMonthlyCost,
      discountedTotal,
      annualEquivalent,
      discount: annualDiscount > 0 ? totalMonthlyCost * annualDiscount : 0
    };
  }, [selectedFeatures, featureCameraCounts, selectedStorage, selectedSupport, billingInterval]);
  
  // Save changes
  const handleSave = () => {
    // Construct feature list
    const newFeatures = [
      `${costs.totalCameraCount} Camera ${costs.totalCameraCount === 1 ? 'License' : 'Licenses'}`,
      ...selectedFeatures.map(id => {
        const feature = aiFeatures.find(f => f.id === id);
        return feature ? feature.name : '';
      }).filter(Boolean),
      storagePlans.find(plan => plan.id === selectedStorage)?.name || '',
      supportPlans.find(plan => plan.id === selectedSupport)?.name || ''
    ];
    
    // New plan object
    const newPlan = {
      name: "Custom Plan",
      amount: billingInterval === 'annually' ? costs.discountedTotal : costs.totalMonthlyCost,
      interval: billingInterval,
      features: newFeatures,
      nextBillingDate: "May 15, 2025" // This would normally be calculated based on current date
    };
    
    onSave(newPlan);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-[90vw] md:max-w-[80vw] lg:max-w-[75vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Customize Your Subscription</DialogTitle>
          <DialogDescription className="text-gray-400">
            Select AI features, storage, and support options to build your perfect plan
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-5 gap-6 py-4">
          {/* Left column: Feature selection (3/5 width) */}
          <div className="md:col-span-3 space-y-6">
            {/* AI Features */}
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Features</h3>
              <div className="space-y-6 bg-gray-800/50 p-4 rounded-lg border border-gray-800">
                {aiFeatures.map(feature => (
                  <div key={feature.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{feature.icon}</div>
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-gray-400">${feature.pricePerCamera}/camera/month</div>
                        </div>
                      </div>
                      <Switch 
                        checked={selectedFeatures.includes(feature.id)} 
                        onCheckedChange={() => toggleFeature(feature.id)} 
                      />
                    </div>

                    {selectedFeatures.includes(feature.id) && (
                      <div className="pl-8 space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">Number of cameras:</div>
                          <div className="text-lg font-bold">{featureCameraCounts[feature.id] || 1}</div>
                        </div>

                        <Slider 
                          value={[featureCameraCounts[feature.id] || 1]} 
                          max={10} 
                          min={1} 
                          step={1} 
                          onValueChange={(value) => handleCameraChange(feature.id, value)} 
                          className="mb-2" 
                        />

                        <div className="flex justify-between text-xs text-gray-400">
                          <span>1</span>
                          <span>10</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Storage Plans */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Storage Plan</h3>
              <div className="space-y-2 bg-gray-800/50 p-4 rounded-lg border border-gray-800">
                {storagePlans.map(plan => (
                  <StoragePlanOption key={plan.id} id={plan.id} name={plan.name} price={plan.price} />
                ))}
              </div>
            </div>
            
            {/* Support Plans */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support Plan</h3>
              <div className="space-y-2 bg-gray-800/50 p-4 rounded-lg border border-gray-800">
                {supportPlans.map(plan => (
                  <SupportPlanOption key={plan.id} id={plan.id} name={plan.name} price={plan.price} />
                ))}
              </div>
            </div>
            
            {/* Billing Cycle */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Billing Cycle</h3>
              <div className="space-y-3 bg-gray-800/50 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Monthly Billing</div>
                    <div className="text-sm text-gray-400">Pay month-to-month</div>
                  </div>
                  <Switch 
                    checked={billingInterval === 'monthly'} 
                    onCheckedChange={() => setBillingInterval(billingInterval === 'monthly' ? 'annually' : 'monthly')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Annual Billing</div>
                    <div className="text-sm text-gray-400">Save 15% by paying annually</div>
                  </div>
                  <Switch 
                    checked={billingInterval === 'annually'} 
                    onCheckedChange={() => setBillingInterval(billingInterval === 'annually' ? 'monthly' : 'annually')} 
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Summary (2/5 width) */}
          <div className="md:col-span-2">
            <div className="sticky top-6 space-y-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Plan Summary</h3>
                
                {/* Selected features */}
                <div className="space-y-1 mb-4">
                  <div className="text-sm text-gray-400 mb-2">Selected AI Features:</div>
                  {selectedFeatures.length > 0 ? (
                    selectedFeatures.map(featureId => {
                      const feature = aiFeatures.find(f => f.id === featureId);
                      const cameraCount = featureCameraCounts[featureId] || 0;
                      return feature ? (
                        <div key={feature.id} className="flex justify-between">
                          <div className="flex items-center">
                            <span className="mr-2">{feature.icon}</span>
                            <span>
                              {feature.name} ({cameraCount} {cameraCount === 1 ? "camera" : "cameras"})
                            </span>
                          </div>
                          <span>${feature.pricePerCamera * cameraCount}/mo</span>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-gray-400 italic">No AI features selected</div>
                  )}
                </div>
                
                <Separator className="my-4 bg-gray-700" />
                
                {/* Cost breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Base Platform Fee</span>
                    <span>${costs.basePlatformCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      AI Features ({costs.totalCameraCount} total {costs.totalCameraCount === 1 ? "camera" : "cameras"})
                    </span>
                    <span>${costs.featureCosts}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{storagePlans.find(plan => plan.id === selectedStorage)?.name}</span>
                    <span>${costs.storageCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{supportPlans.find(plan => plan.id === selectedSupport)?.name}</span>
                    <span>
                      {costs.supportCost === 0 ? "Included" : `$${costs.supportCost}/mo`}
                    </span>
                  </div>
                </div>
                
                {/* Annual discount if applicable */}
                {billingInterval === 'annually' && (
                  <div className="bg-green-900/20 border border-green-900/30 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-green-400">
                      <span>Annual discount (15%)</span>
                      <span>-${costs.discount.toFixed(2)}/mo</span>
                    </div>
                    <div className="text-xs text-green-500/80 mt-1">
                      Save ${(costs.discount * 12).toFixed(2)} per year
                    </div>
                  </div>
                )}
                
                <Separator className="my-4 bg-gray-700" />
                
                {/* Total cost */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Total</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      ${billingInterval === 'annually' ? costs.discountedTotal.toFixed(2) : costs.totalMonthlyCost.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-400">per month</div>
                  </div>
                </div>
                
                {billingInterval === 'annually' && (
                  <div className="text-sm text-gray-400 text-right">
                    ${costs.annualEquivalent.toFixed(2)} billed annually
                  </div>
                )}
                
                {/* Next billing date info */}
                <div className="bg-gray-800 rounded-lg p-3 mt-6 flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm">Next billing: May 15, 2025</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Plan changes will be effective immediately, but you'll be charged the new amount on your next billing date.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-900/30 rounded-lg p-4 flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-200">
                  You can change your plan again at any time. We'll prorate any charges based on your billing cycle.
                </div>
              </div>
              
              {/* Warning if no features selected */}
              {selectedFeatures.length === 0 && (
                <div className="bg-yellow-900/20 border border-yellow-900/30 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-200">
                    You haven't selected any AI features. Your subscription will only include the base platform fee, storage, and support.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 border-t border-gray-800 pt-4 mt-2">
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-800 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionDialog;