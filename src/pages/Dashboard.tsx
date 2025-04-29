import React from "react";
import SidebarLayout from "@/components/SidebarLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Camera, CameraOff, Clock, TrendingUp, Users } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Amine</h1>
          <p className="text-gray-400">Here's what's happening with your cameras today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Active Cameras */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Cameras</p>
                  <h3 className="text-3xl font-bold text-white">18</h3>
                </div>
                <div className="rounded-full bg-blue-500/20 p-3">
                  <Camera className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>3 more than yesterday</span>
              </div>
            </CardContent>
          </Card>

          {/* Offline Cameras */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Offline Cameras</p>
                  <h3 className="text-3xl font-bold text-white">2</h3>
                </div>
                <div className="rounded-full bg-red-500/20 p-3">
                  <CameraOff className="h-6 w-6 text-red-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-red-400">
                <Clock className="mr-1 h-3 w-3" />
                <span>1 offline for 24 hours</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Visitors */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Visitors</p>
                  <h3 className="text-3xl font-bold text-white">1,254</h3>
                </div>
                <div className="rounded-full bg-green-500/20 p-3">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-green-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>12% increase this week</span>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Analytics</p>
                  <h3 className="text-3xl font-bold text-white">85%</h3>
                </div>
                <div className="rounded-full bg-purple-500/20 p-3">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-400">
                <span>Processing accuracy</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <CardDescription>The latest activity from your camera network.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Event items */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-lg border border-gray-800 p-3">
                  <div className="rounded-md bg-blue-500/20 p-2">
                    <Camera className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">Motion Detected</h4>
                      <span className="text-xs text-gray-400">
                        {`${Math.floor(Math.random() * 60)} min ago`}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400">
                      Camera {index + 1} detected motion in Zone A
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Camera Status Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Active Cameras */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Camera Status</CardTitle>
              <CardDescription>Overview of your camera network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border border-gray-800 px-4 py-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          index < 5 ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span>Camera {index + 1}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {index < 5 ? "Online" : "Offline"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Insights */}
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Analytics Insights</CardTitle>
              <CardDescription>Key metrics from your AI analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "People Counting", value: "1,254 visitors" },
                  { name: "Occupancy Rate", value: "73% average" },
                  { name: "Dwell Time", value: "14 min average" },
                  { name: "Peak Hours", value: "2-4 PM" },
                  { name: "Repeat Visitors", value: "32% of total" },
                  { name: "Conversion Rate", value: "24% purchase" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border border-gray-800 px-4 py-3"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-blue-400">{item.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default DashboardPage;