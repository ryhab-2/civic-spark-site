import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, ExternalLink } from "lucide-react";

const NewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const news = [
    {
      id: 1,
      title: "New Community Center Opens in Downtown",
      description: "A state-of-the-art facility offering workshops, meetings, and community events for residents of all ages.",
      category: "community",
      date: "2024-08-15",
      trending: true,
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "The new community center features modern amenities including a tech lab, meeting rooms, and recreational spaces designed to bring neighbors together."
    },
    {
      id: 2,
      title: "Volunteer Program Reaches 1000 Participants",
      description: "Local volunteer initiatives have seen unprecedented growth, with community members stepping up to make a difference.",
      category: "volunteer",
      date: "2024-08-12",
      trending: true,
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "From environmental clean-ups to educational support, volunteers are making measurable impact across all community sectors."
    },
    {
      id: 3,
      title: "Green Initiative Reduces City Carbon Footprint by 30%",
      description: "Community-led environmental programs show remarkable success in promoting sustainable practices.",
      category: "environment",
      date: "2024-08-10",
      trending: false,
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "Solar panel installations, recycling programs, and community gardens contribute to significant environmental improvements."
    },
    {
      id: 4,
      title: "Youth Leadership Program Launches Fall Session",
      description: "Empowering the next generation of community leaders through mentorship and hands-on experience.",
      category: "education",
      date: "2024-08-08",
      trending: true,
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      excerpt: "High school students will participate in civic projects while developing leadership skills and community connections."
    }
  ];

  const trendingNews = news.filter(item => item.trending);

  // Auto-rotate trending news
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingNews.length]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "community": return "bg-primary text-primary-foreground";
      case "volunteer": return "bg-accent text-accent-foreground";
      case "environment": return "bg-success text-success-foreground";
      case "education": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold mb-4">Community News</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed about the latest developments, achievements, and opportunities in our community.
          </p>
        </div>

        {/* Trending News Carousel */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold">Trending Now</h3>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {trendingNews.map((item, index) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Card className="mx-2 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 md:h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white animate-pulse">
                            🔥 Trending
                          </Badge>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center space-x-2 mb-4">
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{item.readTime}</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(item.date)}
                          </span>
                          <Button className="btn-hero group">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {trendingNews.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All News Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Latest Updates</h3>
            <Button variant="outline" className="btn-ghost">
              View All News
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <Card 
                key={item.id} 
                className="card-hover overflow-hidden news-slide"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {item.trending && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white">
                        🔥 Trending
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  <CardDescription className="text-base">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(item.date)}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                      Read More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
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

export default NewsSection;