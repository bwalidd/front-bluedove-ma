import React, { useState } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Filter,
  Grid,
  List,
  CameraOff,
  Settings,
  Map,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample camera data
const cameras = [
  {
    id: 1,
    name: "Front Entrance",
    location: "Building A",
    status: "online",
    lastActive: "2 min ago",
    type: "HD 1080p",
    features: ["People Counting", "Theft Detection"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
  {
    id: 2,
    name: "Parking Lot",
    location: "East Wing",
    status: "online",
    lastActive: "1 min ago",
    type: "HD 1080p",
    features: ["People Counting", "Object Detection"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
  {
    id: 3,
    name: "Back Door",
    location: "Building B",
    status: "online",
    lastActive: "Just now",
    type: "4K Ultra HD",
    features: ["Face Recognition", "People Counting"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
  {
    id: 4,
    name: "Warehouse",
    location: "Storage Area",
    status: "offline",
    lastActive: "2 hours ago",
    type: "HD 1080p",
    features: ["Object Counting", "Emotion Analysis"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
  {
    id: 5,
    name: "Meeting Room A",
    location: "2nd Floor",
    status: "online",
    lastActive: "5 min ago",
    type: "HD 1080p",
    features: ["People Counting", "Emotion Analysis"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
  {
    id: 6,
    name: "Reception Desk",
    location: "Main Hall",
    status: "online",
    lastActive: "Just now",
    type: "4K Ultra HD",
    features: ["Face Recognition", "Smart Advertising"],
    thumbnail: "https://sirixmonitoring.com/wp-content/uploads/2024/07/image-232-1024x527.jpeg",
  },
];

const CamerasPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter cameras based on search query
  const filteredCameras = cameras.filter(camera => 
    camera.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    camera.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-white">Cameras</h1>
            <p className="text-gray-400">Manage and monitor your camera network</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Camera
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input 
              placeholder="Search cameras..." 
              className="pl-10 bg-gray-900 border-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="border-gray-800 text-gray-400 hover:text-white">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-800 text-gray-400 hover:text-white">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <div className="flex items-center rounded-md border border-gray-800 bg-gray-900">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-r-none ${viewMode === "grid" ? "bg-gray-800" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-l-none ${viewMode === "list" ? "bg-gray-800" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="all">All Cameras</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
            {/* <TabsTrigger value="groups">Camera Groups</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCameras.map((camera) => (
                  <Card key={camera.id} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
                    <div className="relative">
                      <img 
                        src={camera.thumbnail} 
                        alt={camera.name} 
                        className="h-40 w-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <Badge 
                          className={camera.status === "online" 
                            ? "bg-green-500" 
                            : "bg-red-500"
                          }
                        >
                          {camera.status}
                        </Badge>
                      </div>
                      <div className="absolute right-2 top-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="bg-gray-900/70 hover:bg-gray-900 h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                              <Settings className="mr-2 h-4 w-4" />
                              <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 hover:text-red-400 focus:text-red-400 cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-white">{camera.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-400">
                        <Map className="mr-1 h-3 w-3" />
                        {camera.location}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {camera.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-400">
                        Active: {camera.lastActive}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-2">
                {filteredCameras.map((camera) => (
                  <Card key={camera.id} className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`${camera.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'} p-2 rounded-full`}>
                            {camera.status === 'online' ? (
                              <Camera className={`h-5 w-5 ${camera.status === 'online' ? 'text-green-400' : 'text-red-400'}`} />
                            ) : (
                              <CameraOff className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{camera.name}</h3>
                            <div className="flex items-center text-sm text-gray-400">
                              <Map className="mr-1 h-3 w-3" />
                              {camera.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="hidden text-right md:block">
                            <div className="text-sm text-white">{camera.type}</div>
                            <div className="text-xs text-gray-400">Active: {camera.lastActive}</div>
                          </div>
                          <Badge 
                            className={camera.status === "online" 
                              ? "bg-green-500" 
                              : "bg-red-500"
                            }
                          >
                            {camera.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
                              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 hover:text-red-400 focus:text-red-400 cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="online" className="mt-4">
            {/* Online cameras content - implement similar to "all" but filtered */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
              <h3 className="text-lg font-medium text-white">Online Cameras View</h3>
              <p className="mt-2 text-gray-400">
                This tab would show only online cameras (filtered from the main list)
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="offline" className="mt-4">
            {/* Offline cameras content */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
              <h3 className="text-lg font-medium text-white">Offline Cameras View</h3>
              <p className="mt-2 text-gray-400">
                This tab would show only offline cameras (filtered from the main list)
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="groups" className="mt-4">
            {/* Camera groups content */}
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 text-center">
              <h3 className="text-lg font-medium text-white">Camera Groups View</h3>
              <p className="mt-2 text-gray-400">
                This tab would show cameras organized by groups/locations
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default CamerasPage;