import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Plus, Tag, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { formatCurrencyBRL } from "../utils/formats";

interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  adicionaisDisponiveis?: boolean;
  tipo?: "combo" | "promo";
}

interface Adicional {
  id: number;
  nome: string;
  preco: number;
}

interface MenuCategory {
  categoria: string;
  itens: MenuItem[];
}

interface MenuProps {
  data: { menu: MenuCategory[] } | MenuCategory[];
  onAddToCart: (item: MenuItem, adicionais?: Adicional[]) => void;
}

const Menu = ({ data, onAddToCart }: MenuProps) => {
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<
    number[]
  >([]);
  const [adicionaisDisponiveis, setAdicionaisDisponiveis] = useState<
    Adicional[]
  >([]);

  useEffect(() => {
    if (data) {
      // Garante que aceita tanto array puro quanto objeto com "menu"
      const menuData = Array.isArray(data) ? data : data.menu || [];
      setMenu(menuData);

      const adicionaisCategoria = menuData.find(
        (cat: MenuCategory) => cat.categoria === "Adicionais"
      );
      if (adicionaisCategoria) {
        // converte para tipo Adicional
        setAdicionaisDisponiveis(
          adicionaisCategoria.itens.map((i) => ({
            id: i.id,
            nome: i.nome,
            preco: i.preco,
          }))
        );
      }
    }
  }, [data]);

  const handleItemClick = (item: MenuItem) => {
    if (item.adicionaisDisponiveis && adicionaisDisponiveis.length > 0) {
      setSelectedItem(item);
      setAdicionaisSelecionados([]);
    } else {
      onAddToCart(item);
    }
  };

  const handleConfirmarAdicionais = () => {
    if (selectedItem) {
      const adicionais = adicionaisDisponiveis.filter((ad) =>
        adicionaisSelecionados.includes(ad.id)
      );
      onAddToCart(selectedItem, adicionais);
      setSelectedItem(null);
      setAdicionaisSelecionados([]);
    }
  };

  const toggleAdicional = (id: number) => {
    setAdicionaisSelecionados((prev) =>
      prev.includes(id) ? prev.filter((adId) => adId !== id) : [...prev, id]
    );
  };

  const totalAdicionais = adicionaisDisponiveis
    .filter((ad) => adicionaisSelecionados.includes(ad.id))
    .reduce((sum, ad) => sum + ad.preco, 0);

  if (!menu.length) {
    return (
      <section id="menu" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando cardápio...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Nosso Cardápio
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore nossas deliciosas opções
            </p>
          </div>

          <div className="space-y-16">
            {menu
              .filter((cat) => cat.categoria !== "Adicionais")
              .map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                      {category.categoria === "Promoções" && (
                        <Gift className="text-primary" />
                      )}
                      {category.categoria}
                    </h3>
                    {category.categoria === "Promoções" && (
                      <p className="text-muted-foreground">
                        Aproveite nossas ofertas especiais!
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {category.itens.map((item) => (
                      <div
                        key={item.id}
                        className={`bg-background p-6 rounded-lg border space-y-4 transition-all ${
                          item.tipo === "promo" || item.tipo === "combo"
                            ? "border-primary/50 shadow-lg shadow-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xl font-semibold text-foreground">
                                {item.nome}
                              </h4>
                              {(item.tipo === "promo" ||
                                item.tipo === "combo") && (
                                <Tag className="text-primary" size={18} />
                              )}
                            </div>
                            <p className="text-muted-foreground text-sm">
                              {item.descricao}
                            </p>
                            {item.adicionaisDisponiveis && (
                              <p className="text-xs text-primary">
                                + Adicionais disponíveis
                              </p>
                            )}
                          </div>
                          <span className="text-2xl font-bold text-primary whitespace-nowrap">
                            {formatCurrencyBRL(item.preco)}
                          </span>
                        </div>

                        <Button
                          onClick={() => handleItemClick(item)}
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Plus size={20} className="mr-2" />
                          {item.adicionaisDisponiveis
                            ? "Personalizar e Adicionar"
                            : "Adicionar ao Pedido"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Dialog de Adicionais */}
          <Dialog
            open={!!selectedItem}
            onOpenChange={() => setSelectedItem(null)}
          >
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Personalize seu {selectedItem?.nome}</DialogTitle>
                <DialogDescription>
                  Selecione os adicionais que deseja incluir
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {adicionaisDisponiveis.map((adicional) => (
                  <div
                    key={adicional.id}
                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={`adicional-${adicional.id}`}
                        checked={adicionaisSelecionados.includes(adicional.id)}
                        onCheckedChange={() => toggleAdicional(adicional.id)}
                      />
                      <Label
                        htmlFor={`adicional-${adicional.id}`}
                        className="cursor-pointer text-foreground font-medium"
                      >
                        {adicional.nome}
                      </Label>
                    </div>
                    <span className="text-primary font-semibold">
                      + R$ {adicional.preco.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-foreground">Item:</span>
                  <span className="font-semibold text-foreground">
                    R$ {selectedItem?.preco.toFixed(2)}
                  </span>
                </div>
                {totalAdicionais > 0 && (
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-foreground">Adicionais:</span>
                    <span className="font-semibold text-foreground">
                      R$ {totalAdicionais.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t border-primary/20 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-foreground">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-primary">
                    R$
                    {((selectedItem?.preco || 0) + totalAdicionais).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleConfirmarAdicionais}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Adicionar ao Pedido
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Menu;
