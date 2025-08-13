import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="hero-section pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* Left Column - Content */}
          <div className="text-white space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Building Stronger
                <span className="block gradient-text">Communities</span>
                Together
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                Join thousands of volunteers making a real difference in our communities. 
                From local initiatives to city-wide projects, every contribution matters.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-hero group">
                Get Involved Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="btn-ghost">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">2.5K+</div>
                <div className="text-sm text-white/80">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">150+</div>
                <div className="text-sm text-white/80">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-2 mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white">25</div>
                <div className="text-sm text-white/80">Communities Served</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-float">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Community volunteers working together"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Impact Score</div>
                    <div className="text-sm text-muted-foreground">Community Rating: 4.9/5</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-10 -right-4 bg-white/90 rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-sm font-semibold text-foreground">Active Projects</div>
              <div className="text-2xl font-bold text-primary">42</div>
            </div>
            
            <div className="absolute bottom-20 -right-8 bg-white/90 rounded-lg p-4 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-sm font-semibold text-foreground">This Month</div>
              <div className="text-lg font-bold text-success">+28 Volunteers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;