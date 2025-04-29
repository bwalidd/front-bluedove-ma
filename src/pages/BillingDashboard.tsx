// Updated BillingDashboard.tsx
import React, { useState } from "react";
import { 
  CreditCard, 
  Calendar, 
  
  CheckCircle, 
  
  FileText, 
  Download, 
  Edit2,
 
  Edit,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import the new EditSubscriptionDialog component
import EditSubscriptionDialog from "../components/EditSubscriptionDialog";

// Sample subscription data
const initialSubscriptionData = {
  plan: "Pro Plan",
  status: "active",
  amount: 372.00,
  interval: "monthly",
  nextBillingDate: "May 15, 2025",
  cardInfo: {
    type: "Visa",
    last4: "4242",
    expiry: "05/26"
  },
  features: [
    "5 Camera Licenses",
    "People Counting",
    "Theft Detection",
    "Face Recognition",
    "30-Day Data Storage",
    "Priority Support"
  ],
  billingHistory: [
    { id: 1, date: "Apr 15, 2025", amount: 372.00, status: "paid", invoice: "INV-001-23" },
    { id: 2, date: "Mar 15, 2025", amount: 372.00, status: "paid", invoice: "INV-001-22" },
    { id: 3, date: "Feb 15, 2025", amount: 372.00, status: "paid", invoice: "INV-001-21" },
    { id: 4, date: "Jan 15, 2025", amount: 372.00, status: "paid", invoice: "INV-001-20" },
  ]
};

// Sample payment methods
const paymentMethods = [
  { id: 1, type: "Visa", last4: "4242", expiry: "05/26", default: true },
  { id: 2, type: "Mastercard", last4: "9876", expiry: "08/27", default: false },
];

const BillingDashboard: React.FC = () => {
  // State
  const [subscriptionData, setSubscriptionData] = useState(initialSubscriptionData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] = useState(false);
  
  // Handle plan update
  const handlePlanUpdate = (newPlan: any) => {
    // Update subscription data with new plan details
    setSubscriptionData({
      ...subscriptionData,
      plan: newPlan.name,
      amount: newPlan.amount,
      interval: newPlan.interval,
      nextBillingDate: newPlan.nextBillingDate,
      features: newPlan.features
    });
    
    // Show success alert (you would implement this)
    console.log("Plan updated successfully:", newPlan);
    
    // You could add a toast notification here
    // toast.success("Your subscription has been updated successfully!");
  };

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Billing & Subscription</h1>
          <p className="text-gray-400">Manage your subscription, payment methods, and billing history</p>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Current Subscription */}
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl font-bold">Current Subscription</CardTitle>
                  <CardDescription>Your current plan and billing details</CardDescription>
                </div>
                <Badge 
                  variant={subscriptionData.status === "active" ? "success" : "outline"}
                  className="uppercase"
                >
                  {subscriptionData.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Plan Info */}
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400">Current Plan</div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-blue-500/20 p-2 mr-3 mt-1">
                        <CreditCard className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-white">{subscriptionData.plan}</div>
                        <div className="text-sm text-gray-400">
                          ${subscriptionData.amount.toFixed(2)} / {subscriptionData.interval}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400">Payment Method</div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-purple-500/20 p-2 mr-3 mt-1">
                        <CreditCard className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {subscriptionData.cardInfo.type} •••• {subscriptionData.cardInfo.last4}
                        </div>
                        <div className="text-sm text-gray-400">
                          Expires {subscriptionData.cardInfo.expiry}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Billing */}
                  <div className="space-y-4">
                    <div className="text-sm text-gray-400">Next Billing</div>
                    <div className="flex items-start">
                      <div className="rounded-full bg-green-500/20 p-2 mr-3 mt-1">
                        <Calendar className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{subscriptionData.nextBillingDate}</div>
                        <div className="text-sm text-gray-400">
                          ${subscriptionData.amount.toFixed(2)} will be charged
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features included */}
                <div className="border-t border-gray-800 pt-4">
                  <div className="text-sm text-gray-400 mb-3">Your subscription includes:</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <div className="text-sm text-gray-400">
                  Need more features or cameras? You can change your plan anytime.
                </div>
                <Button 
                  variant="outline" 
                  className="border-gray-700 space-x-2"
                  onClick={() => setIsEditDialogOpen(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Customize Plan</span>
                </Button>
              </CardFooter>
            </Card>

            {/* Payment Summary & Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Summary Card */}
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>Overview of your current billing cycle</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md border border-gray-800 p-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Subscription fee</span>
                      <span>${subscriptionData.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-400">{subscriptionData.plan} ({subscriptionData.interval})</span>
                      <span>${subscriptionData.amount.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-800 my-3"></div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${subscriptionData.amount.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Next billing on {subscriptionData.nextBillingDate}</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Actions Card */}
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your account and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800 hover:text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    View latest invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800 hover:text-white">
                    <Download className="h-4 w-4 mr-2" />
                    Download tax receipts
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700 hover:bg-gray-800 hover:text-white" onClick={() => setIsPaymentMethodDialogOpen(true)}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update payment method
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-red-900/30 text-red-400 hover:bg-red-900/20 hover:text-red-300">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Cancel subscription
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-6 mt-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </div>
                <Button variant="outline" className="border-gray-700 space-x-2" onClick={() => setIsPaymentMethodDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  <span>Add Payment Method</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-full bg-gray-800 p-2">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium">{method.type} •••• {method.last4}</div>
                          <div className="text-sm text-gray-400">Expires {method.expiry}</div>
                        </div>
                        {method.default && (
                          <Badge variant="outline" className="ml-2">Default</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4 text-gray-400" />
                        </Button>
                        {!method.default && (
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-gray-400" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="history" className="space-y-6 mt-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <Table>
                    <TableHeader className="bg-gray-900">
                      <TableRow className="border-gray-800 hover:bg-gray-900">
                        <TableHead className="text-gray-400">Invoice</TableHead>
                        <TableHead className="text-gray-400">Date</TableHead>
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-right text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptionData.billingHistory.map((invoice) => (
                        <TableRow key={invoice.id} className="border-gray-800 hover:bg-gray-800/50">
                          <TableCell className="font-medium">{invoice.invoice}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={invoice.status === "paid" ? "success" : "outline"}
                              className="uppercase"
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Payment Method Dialog */}
      <Dialog open={isPaymentMethodDialogOpen} onOpenChange={setIsPaymentMethodDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new credit card or payment method
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="1234 5678 9012 3456" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Expiration Date</Label>
                <Input id="card-expiry" placeholder="MM/YY" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input id="card-cvc" placeholder="123" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card-name">Cardholder Name</Label>
              <Input id="card-name" placeholder="John Smith" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billing-address">Billing Address</Label>
              <Input id="billing-address" placeholder="123 Main St" className="bg-gray-800 border-gray-700" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="billing-city">City</Label>
                <Input id="billing-city" placeholder="New York" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billing-zip">ZIP Code</Label>
                <Input id="billing-zip" placeholder="10001" className="bg-gray-800 border-gray-700" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="default-payment"
                className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600"
              />
              <Label htmlFor="default-payment" className="text-sm">Set as default payment method</Label>
            </div>
          </div>
          <DialogFooter className="flex space-x-2 sm:justify-between">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsPaymentMethodDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsPaymentMethodDialogOpen(false)}
            >
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Subscription Dialog with the new component */}
      <EditSubscriptionDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        currentPlan={subscriptionData}
        onSave={handlePlanUpdate}
      />
    </SidebarLayout>
  );
};

export default BillingDashboard;