import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  Home,
  Settings,
  BarChart3,
  Bell,
  ChevronDown,
  Menu,
  X,
  LogOut,
  HelpCircle,
  Camera,
  Users,
  Inbox,
} from "lucide-react";
import bluedoveLogo from "@/assets/bluedove-logo.png";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SidebarLayoutProps {
  children: ReactNode;
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

// Sample user data - in a real app, this would come from auth context or API
const userData = {
  firstName: "hejji",
  lastName: "Amine",
  email: "H.amine@example.com",
  avatar: "https://i.pravatar.cc/150?u=alex",
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors relative",
        active
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation(); // Get current location

  // This will update whenever the route changes
  const currentPath = location.pathname;

  // Toggle sidebar visibility (for mobile responsiveness)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get the page title based on current path
  const getPageTitle = () => {
    switch (currentPath) {
      case "/home":
        return "Home";
      case "/cameras":
        return "Cameras";
      case "/analytics":
        return "Analytics";
      case "/users":
        return "Users";
      case "/notifications":
        return "Notifications";
      case "/inbox":
        return "Inbox";
      case "/settings":
        return "Settings";
      case "/support":
        return "Help & Support";
      default:
        return "";
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-black border-r border-gray-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and close button (for mobile) */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <Link to="/home" className="flex items-center space-x-2">
            <img
              src={bluedoveLogo}
              alt="Bluedove"
              className="h-8 w-auto px-10"
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            <NavItem
              icon={<Home size={20} />}
              label="Home"
              href="/home"
              active={currentPath === "/home"}
            />
            <NavItem
              icon={<Camera size={20} />}
              label="Cameras"
              href="/cameras"
              active={currentPath === "/cameras"}
            />
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Billings"
              href="/billings"
              active={currentPath === "/billings"}
            />
            
          </div>

          <div className="mt-8 border-t border-gray-800 pt-4">
            <div className="space-y-1">
              <NavItem
                icon={<Settings size={20} />}
                label="Settings"
                href="/settings"
                active={currentPath === "/settings"}
              />
              <NavItem
                icon={<HelpCircle size={20} />}
                label="Help & Support"
                href="/support"
                active={currentPath === "/support"}
              />
            </div>
          </div>
        </nav>

        {/* User Profile at bottom of sidebar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center space-x-3 rounded-md px-2 py-2 text-sm hover:bg-gray-800">
                <div className="flex-1 text-left">
                  <p className="font-medium">{`${userData.firstName} ${userData.lastName}`}</p>
                  <p className="text-xs text-gray-400">{userData.email}</p>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-gray-800 text-white border-gray-700"
            >
              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 hover:text-red-400 focus:text-red-400 cursor-pointer">
                <LogOut size={16} className="mr-2" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-gray-800 bg-black px-4 md:px-6 relative">
          <div className="flex h-full items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Page title - shown on larger screens */}
            <h1 className="hidden text-xl font-semibold md:block"> </h1>

            {/* Right side of navbar */}
            <div className="flex items-center space-x-4">
              {/* Notification bell */}
              <button className="relative rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Bell size={20} />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  3
                </span>
              </button>

              {/* User menu - only shown on mobile */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-1 rounded-md p-1 hover:bg-gray-800">
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-gray-800 text-white border-gray-700"
                  >
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700 cursor-pointer">
                      <Settings size={16} className="mr-2" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700 hover:text-red-400 focus:text-red-400 cursor-pointer">
                      <LogOut size={16} className="mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* User info - shown on larger screens */}
              <div className="hidden items-center md:flex">
                <div className="mr-2 text-right">
                  <p className="font-medium">{`${userData.firstName} ${userData.lastName}`}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Animated line at bottom of navbar */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 overflow-hidden flex justify-center">
            {/* <div className="absolute h-full bg-white w-1/4 blur-sm opacity-70"></div> */}
            <div className="absolute h-full bg-white w-1/6 animate-pulse-glow blur-md"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-black p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
