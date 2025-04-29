// src/pages/Settings.tsx
import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Key, 
  Lock, 
  Camera,
  Save,
  AlertCircle
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Sample user data - this would typically come from your API or state management
const userData = {
  id: "u-123456",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  companyName: "Acme Corporation",
  jobTitle: "Product Manager",
  address: {
    street: "123 Business Avenue",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    country: "United States"
  },
  timezone: "America/Los_Angeles",
  language: "English",
  twoFactorEnabled: false,
  avatar: null, // URL to avatar image
  notificationPreferences: {
    emailSummary: true,
    serviceUpdates: true,
    marketingEmails: false,
    securityAlerts: true
  },
  lastLogin: "2025-04-20T15:30:00Z"
};

const Settings: React.FC = () => {
  // State for form values
  const [formValues, setFormValues] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    companyName: userData.companyName,
    jobTitle: userData.jobTitle,
    street: userData.address.street,
    city: userData.address.city,
    state: userData.address.state,
    zipCode: userData.address.zipCode,
    country: userData.address.country,
    timezone: userData.timezone,
    language: userData.language,
  });
  
  // State for password fields
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  // State for notification preferences
  const [notifications, setNotifications] = useState(userData.notificationPreferences);
  
  // State for 2FA
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userData.twoFactorEnabled);
  
  // State for showing the password change dialog
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  // Toast hook for notifications
  const { toast } = useToast();
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle password input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification toggle
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle save profile
  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the user's profile
    console.log("Saving profile:", formValues);
    
    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      variant: "success",
    });
  };
  
  // Handle save password
  const handleSavePassword = () => {
    // Validation
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordValues.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would make an API call to update the password
    console.log("Saving password");
    
    // Close dialog and reset form
    setPasswordDialogOpen(false);
    setPasswordValues({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
    // Show success toast
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
      variant: "success",
    });
  };
  
  // Handle save notification preferences
  const handleSaveNotifications = () => {
    // Here you would make an API call to update notification preferences
    console.log("Saving notification preferences:", notifications);
    
    // Show success toast
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
      variant: "success",
    });
  };
  
  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Account Settings</h1>
          <p className="text-gray-400">Manage your account information and preferences</p>
        </div>
        
        {/* Content Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            {/* Personal Info Card */}
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
                <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center relative overflow-hidden">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-gray-500" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <User className="h-4 w-4" />
                      </span>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <User className="h-4 w-4" />
                      </span>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Contact info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Mail className="h-4 w-4" />
                      </span>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Company info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        <Building className="h-4 w-4" />
                      </span>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formValues.companyName}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={formValues.jobTitle}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Address */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Address Information</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <Input
                          id="street"
                          name="street"
                          value={formValues.street}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formValues.city}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formValues.state}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formValues.zipCode}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formValues.country}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-800" />
                
                {/* Preferences */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          <Globe className="h-4 w-4" />
                        </span>
                        <Input
                          id="timezone"
                          name="timezone"
                          value={formValues.timezone}
                          onChange={handleInputChange}
                          className="bg-gray-800 border-gray-700 pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Input
                        id="language"
                        name="language"
                        value={formValues.language}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-800 pt-6 flex justify-between">
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(userData.lastLogin).toLocaleString()}
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 mt-6">
            {/* Password Card */}
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Password &amp; Security</CardTitle>
                <CardDescription>Manage your password and account security settings</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-800 p-2 mr-4">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Password</h3>
                      <p className="text-sm text-gray-400">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-gray-700" onClick={() => setPasswordDialogOpen(true)}>
                    Change Password
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-800 p-2 mr-4">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-400">
                        {twoFactorEnabled ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled} 
                  />
                </div>
                
                
              </CardContent>
            </Card>
            
            {/* Account Activity Card */}
           
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you receive notifications</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Summary</h3>
                      <p className="text-sm text-gray-400">Receive a weekly summary of account activity</p>
                    </div>
                    <Switch 
                      checked={notifications.emailSummary} 
                      onCheckedChange={(checked) => handleNotificationChange('emailSummary', checked)} 
                    />
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Service Updates</h3>
                      <p className="text-sm text-gray-400">Get notified about important service changes and updates</p>
                    </div>
                    <Switch 
                      checked={notifications.serviceUpdates} 
                      onCheckedChange={(checked) => handleNotificationChange('serviceUpdates', checked)} 
                    />
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-400">Receive promotional content and special offers</p>
                    </div>
                    <Switch 
                      checked={notifications.marketingEmails} 
                      onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)} 
                    />
                  </div>
                  
                  <Separator className="bg-gray-800" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Security Alerts</h3>
                      <p className="text-sm text-gray-400">Get notified about suspicious activity and security events</p>
                    </div>
                    <Switch 
                      checked={notifications.securityAlerts} 
                      onCheckedChange={(checked) => handleNotificationChange('securityAlerts', checked)} 
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="border-t border-gray-800 pt-6">
                <Button className="bg-blue-600 hover:bg-blue-700 ml-auto" onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your current password and a new password
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordValues.currentPassword}
                onChange={handlePasswordChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordValues.newPassword}
                onChange={handlePasswordChange}
                className="bg-gray-800 border-gray-700"
              />
              <p className="text-xs text-gray-400">
                Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordValues.confirmPassword}
                onChange={handlePasswordChange}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2">
            <Button
              variant="outline"
              className="border-gray-700 hover:bg-gray-800 hover:text-white"
              onClick={() => setPasswordDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSavePassword}
            >
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarLayout>
  );
};

export default Settings;