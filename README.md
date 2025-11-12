# White Label Burger

**White Label Burger** é uma landing page **personalizável para hamburguerias**, feita para ser **replicada e lançada em minutos**.  
Cada cliente tem sua própria configuração via `config.json`, definindo marca, cardápio e contatos — sem precisar alterar o código.

---

## O que é

Um sistema de **sites sob demanda** para hamburguerias locais.  
Você personaliza cores, nome, cardápio e WhatsApp, e o deploy gera um site exclusivo (ex: `nomedocliente.vercel.app`).

O cliente ganha:

- Um site responsivo e rápido;
- Um cardápio interativo configurado por JSON;
- Envio de pedidos direto pelo **WhatsApp**.

---

## Stack

- **Frontend:** React + TypeScript
- **Estilo:** TailwindCSS
- **Deploy:** Vercel
- **Configuração por cliente:** `src/data/{nome}.json`

---

## Exemplo de Configuração (`data/burgerdojoao.json`)

```json
{
  "name": "Burger do João",
  "whatsapp": "5599999999999",
  "theme": {
    "primary": "#ff4d4f",
    "background": "#0b090a",
    "text": "#ededed"
  },
  "menu": [
    {
      "categoria": "Lanches",
      "itens": [
        {
          "id": 1,
          "nome": "X-Bacon",
          "descricao": "Pão, carne, queijo e bacon",
          "preco": 25
        },
        {
          "id": 2,
          "nome": "X-Salada",
          "descricao": "Pão, carne, queijo, alface e tomate",
          "preco": 22
        }
      ]
    }
  ]
}
```
