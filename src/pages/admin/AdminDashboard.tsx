import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiService } from "@/lib/api";
import { FolderOpen, Calendar, Newspaper, Eye } from "lucide-react";

interface Stats {
  projects: number;
  events: number;
  calendar: number;
  visits: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    events: 0,
    calendar: 0,
    visits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await apiService.getDashboardStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderOpen,
      color: "text-primary",
    },
    {
      title: "Events",
      value: stats.events,
      icon: Newspaper,
      color: "text-accent",
    },
    {
      title: "Calendar Items",
      value: stats.calendar,
      icon: Calendar,
      color: "text-secondary-foreground",
    },
    {
      title: "Website Visits",
      value: stats.visits,
      icon: Eye,
      color: "text-success",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold gradient-text">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your application's key metrics and data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={card.title} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Activity tracking will be implemented based on your specific needs.
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Manage your content directly from the sidebar navigation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;