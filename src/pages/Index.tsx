import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ResumeSection } from "@/components/resume-section";
import { ProjectsSection } from "@/components/projects-section";
import { ContactSection } from "@/components/contact-section";
import { BackToTop } from "@/components/back-to-top";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ResumeSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <BackToTop />
    </div>
  );
};

export default Index;
