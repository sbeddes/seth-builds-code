import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import headshotImage from "@/assets/seth-headshot.jpg";

export function HeroSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResume = () => {
    document.querySelector("#resume")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-background/10 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/lovable-uploads/7f4f30b6-460a-4e82-9b54-f32dbcc955ec.png"
              alt="Seth Beddes - Electrical Engineering Student"
              className="w-48 h-48 rounded-full mx-auto mb-6 shadow-elegant border-4 border-primary-foreground/20 object-cover"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
              Seth Beddes
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-6">
              Electrical Engineering Student • AFROTC • Embedded Systems & AI
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Honor student at Utah State University with expertise in embedded systems, 
              control system design, and innovative engineering solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToResume}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-hover transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              View Resume
            </Button>
            <Button
              onClick={scrollToContact}
              variant="secondary"
              size="lg"
              className="shadow-card transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}