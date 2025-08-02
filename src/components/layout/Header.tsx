import { Bell, MoreHorizontal, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "battles", label: "Battles", icon: "⚔️" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "create", label: "Create", icon: "➕" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold gradient-text">Tipverse</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? "bg-primary text-primary-foreground shadow-glow" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Wallet Info */}
            <div className="hidden sm:flex items-center space-x-2 bg-secondary/50 rounded-lg px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-sm font-medium">0x1234...5678</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* More Menu */}
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>

            {/* User Avatar */}
            <Avatar className="w-8 h-8 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center py-3 border-t border-border">
          <nav className="flex items-center space-x-1 w-full max-w-md">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="ml-1 text-xs">{tab.label}</span>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};