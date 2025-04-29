// src/pages/HelpSupportPage.tsx
import React, { useState } from "react";
import {
  HelpCircle,
  FileText,
  MessageSquare,
  PhoneCall,
  Video,
  Send,
  ArrowRight,
  Clock,
  Users,
  CheckCircle,
  Search,
  BookOpen,
  Mail,
  PenTool,
  Star,
  AlertTriangle,
  LifeBuoy,
  
  ChevronRight,
  DownloadCloud,
  ExternalLink
} from "lucide-react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { ToastContainer } from "@/components/ui/use-toast";

// FAQ Data
const faqData = [
  {
    id: "faq-1",
    question: "How do I set up AI features for my cameras?",
    answer: "To set up AI features for your cameras, navigate to the 'Settings' page and select 'Camera Management'. From there, click on the camera you want to configure, select the 'AI Features' tab, and choose the features you want to enable. Once you've made your selections, click 'Save' to apply the changes."
  },
  {
    id: "faq-2",
    question: "What is the recommended camera resolution for optimal AI performance?",
    answer: "For optimal AI performance, we recommend using cameras with at least 1080p (1920x1080) resolution. Higher resolution cameras (2K or 4K) will provide even better results for detailed analysis like facial recognition and object counting, but will require more bandwidth and storage."
  },
  {
    id: "faq-3",
    question: "How can I upgrade my subscription plan?",
    answer: "To upgrade your subscription plan, go to the 'Billing & Subscription' page and click on 'Customize Plan'. From there, you can select additional AI features, increase your camera count, or upgrade your storage and support options. Once you've made your selections, click 'Save Changes' to update your subscription."
  },
  {
    id: "faq-4",
    question: "What storage options are available for my camera footage?",
    answer: "We offer three storage tiers: 7-day retention ($49/month), 30-day retention ($99/month), and 90-day retention ($199/month). You can select your preferred storage option when configuring your subscription. All footage is stored securely in the cloud and is accessible for the duration of your selected retention period."
  },
  {
    id: "faq-5",
    question: "Is my camera data secure and private?",
    answer: "Yes, security and privacy are our top priorities. All camera data is encrypted both in transit and at rest. We employ industry-standard security practices and regularly undergo security audits. You retain full ownership of your data, and it's never shared with third parties without your explicit consent."
  },
  {
    id: "faq-6",
    question: "Can I export analytics data from the platform?",
    answer: "Yes, you can export analytics data in various formats including CSV, Excel, and PDF reports. Navigate to the 'Analytics' section, select the date range and metrics you're interested in, and click on the 'Export' button to download your data."
  },
];

// Documentation topics
const docTopics = [
  {
    id: "doc-1",
    title: "Getting Started Guide",
    description: "Set up your account and configure your first camera",
    icon: <BookOpen className="h-5 w-5" />,
    url: "/docs/getting-started"
  },
  {
    id: "doc-2",
    title: "AI Feature Documentation",
    description: "Learn about the different AI capabilities",
    icon: <FileText className="h-5 w-5" />,
    url: "/docs/ai-features"
  },
  {
    id: "doc-3",
    title: "Analytics & Reporting",
    description: "Making sense of your data and insights",
    icon: <PenTool className="h-5 w-5" />,
    url: "/docs/analytics"
  },
  {
    id: "doc-4",
    title: "Camera Management",
    description: "Add, remove, and configure your cameras",
    icon: <Video className="h-5 w-5" />,
    url: "/docs/camera-management"
  },
  {
    id: "doc-5",
    title: "User & Admin Guide",
    description: "Managing users, roles, and permissions",
    icon: <Users className="h-5 w-5" />,
    url: "/docs/user-management"
  },
  {
    id: "doc-6",
    title: "API Integration",
    description: "Connect our platform with your existing systems",
    icon: <ExternalLink className="h-5 w-5" />,
    url: "/docs/api-integration"
  },
];

// Support contact form
const HelpSupportPage: React.FC = () => {
  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "normal"
  });
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  
  // Toast hook
  const { toast } = useToast();
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle contact form submission
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    
    // Show success toast
    toast({
      title: "Support Request Sent",
      description: "We've received your message and will respond shortly.",
      variant: "success",
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "normal"
    });
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    
    // Show info toast
    toast({
      title: "Search Results",
      description: `Showing results for "${searchQuery}"`,
      variant: "default",
    });
  };
  
  // Filter FAQs based on search
  const filteredFAQs = searchQuery
    ? faqData.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;
  
  return (
    <ToastContainer>
      <SidebarLayout>
        <div className="space-y-6 pb-8">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Help & Support</h1>
            <p className="text-gray-400">Find answers, documentation, and support resources</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for help, tutorials, and documentation..."
                  className="bg-gray-800 border-gray-700 pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
          
          {/* Support Tabs */}
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="docs">Documentation</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
            </TabsList>
            
            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6 mt-6">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.length > 0 ? (
                      filteredFAQs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border-gray-800">
                          <AccordionTrigger className="text-left hover:text-blue-400">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <HelpCircle className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <h3 className="text-lg font-medium">No matching questions</h3>
                        <p className="text-gray-400 mt-1">Try adjusting your search term</p>
                      </div>
                    )}
                  </Accordion>
                </CardContent>
                <CardFooter className="border-t border-gray-800 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <p className="text-sm text-gray-400">
                    Didn't find what you're looking for?
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="border-gray-700"
                      onClick={() => {
                        document.querySelector('[data-value="docs"]')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Browse Documentation
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        document.querySelector('[data-value="contact"]')?.dispatchEvent(
                          new MouseEvent('click', { bubbles: true })
                        );
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Popular Topics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 mr-2" />
                      Getting Started
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Setting up your first camera</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Connecting to existing systems</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Initial configuration guide</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
                      Troubleshooting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Connection issues</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Video quality problems</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">AI feature accuracy</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <LifeBuoy className="h-5 w-5 text-blue-400 mr-2" />
                      Account & Billing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Subscription management</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Billing cycles and invoices</a>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                        <a href="#" className="text-blue-400 hover:underline">Payment methods</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Documentation Tab */}
            <TabsContent value="docs" className="space-y-6 mt-6">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Browse guides, tutorials, and reference materials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {docTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="rounded-lg border border-gray-800 bg-gray-900/40 p-4 transition-all hover:border-gray-700 hover:bg-gray-900/60"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 rounded-full bg-gray-800 p-2 text-gray-400">
                            {topic.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{topic.title}</h3>
                            <p className="mt-1 text-sm text-gray-400">
                              {topic.description}
                            </p>
                            <a
                              href={topic.url}
                              className="mt-2 inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                            >
                              Read more
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6 bg-gray-800" />
                  
                  {/* Latest Updates */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Latest Documentation Updates</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 rounded-full bg-blue-500/20 p-1">
                          <FileText className="h-4 w-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Advanced Camera Placement Guidelines</p>
                          <p className="text-sm text-gray-400">Tips and best practices for optimal AI performance</p>
                          <p className="text-xs text-gray-500 mt-1">Updated April 15, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 rounded-full bg-purple-500/20 p-1">
                          <FileText className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">Customer Journey Analytics Guide</p>
                          <p className="text-sm text-gray-400">Learn how to track and analyze customer flow</p>
                          <p className="text-xs text-gray-500 mt-1">Updated April 10, 2025</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 rounded-full bg-green-500/20 p-1">
                          <FileText className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">API Reference Documentation</p>
                          <p className="text-sm text-gray-400">Complete API endpoints and usage examples</p>
                          <p className="text-xs text-gray-500 mt-1">Updated April 5, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-gray-800 flex items-center">
                  <Button variant="outline" className="border-gray-700">
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Download PDF Documentation
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6 mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Contact Form */}
                <div className="md:col-span-2">
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Contact Support</CardTitle>
                      <CardDescription>Send us a message and we'll get back to you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitContact} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={contactForm.name}
                              onChange={handleInputChange}
                              className="bg-gray-800 border-gray-700"
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={contactForm.email}
                              onChange={handleInputChange}
                              className="bg-gray-800 border-gray-700"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={contactForm.message}
                            onChange={handleInputChange}
                            className="bg-gray-800 border-gray-700 min-h-[150px]"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <select
                            id="priority"
                            name="priority"
                            value={contactForm.priority}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                          >
                            <option value="low">Low - General Question</option>
                            <option value="normal">Normal - Support Request</option>
                            <option value="high">High - Urgent Issue</option>
                            <option value="critical">Critical - System Down</option>
                          </select>
                        </div>
                        
                        <div className="pt-3">
                          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-6">
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Other ways to get in touch</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-gray-800 p-2">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-sm text-gray-400 mt-1">
                            <a href="mailto:support@zark.ai" className="text-blue-400 hover:underline">
                              support@zark.ai
                            </a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-gray-800 p-2">
                          <PhoneCall className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-gray-400 mt-1">+1 (800) 555-1234</p>
                          <p className="text-xs text-gray-500">Mon-Fri, 9am-6pm ET</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-gray-800 p-2">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Live Chat</h3>
                          <p className="text-sm text-gray-400 mt-1">Available on the bottom right of your dashboard</p>
                          <Button variant="outline" className="mt-2 border-gray-700">
                            Start Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Support Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Standard Support</span>
                        <span>Mon-Fri, 9am-6pm GMT+1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Premium Support</span>
                        <span>24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Emergency Line</span>
                        <span>24/7</span>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-800">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-sm text-green-400">Support is currently OPEN</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Expected response time: 1-2 hours
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              
              
              {/* Community Help */}
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Community Resources</CardTitle>
                  <CardDescription>Connect with other users and experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <a 
                      href="#" 
                      className="block rounded-lg border border-gray-800 p-5 transition-all hover:border-gray-700 hover:bg-gray-800/30"
                    >
                      <div className="flex items-center mb-3">
                        <Users className="h-5 w-5 text-blue-400 mr-2" />
                        <h3 className="font-medium">Community Forum</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        Ask questions, share tips, and connect with other users in our active community forums.
                      </p>
                      <p className="mt-3 text-sm text-blue-400 hover:underline">Visit the forums →</p>
                    </a>
                    
                    <a 
                      href="#" 
                      className="block rounded-lg border border-gray-800 p-5 transition-all hover:border-gray-700 hover:bg-gray-800/30"
                    >
                      <div className="flex items-center mb-3">
                        <Video className="h-5 w-5 text-red-400 mr-2" />
                        <h3 className="font-medium">Tutorial Videos</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        Watch step-by-step tutorials and learn how to get the most out of our platform.
                      </p>
                      <p className="mt-3 text-sm text-blue-400 hover:underline">Watch tutorials →</p>
                    </a>
                    
                    <a 
                      href="#" 
                      className="block rounded-lg border border-gray-800 p-5 transition-all hover:border-gray-700 hover:bg-gray-800/30"
                    >
                      <div className="flex items-center mb-3">
                        <BookOpen className="h-5 w-5 text-green-400 mr-2" />
                        <h3 className="font-medium">Knowledge Base</h3>
                      </div>
                      <p className="text-sm text-gray-400">
                        Browse our extensive library of articles, guides, and best practices.
                      </p>
                      <p className="mt-3 text-sm text-blue-400 hover:underline">Explore knowledge base →</p>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarLayout>
    </ToastContainer>
  );
};

export default HelpSupportPage;