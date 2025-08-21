import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { typedSupabase } from "@/lib/supabase-client";
import { Eye, TrendingUp, Globe, Clock } from "lucide-react";

interface Visit {
  id: string;
  ip_address: string;
  user_agent: string;
  visited_at: string;
}

interface VisitStats {
  totalVisits: number;
  uniqueIPs: number;
  todayVisits: number;
  thisWeekVisits: number;
}

const AdminStatistics = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    uniqueIPs: 0,
    todayVisits: 0,
    thisWeekVisits: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitsData();
  }, []);

  const fetchVisitsData = async () => {
    try {
      // Fetch all visits
      const { data: allVisits, error } = await typedSupabase
        .from("visits")
        .select("*")
        .order("visited_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      const visits = allVisits || [];
      setVisits(visits);

      // Calculate statistics
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      const uniqueIPs = new Set(visits.map(v => v.ip_address)).size;
      const todayVisits = visits.filter(v => new Date(v.visited_at) >= today).length;
      const thisWeekVisits = visits.filter(v => new Date(v.visited_at) >= weekAgo).length;

      setStats({
        totalVisits: visits.length,
        uniqueIPs,
        todayVisits,
        thisWeekVisits,
      });
    } catch (error) {
      console.error("Error fetching visits:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBrowserFromUserAgent = (userAgent: string) => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Unknown";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold gradient-text">Website Statistics</h1>
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

  const statCards = [
    {
      title: "Total Visits",
      value: stats.totalVisits,
      icon: Eye,
      color: "text-primary",
    },
    {
      title: "Unique Visitors",
      value: stats.uniqueIPs,
      icon: Globe,
      color: "text-accent",
    },
    {
      title: "Today's Visits",
      value: stats.todayVisits,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      title: "This Week",
      value: stats.thisWeekVisits,
      icon: Clock,
      color: "text-secondary-foreground",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Website Statistics</h1>
        <p className="text-muted-foreground">Monitor visitor activity and engagement</p>
      </div>

      {/* Statistics Cards */}
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

      {/* Recent Visits Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Recent Visits</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>IP Address</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>Visit Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visits.slice(0, 20).map((visit) => (
                <TableRow key={visit.id}>
                  <TableCell className="font-mono text-sm">
                    {visit.ip_address || "Unknown"}
                  </TableCell>
                  <TableCell>
                    {visit.user_agent ? getBrowserFromUserAgent(visit.user_agent) : "Unknown"}
                  </TableCell>
                  <TableCell>
                    {new Date(visit.visited_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {visits.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No visits recorded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatistics;