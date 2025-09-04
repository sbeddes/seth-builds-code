import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities, collaborations, 
              or innovative engineering projects. Let's connect!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a 
                      href="mailto:sbeddes03@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      sbeddes03@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a 
                      href="tel:+12085401342"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (208) 540-1342
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold mb-4">Professional Profiles</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="shadow-card">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="shadow-card">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Message */}
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-primary">Quick Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Interested in my work or have a project in mind? I'd love to hear from you. 
                  Whether it's about embedded systems, engineering opportunities, or collaborative projects, 
                  don't hesitate to reach out.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full shadow-elegant"
                    onClick={() => window.location.href = 'mailto:sbeddes03@gmail.com?subject=Portfolio Inquiry'}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full shadow-card"
                    onClick={() => window.location.href = 'tel:+12085401342'}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Me
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                  <strong>Current Status:</strong> Open to internship opportunities and 
                  collaborative engineering projects. Expected graduation: May 2027.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}