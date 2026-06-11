const meusProjetos = [
    {
        titulo: "Painel de Controle Hidropônico",
        descricao: "Interface criada para monitorar o consumo de água e nutrientes em plantações verticais urbanas.",
        imagem: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "JavaScript"]
    },
    {
        titulo: "Calculadora de Pegada de Carbono",
        descricao: "Aplicação web que ajuda produtores rurais a calcularem e reduzirem a emissão de CO2 na fazenda.",
        imagem: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "JS / API"]
    },
    {
        titulo: "Marketplace AgroEcológico",
        descricao: "E-commerce front-end focado em conectar pequenos produtores orgânicos diretamente com o consumidor final.",
        imagem: "https://images.unsplash.com/photo-1488459711626-d6df22946802?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "Flexbox"]
    }
];

// Função para renderizar os projetos na tela
function carregarProjetos() {
    const gridProjetos = document.getElementById('grid-projetos');
    
    // Limpa a grid antes de carregar
    gridProjetos.innerHTML = "";

    // Mapeia e insere cada projeto no HTML
    meusProjetos.forEach(projeto => {
        const card = document.createElement('div');
        card.classList.add('card-projeto');

        // Cria a lista de tags de tecnologia
        const tagsHTML = projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('');

        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}">
            <div class="card-info">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="tags">
                    ${tagsHTML}
                </div>
            </div>
        `;

        gridProjetos.appendChild(card);
    });
}

// Executa a função assim que a página carrega
window.addEventListener('DOMContentLoaded', carregarProjetos);