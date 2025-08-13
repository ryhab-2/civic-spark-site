import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight, Filter } from "lucide-react";

const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Community Garden Initiative",
      description: "Transform vacant lots into thriving community gardens that provide fresh produce and bring neighbors together.",
      status: "ongoing",
      category: "environment",
      location: "Downtown District",
      volunteers: 23,
      deadline: "2024-08-30",
      progress: 75,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isNew: false
    },
    {
      id: 2,
      title: "Digital Literacy for Seniors",
      description: "Help senior citizens learn essential digital skills through one-on-one tutoring sessions.",
      status: "ongoing",
      category: "education",
      location: "Various Centers",
      volunteers: 15,
      deadline: "2024-09-15",
      progress: 45,
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 3,
      title: "Youth Mentorship Program",
      description: "Connect with local youth to provide guidance, support, and career development opportunities.",
      status: "new",
      category: "education",
      location: "High Schools",
      volunteers: 8,
      deadline: "2024-08-25",
      progress: 20,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isNew: true
    },
    {
      id: 4,
      title: "Clean Energy Awareness",
      description: "Organize workshops and events to promote renewable energy adoption in local communities.",
      status: "new",
      category: "environment",
      location: "Community Centers",
      volunteers: 12,
      deadline: "2024-09-01",
      progress: 10,
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isNew: true
    }
  ];

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "environment", label: "Environment" },
    { value: "education", label: "Education" },
    { value: "community", label: "Community" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const ongoingProjects = projects.filter(p => p.status === "ongoing");
  const newProjects = projects.filter(p => p.status === "new");

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Active Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover meaningful ways to make a difference in your community. 
            From environmental initiatives to educational programs, find the perfect project for you.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between mb-12 gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Filter by:</span>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={filter === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category.value)}
                className="transition-all duration-200"
              >
                {category.label}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="btn-ghost">
            View All Projects
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Ongoing Projects Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
            Ongoing Projects
          </h3>
          <div className="project-grid">
            {ongoingProjects.map((project, index) => (
              <Card key={project.id} className="project-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      {project.progress}% Complete
                    </Badge>
                  </div>
                  {project.isNew && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground">New</Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.volunteers} volunteers</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 btn-hero">Join Project</Button>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* New Projects Section */}
        <div>
          <h3 className="text-2xl font-bold mb-8 flex items-center">
            <span className="w-3 h-3 bg-accent rounded-full mr-3"></span>
            New Projects
          </h3>
          <div className="project-grid">
            {newProjects.map((project, index) => (
              <Card key={project.id} className="project-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground animate-pulse">
                      New Project
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90">
                      {project.progress}% Complete
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.volunteers} volunteers</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button className="flex-1 btn-hero">Be First to Join</Button>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;