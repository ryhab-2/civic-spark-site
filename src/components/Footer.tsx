import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Get Involved": [
      { label: "Volunteer Opportunities", href: "/volunteer" },
      { label: "Upcoming Events", href: "/events" },
      { label: "Start a Project", href: "/projects/new" },
      { label: "Donate", href: "/donate" }
    ],
    "About": [
      { label: "Our Mission", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Impact Stories", href: "/stories" },
      { label: "Annual Report", href: "/reports" }
    ],
    "Resources": [
      { label: "Volunteer Guide", href: "/guide" },
      { label: "Training Materials", href: "/training" },
      { label: "Community Forum", href: "/forum" },
      { label: "FAQ", href: "/faq" }
    ],
    "Support": [
      { label: "Contact Us", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/civicspark", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/civicspark", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/civicspark", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/civicspark", label: "LinkedIn" }
  ];

  const contactInfo = [
    { icon: MapPin, text: "123 Community Street, Downtown District" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "hello@civicspark.org" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-2xl">CivicSpark</span>
            </Link>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Empowering communities through collective action. Join thousands of volunteers 
              making a real difference in neighborhoods across the city.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-primary-foreground/80">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-lg">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Connected</h3>
              <p className="text-primary-foreground/80">
                Get the latest updates on volunteer opportunities and community impact stories.
              </p>
            </div>
            <div className="flex space-x-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-primary-foreground/80 text-sm">
              <span>© {currentYear} CivicSpark. All rights reserved.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for our community</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;