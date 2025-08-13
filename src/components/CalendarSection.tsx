import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Community Clean-up Day",
      date: "2024-08-20",
      time: "09:00 AM",
      location: "Central Park",
      type: "volunteer",
      participants: 45,
      description: "Join us for our monthly community clean-up initiative."
    },
    {
      id: 2,
      title: "Digital Skills Workshop",
      date: "2024-08-22",
      time: "02:00 PM",
      location: "Community Center",
      type: "training",
      participants: 20,
      description: "Learn essential digital skills for modern life."
    },
    {
      id: 3,
      title: "Youth Mentorship Meetup",
      date: "2024-08-25",
      time: "10:00 AM",
      location: "High School Auditorium",
      type: "meeting",
      participants: 30,
      description: "Monthly meetup for mentors and mentees."
    },
    {
      id: 4,
      title: "Green Energy Fair",
      date: "2024-08-28",
      time: "11:00 AM",
      location: "City Hall",
      type: "event",
      participants: 100,
      description: "Explore renewable energy solutions for our community."
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "volunteer": return "bg-primary text-primary-foreground";
      case "training": return "bg-accent text-accent-foreground";
      case "meeting": return "bg-secondary text-secondary-foreground";
      case "event": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateString);
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentDate.getMonth() && 
                        selectedDate.getFullYear() === currentDate.getFullYear();
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentDate.getMonth() && 
                     new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`p-2 cursor-pointer rounded-lg transition-all duration-200 hover:bg-muted ${
            isSelected ? 'bg-primary text-primary-foreground' : 
            isToday ? 'bg-accent text-accent-foreground' : ''
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className="text-center">
            <div className="font-medium">{day}</div>
            {dayEvents.length > 0 && (
              <div className="flex justify-center mt-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() && 
           eventDate.getFullYear() === selectedDate.getFullYear();
  });

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay connected with our community events, volunteer opportunities, and training sessions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <Card className="calendar-container animate-scale-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-1">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events for Selected Date */}
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold">
              Events for {formatDate(selectedDate)}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event, index) => (
                  <Card key={event.id} className="card-hover animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold mb-2">{event.title}</h4>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.participants} attending</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button className="btn-hero">Join Event</Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="card-hover">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">No events scheduled</h4>
                  <p className="text-muted-foreground">
                    Check other dates or create a new event for this day.
                  </p>
                  <Button className="mt-4 btn-hero">Create Event</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;