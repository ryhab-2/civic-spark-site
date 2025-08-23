import { useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, LayoutDashboard, FolderOpen, Calendar, Newspaper, BarChart3, LogOut } from "lucide-react";

const AdminLayout = () => {
  const { admin, loading, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [loading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FolderOpen, label: "Projects", path: "/admin/projects" },
    { icon: Calendar, label: "Calendar", path: "/admin/calendar" },
    { icon: Newspaper, label: "Events", path: "/admin/events" },
    { icon: BarChart3, label: "Statistics", path: "/admin/statistics" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex">
      {/* Sidebar */}
      <div className="w-64 bg-card/95 backdrop-blur-sm border-r border-border shadow-elegant">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
          <div className="text-xs text-muted-foreground mt-1">
            {admin?.email}
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start transition-all hover:translate-x-1"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;