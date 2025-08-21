import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { typedSupabase } from "@/lib/supabase-client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";

interface CalendarItem {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

const CalendarCrud = () => {
  const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CalendarItem | null>(null);
  const [formData, setFormData] = useState({ title: "", start_date: "", end_date: "" });
  const { toast } = useToast();

  useEffect(() => {
    fetchCalendarItems();
  }, []);

  const fetchCalendarItems = async () => {
    try {
      const { data, error } = await typedSupabase
        .from("calendar")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;
      setCalendarItems(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch calendar items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingItem) {
        const { error } = await typedSupabase
          .from("calendar")
          .update(formData)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast({ title: "Success", description: "Calendar item updated successfully" });
      } else {
        const { error } = await typedSupabase
          .from("calendar")
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Calendar item created successfully" });
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ title: "", start_date: "", end_date: "" });
      fetchCalendarItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save calendar item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: CalendarItem) => {
    setEditingItem(item);
    setFormData({ 
      title: item.title, 
      start_date: item.start_date || "", 
      end_date: item.end_date || "" 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this calendar item?")) return;

    try {
      const { error } = await typedSupabase
        .from("calendar")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Calendar item deleted successfully" });
      fetchCalendarItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete calendar item",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Calendar Management</h1>
          <p className="text-muted-foreground">Manage your calendar events and schedules</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero" onClick={() => {
              setEditingItem(null);
              setFormData({ title: "", start_date: "", end_date: "" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Calendar Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Calendar Item" : "Create New Calendar Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-field"
                  required
                />
              </div>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="form-field"
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  className="form-field"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="btn-hero">
                  {editingItem ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="card-hover">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calendarItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.start_date ? new Date(item.start_date).toLocaleDateString() : "No start date"}
                  </TableCell>
                  <TableCell>
                    {item.end_date ? new Date(item.end_date).toLocaleDateString() : "No end date"}
                  </TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {calendarItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No calendar items found. Create your first calendar item!
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

export default CalendarCrud;