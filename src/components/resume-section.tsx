"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, GraduationCap, Code, Briefcase } from "lucide-react";

const RESUME_URL = "/Resume_CAO_4-8-25.pdf"; // file lives in /public

export function ResumeSection() {
  const skills: Record<string, string[]> = {
    "Electrical & Embedded": ["Circuit Design", "Control Systems", "Arduino/ESP32", "MPU6050", "GPIO Programming"],
    Programming: ["C/C++", "Python", "Verilog", "CRBasic"],
    "Systems & Tools": ["Linux (Ubuntu/Kali)", "Windows", "MacOS", "Microsoft Office", "Campbell Scientific Dataloggers"],
  };

  // Optional iOS-friendly fallback if you ever need to force a download:
  // const handleDownload = async () => {
  //   const res = await fetch(RESUME_URL);
  //   const blob = await res.blob();
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "Seth_Beddes_Resume.pdf";
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  //   URL.revokeObjectURL(url);
  // };

  return (
    <section id="resume" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Resume &amp; Qualifications</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Electrical Engineering student with hands-on experience in embedded systems, research, and business development.
            </p>
          </div>

          {/* Resume PDF Section */}
          <div className="mb-12">
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Download Full Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download the complete PDF version of my resume for a detailed overview of my experience and qualifications.
                </p>

                {/* Prefer <a download> inside shadcn Button */}
                <Button asChild className="shadow-elegant">
                  <a href={RESUME_URL} download="Seth_Beddes_Resume.pdf" aria-label="Download PDF Resume">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF Resume
                  </a>
                </Button>

                {/* If you ever need the JS fallback instead:
                <Button onClick={handleDownload} className="shadow-elegant ml-2">
                  <Download className="mr-2 h-4 w-4" />
                  Force Download
                </Button>
                */}
              </CardContent>
            </Card>
          </div>

          {/* Quick Overview Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Education */}
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold">B.S. Electrical Engineering</h3>
                  <p className="text-sm text-muted-foreground">Utah State University</p>
                  <p className="text-sm text-muted-foreground">May 2027 • 3.8 GPA</p>
                </div>
                <div>
                  <h3 className="font-semibold">Minor in Mathematics</h3>
                  <p className="text-sm text-muted-foreground">Honors Student</p>
                </div>
                <div>
                  <h3 className="font-semibold">AFROTC Cadet</h3>
                  <p className="text-sm text-muted-foreground">Arnold Air Society Member</p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Skills */}
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Code className="h-5 w-5" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-1">
                      {items.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {items.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{items.length - 3} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Briefcase className="h-5 w-5" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h3 className="font-semibold text-sm">Electronics Engineering Assistant</h3>
                  <p className="text-xs text-muted-foreground">USU Soil Physics • Feb 2024 – May 2025</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Business Development Rep</h3>
                  <p className="text-xs text-muted-foreground">iWorQ • Sep 2022 – Jan 2023</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Tire Technician</h3>
                  <p className="text-xs text-muted-foreground">Les Schwab • Jan 2020 – Current (Seasonal)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

        </div>
      </div>
    </section>
  );
}
