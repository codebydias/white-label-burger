import { Button } from "./ui/button";

type HeroProps = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export const Hero = ({
  title = "Os Melhores",
  highlight = "Hambúrgueres",
  subtitle = "Ingredientes frescos, receitas exclusivas e muito sabor em cada mordida.",
  primaryCta = "Faça Seu Pedido",
  secondaryCta = "Ver Cardápio",
}: HeroProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            {title}
            <span className="block text-primary mt-2">{highlight}</span>
            <span className="block text-foreground">da Cidade</span>
          </h1>

          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              onClick={() => scrollToSection("order")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/20 cursor-pointer"
            >
              {primaryCta}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("menu")}
              className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10 cursor-pointer"
            >
              {secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
