import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  Users, 
  Calendar,
  CheckCircle 
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Community Street", "Downtown District", "City, State 12345"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Monday - Friday", "9:00 AM - 6:00 PM"],
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@civicspark.org", "volunteer@civicspark.org", "projects@civicspark.org"],
      color: "text-success"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
      color: "text-secondary-foreground"
    }
  ];

  const contactTypes = [
    { value: "general", label: "General Inquiry", icon: MessageCircle },
    { value: "volunteer", label: "Volunteer Opportunity", icon: Users },
    { value: "partnership", label: "Partnership", icon: CheckCircle },
    { value: "event", label: "Event Planning", icon: Calendar }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      type: "general"
    });

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-6 animate-slide-up">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Get In Touch
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold">
              Let's Build Something
              <span className="block gradient-text">Amazing Together</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Have questions, ideas, or want to get involved? We'd love to hear from you. 
              Reach out and let's start a conversation about making a positive impact.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type Selection */}
                  <div className="space-y-3">
                    <Label>What can we help you with?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {contactTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.type === type.value 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:bg-muted'
                          }`}
                        >
                          <input
                            type="radio"
                            name="type"
                            value={type.value}
                            checked={formData.type === type.value}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <type.icon className="w-4 h-4" />
                          <span className="text-sm">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="form-field"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        className="form-field"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help you today?"
                      required
                      className="form-field"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                      className="form-field resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full btn-hero group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="space-y-8 animate-fade-in">
              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="w-12 h-12 text-primary mx-auto" />
                      <h3 className="text-xl font-semibold">Find Us Here</h3>
                      <p className="text-muted-foreground">123 Community Street<br />Downtown District</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Immediate Help?</CardTitle>
                  <CardDescription>
                    For urgent matters or immediate assistance, you can reach us directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Emergency Hotline</div>
                      <div className="text-sm text-muted-foreground">+1 (555) 911-HELP</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Available 9 AM - 6 PM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about getting involved.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I become a volunteer?",
                answer: "Simply fill out our contact form or attend one of our orientation sessions. We'll match you with opportunities that align with your interests and schedule."
              },
              {
                question: "What types of projects are available?",
                answer: "We offer a wide range of projects including environmental initiatives, educational programs, community development, and social services."
              },
              {
                question: "Is there a minimum time commitment?",
                answer: "We welcome volunteers of all availability levels. Whether you have a few hours a week or a full day monthly, there's a way to contribute."
              },
              {
                question: "Do you provide training?",
                answer: "Yes! We provide comprehensive training for all our volunteer positions to ensure you feel confident and prepared to make an impact."
              }
            ].map((faq, index) => (
              <Card key={index} className="card-hover animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;