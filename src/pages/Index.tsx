import Navigation from "@/components/ui/navigation";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import CalendarSection from "@/components/CalendarSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <CalendarSection />
        <ProjectsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
