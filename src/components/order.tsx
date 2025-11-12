import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { formatCurrencyBRL } from "../utils/formats";

export interface CartItem {
  key: string;
  id: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  adicionais?: string[];
}

interface OrderProps {
  cart: CartItem[];
  onRemoveFromCart: (key: string) => void;
  onClearCart: () => void;
  whatsapp: string;
}

export const Order = ({
  cart,
  onRemoveFromCart,
  onClearCart,
  whatsapp,
}: OrderProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    pagamento: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.precoUnitario * item.quantidade,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.nome ||
      !formData.endereco ||
      !formData.telefone ||
      !formData.pagamento
    ) {
      toast("Campos obrigatórios", {
        description: "Preencha todos os campos para enviar o pedido.",
      });
      return;
    }

    if (cart.length === 0) {
      toast("Carrinho vazio", {
        description: "Adicione itens antes de finalizar o pedido.",
      });
      return;
    }

    const pedidoTexto = cart
      .map((item) => {
        let texto = `- ${item.quantidade}x ${item.nome}`;
        if (item.adicionais?.length)
          texto += `\n  Adicionais: ${item.adicionais.join(", ")}`;
        return texto;
      })
      .join("\n");

    const mensagem = `*Novo Pedido*\n\n*Nome:* ${formData.nome}\n*Endereço:* ${
      formData.endereco
    }\n*Telefone:* ${
      formData.telefone
    }\n\n*Pedido:*\n${pedidoTexto}\n\n*Total:* R$ ${total.toFixed(
      2
    )}\n\n*Forma de pagamento:* ${formData.pagamento}`;

    console.log("order", whatsapp);

    const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(whatsappUrl, "_blank");
    setFormData({ nome: "", endereco: "", telefone: "", pagamento: "" });
    onClearCart();

    toast("Pedido enviado!", {
      description: "Você será redirecionado para o WhatsApp.",
    });
  };
  return (
    <section id="order" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Faça Seu Pedido
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha os dados e finalize via WhatsApp
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Carrinho */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-foreground">
                  Seu Pedido
                </h3>
              </div>

              {cart.length === 0 ? (
                <div className="bg-card p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Seu carrinho está vazio. Adicione itens do cardápio!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${(item.adicionais || []).join("-")}`}
                      className="bg-card p-4 rounded-lg border border-border flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {item.quantidade}x {item.nome}
                        </p>
                        {(item.adicionais ?? []).length > 0 && (
                          <p className="text-xs text-primary mt-1">
                            + {item.adicionais?.join(", ")}
                          </p>
                        )}
                        {/* <p className="text-sm text-muted-foreground mt-1">
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p> */}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveFromCart(item.key)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  ))}

                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-foreground">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrencyBRL(total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  placeholder="(11) 98765-4321"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço de Entrega</Label>
                <Textarea
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                  placeholder="Rua, número, complemento, bairro"
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pagamento">Forma de Pagamento</Label>
                <select
                  id="pagamento"
                  value={formData.pagamento}
                  onChange={(e) =>
                    setFormData({ ...formData, pagamento: e.target.value })
                  }
                  className="w-full p-2 rounded-md bg-input border border-border "
                  required
                >
                  <option className="text-black" value="">Selecione...</option>
                  <option className="" value="Dinheiro">Dinheiro</option>
                  <option className="" value="PIX">PIX</option>
                  <option className="" value="Cartão de Débito">Cartão de Débito</option>
                  <option className="" value="Cartão de Crédito">Cartão de Crédito</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
                disabled={cart.length === 0}
              >
                Enviar Pedido via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
