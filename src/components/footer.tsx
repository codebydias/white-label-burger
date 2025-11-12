import { Instagram, Facebook, Phone } from "lucide-react";

type FooterConfig = {
  telefone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  nome?: string;
  descricao?: string;
};

type FooterProps = {
  config: FooterConfig;
};

export const Footer = ({ config }: FooterProps) => {
  const { telefone, email, instagram, facebook, nome, descricao } = config;

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              {nome && <h3 className="text-xl font-bold text-primary">{nome}</h3>}
              {descricao && <p className="text-muted-foreground">{descricao}</p>}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contato</h4>
              <div className="space-y-2 text-muted-foreground">
                {telefone && (
                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    {telefone}
                  </p>
                )}
                {email && <p>{email}</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Redes Sociais</h4>
              <div className="flex gap-4">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram size={24} />
                  </a>
                )}
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Facebook size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>
              © {new Date().getFullYear()} {nome || "Hamburgueria"}. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
