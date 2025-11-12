import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

type NavbarProps = {
  brandName: string;
  menuItems?: { id: string; label: string }[];
};

export const Navbar = ({
  brandName,
  menuItems = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre Nós" },
    { id: "locations", label: "Localizações" },
    { id: "menu", label: "Cardápio" },
    { id: "order", label: "Fazer Pedido" },
  ],
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary cursor-pointer">
            {brandName}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection(menuItems.at(-1)?.id ?? "order")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {menuItems.at(-1)?.label ?? "Fazer Pedido"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
