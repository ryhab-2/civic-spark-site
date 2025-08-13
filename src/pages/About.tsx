import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Target, Award, ArrowRight, Lightbulb, Globe, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "2,500+", label: "Active Volunteers" },
    { icon: Heart, value: "150+", label: "Projects Completed" },
    { icon: Target, value: "25", label: "Communities Served" },
    { icon: Award, value: "50+", label: "Awards & Recognition" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe that strong communities are built through collective action and mutual support."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new ideas and technologies to solve complex community challenges."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Our initiatives focus on creating lasting positive impact for future generations."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "We operate with complete transparency and accountability to our community."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "10+ years experience in community development and nonprofit leadership."
    },
    {
      name: "Michael Chen",
      role: "Program Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Passionate about sustainable development and environmental initiatives."
    },
    {
      name: "Emily Rodriguez",
      role: "Volunteer Coordinator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Dedicated to building bridges between volunteers and meaningful opportunities."
    },
    {
      name: "David Kim",
      role: "Technology Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Leading digital innovation to enhance community engagement and impact."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-6 animate-slide-up">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              About CivicSpark
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold">
              Empowering Communities
              <span className="block gradient-text">Through Collective Action</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              CivicSpark connects passionate individuals with meaningful opportunities to create 
              positive change in their communities. Together, we're building a better future for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To foster vibrant, resilient communities by connecting volunteers with impactful 
                opportunities and providing resources for sustainable positive change.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that when people come together with shared purpose, they can overcome 
                any challenge and create lasting improvements in their neighborhoods and beyond.
              </p>
              <Button className="btn-hero group">
                Join Our Mission
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative animate-float">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Community volunteers working together"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and shape our approach to community building.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Dedicated professionals working tirelessly to strengthen our communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6 animate-slide-up">
            <h2 className="text-4xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground">
              Join our community of changemakers and help build a better future for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-hero">
                Become a Volunteer
              </Button>
              <Button size="lg" variant="outline" className="btn-ghost">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;