/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/nav-bar";
import { Hero } from "../components/hero";
import About from "../components/about";
import Locations from "../components/locations";
import Menu from "../components/menu";
import { Footer } from "../components/footer";
import { Order } from "../components/order";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Adicional {
  id: number;
  nome: string;
  preco: number;
}

interface CartItem {
  key: string; // id único baseado em produto + adicionais
  id: number;
  nome: string;
  precoUnitario: number;
  quantidade: number;
  adicionais?: string[];
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [config, setConfig] = useState<any>(null);
  const [searchParams] = useSearchParams();

  const burger = searchParams.get("burger") || "hamburgueriaex";

  useEffect(() => {
    fetch(`/data/${burger}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Config não encontrada");
        return res.json();
      })
      .then(setConfig)
      .catch((err) => console.error("Erro ao carregar config:", err));
  }, [burger]);

  const handleAddToCart = (item: Produto, adicionais?: Adicional[]) => {
    const adicionaisNomes = adicionais?.map((a) => a.nome) || [];
    const precoAdicionais =
      adicionais?.reduce((sum, a) => sum + a.preco, 0) || 0;
    const precoTotal = item.preco + precoAdicionais;

    // hash simples pra identificar itens únicos (produto + adicionais)
    const itemKey = `${item.id}-${adicionaisNomes.sort().join("-")}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((c) => c.key === itemKey);
      if (existingItemIndex !== -1) {
        return prevCart.map((c, i) =>
          i === existingItemIndex ? { ...c, quantidade: c.quantidade + 1 } : c
        );
      }

      return [
        ...prevCart,
        {
          key: itemKey,
          id: item.id,
          nome: item.nome,
          precoUnitario: precoTotal,
          quantidade: 1,
          adicionais: adicionaisNomes.length ? adicionaisNomes : undefined,
        },
      ];
    });
  };

  const handleRemoveFromCart = (key: string) => {
    setCart((prevCart) =>
      prevCart
        .map((c) =>
          c.key === key ? { ...c, quantidade: c.quantidade - 1 } : c
        )
        .filter((c) => c.quantidade > 0)
    );
  };

  const handleClearCart = () => setCart([]);

  if (!config?.menu || !config?.socials)
    return <div className="text-center py-20">Configuração inválida.</div>;
  console.log("index", config.whatsapp);

  return (
    <div className="min-h-screen bg-background">
      <Navbar brandName={config.name} />
      <Hero {...config.hero} />
      <About />
      <Locations />
      <Menu data={config.menu} onAddToCart={handleAddToCart} />
      <Order
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        whatsapp={config.whatsapp}
      />

      <Footer config={config.socials} />
    </div>
  );
};

export default Index;
