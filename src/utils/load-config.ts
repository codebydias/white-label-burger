export async function loadConfig() {
    try {
        // Exemplo 1: pegar ?cliente= no query param
        const urlParams = new URLSearchParams(window.location.search);
        const cliente = urlParams.get("cliente") || "burgerdias"; 

        const response = await fetch(`/data/${cliente}.json`);
        if (!response.ok) throw new Error("Config não encontrada");

        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar config:", error);
        // fallback básico
        return {
            name: "Burger Padrão",
            hero: {
                title: "Bem-vindo à nossa hamburgueria!",
                subtitle: "O sabor que conquista!",
                image: "/images/hero-default.jpg",
            },
        };
    }
}
