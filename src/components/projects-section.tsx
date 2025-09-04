import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import agduinoImage from "@/assets/agduino-project.jpg";
import requiemShieldImage from "@/assets/requiem-shield-project.jpg";
import droneImage from "@/assets/drone-project.jpg";

const projects = [
  {
    id: "agduino",
    title: "AgDuino – Smart Greenhouse Monitoring",
    description: "Arduino-based soil monitoring system with real-time data logging and plant-specific moisture targeting.",
    image: agduinoImage,
    highlights: [
      "Arduino Nano + DS3231 RTC for precise timing control",
      "Capacitive soil moisture sensors with VWC comparison",
      "Custom CSV logging system with headers and precision control",
      "Real-time monitoring with per-plant moisture targets"
    ],
    techStack: ["Arduino", "C++", "Sensors", "CSV", "RTC", "SD Card"],
    links: {
      github: "#",
      demo: "#"
    },
    details: `The AgDuino project represents a comprehensive approach to smart agriculture, 
    combining precision electronics with practical farming needs. The system uses Arduino Nano 
    as the central processing unit, paired with a DS3231 Real-Time Clock for accurate timestamp 
    logging. Capacitive soil moisture sensors provide reliable, non-corrosive measurements that 
    compare actual Volumetric Water Content (VWC) against plant-specific targets.

    The custom CSV logging system ensures data integrity with proper headers, precision control, 
    and file verification checks. This allows for long-term data analysis and trend monitoring 
    for optimal crop management. The modular design makes it easily adaptable for different 
    greenhouse configurations and plant types.`
  },
  {
    id: "requiem-shield",
    title: "Requiem Shield – Pi-hole Appliance",
    description: "Plug-and-play network security appliance with OLED display and companion iOS app for DNS filtering management.",
    image: requiemShieldImage,
    highlights: [
      "Raspberry Pi with 0.96″ SSD1306 OLED display interface",
      "Single-button navigation (GPIO21) with intuitive menu system",
      "Real-time Pi-hole stats, system info, and internet speed monitoring",
      "Companion iOS app built with Capacitor for remote management"
    ],
    techStack: ["Raspberry Pi", "Python", "Pi-hole", "GPIO", "OLED", "Swift", "Capacitor"],
    links: {
      github: "#",
      demo: "#"
    },
    details: `Requiem Shield transforms network security into a user-friendly appliance experience. 
    Built on Raspberry Pi foundation, it combines Pi-hole's powerful DNS filtering with an 
    intuitive OLED interface for local monitoring and control.

    The single-button navigation system uses GPIO21 for menu traversal, with long-press 
    functionality triggering live speed tests. Multiple screens display Pi-hole statistics, 
    system health information, and real-time internet performance metrics.

    The companion iOS application, developed using Capacitor framework with native Swift 
    components, enables remote statistics viewing and gravity list management. This creates 
    a seamless user experience across both local hardware interface and mobile device control.`
  },
  {
    id: "drone",
    title: "Homemade Quadcopter – ESP32 Flight Control",
    description: "Custom-built quadcopter with ESP32-based flight controller, IMU integration, and PS4 controller input.",
    image: droneImage,
    highlights: [
      "QT Py ESP32 with MPU6050 IMU and complementary filter implementation",
      "Dynamic bias correction for improved flight stability",
      "Dual DRV8833 motor controllers driving four 3V coreless motors",
      "PS4 controller integration for responsive flight control"
    ],
    techStack: ["ESP32", "IMU", "PWM", "Motor Drivers", "C/C++", "Bluetooth"],
    links: {
      github: "#",
      video: "#"
    },
    details: `This homemade quadcopter project demonstrates advanced embedded systems integration 
    and real-time control algorithms. The QT Py ESP32 serves as the flight controller, 
    processing IMU data from the MPU6050 through a complementary filter with dynamic bias correction.

    The flight control system implements sophisticated stabilization algorithms to counteract 
    drift and maintain stable flight characteristics. Two DRV8833 motor driver ICs provide 
    precise PWM control for four 3V coreless motors, ensuring responsive and balanced thrust distribution.

    PS4 controller integration via Bluetooth enables intuitive pilot control, while servo and 
    gyro calibration routines ensure consistent performance across flight sessions. Future 
    development includes custom PCB design for improved reliability and additional sensor integration.`
  }
];

export function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section id="projects" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative engineering solutions showcasing embedded systems, IoT development, 
              and practical problem-solving skills.
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden"
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 h-48 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 text-foreground">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Key Highlights:</h4>
                          <ul className="space-y-1">
                            {project.highlights.map((highlight, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start">
                                <span className="text-primary mr-2">•</span>
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="shadow-card">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </Button>
                          <Button variant="outline" size="sm" className="shadow-card">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {project.links.demo ? "Demo" : "Video"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleProject(project.id)}
                            className="ml-auto"
                          >
                            Learn More
                            {expandedProject === project.id ? (
                              <ChevronUp className="ml-2 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-2 h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {expandedProject === project.id && (
                  <CardContent className="border-t bg-muted/30">
                    <div className="pt-6">
                      <h4 className="font-semibold mb-3">Project Details</h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {project.details}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}