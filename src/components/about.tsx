import { Heart, Award, Clock } from "lucide-react";
import { useConfig } from "../context/config-context";

const ICONS = {
  heart: Heart,
  award: Award,
  clock: Clock,
};

const About = () => {
  const { about } = useConfig() || {};

  if (!about) return null;

  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {about.title || "Sobre Nós"}
            </h2>
            <p className="text-lg text-muted-foreground">{about.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {about.items?.map((item: any, index: number) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS] || Heart;
              return (
                <div
                  key={index}
                  className="space-y-4 p-6 bg-background rounded-lg"
                >
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
