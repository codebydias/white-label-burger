# White Label Burger

**White Label Burger** é uma landing page personalizável para hamburguerias, desenvolvida para ser **replicada rapidamente** e hospedada individualmente para cada cliente.  
Cada instância tem seu próprio `config.json` com informações da marca, cardápio e contatos.

---

##  Visão Geral

O projeto permite criar **sites sob demanda** para hamburguerias locais com a sua marca, cores e cardápio sem precisar desenvolver tudo do zero.

Cada cliente recebe:
- Um subdomínio exclusivo (`nomedocliente.vercel.app`);
- Um cardápio interativo gerado dinamicamente a partir do `config.json`;
- Um botão para enviar o pedido direto via **WhatsApp**.

---

##  Estrutura

- **Frontend:** React + TypeScript 
- **Estilo:** TailwindCSS  
- **Hospedagem:** Vercel (modelo white-label controlado)  
- **Configuração por cliente:** `src/config/config.json`  


---

##  Exemplo de `config.json`

```json
{
  "name": "Burger do João",
  "themeColor": "#ff4d4f",
  "whatsapp": "5599999999999",
  "menu": [
    { "name": "X-Bacon", "price": 25, "description": "Pão, carne, queijo, bacon" },
    { "name": "X-Salada", "price": 22, "description": "Pão, carne, queijo, alface, tomate" }
  ]
}
