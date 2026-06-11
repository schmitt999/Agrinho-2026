const meusProjetos = [
    {
        titulo: "Painel de Controle Hidropônico",
        descricao: "Interface criada para monitorar o consumo de água e nutrientes em plantações verticais urbanas.",
        imagem: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        linkProjeto: "https://seu-usuario.github.io/nome-do-repositorio-projeto1", // Substitua pelo link do projeto rodando
        linkCodigo: "https://github.com/seu-usuario/nome-do-repositorio-projeto1"   // Substitua pelo link do código no GitHub
    },
    {
        titulo: "Calculadora de Pegada de Carbono",
        descricao: "Aplicação web que ajuda produtores rurais a calcularem e reduzirem a emissão de CO2 na fazenda.",
        imagem: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "JS / API"],
        linkProjeto: "#", // Se não tiver o link ainda, pode deixar "#"
        linkCodigo: "#"
    },
    {
        titulo: "Marketplace AgroEcológico",
        descricao: "E-commerce front-end focado em conectar pequenos produtores orgânicos diretamente com o consumidor final.",
        imagem: "https://images.unsplash.com/photo-1488459711626-d6df22946802?auto=format&fit=crop&w=500&q=80",
        tecnologias: ["HTML", "CSS", "Flexbox"],
        linkProjeto: "#",
        linkCodigo: "#"
    }
];

// Função para renderizar os projetos na tela
function carregarProjetos() {
    const gridProjetos = document.getElementById('grid-projetos');
    gridProjetos.innerHTML = "";

    meusProjetos.forEach(projeto => {
        const card = document.createElement('div');
        card.classList.add('card-projeto');

        const tagsHTML = projeto.tecnologias.map(tech => `<span>${tech}</span>`).join('');

        // Adicionando os botões de ação no HTML do card
        card.innerHTML = `
            <img src="${projeto.imagem}" alt="${projeto.titulo}">
            <div class="card-info">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <div class="tags">
                    ${tagsHTML}
                </div>
                <div class="projeto-links" style="margin-top: 15px; display: flex; gap: 10px;">
                    <a href="${projeto.linkProjeto}" target="_blank" class="btn-projeto" style="background-color: #2e7d32; color: white; padding: 8px 15px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Visualizar</a>
                    <a href="${projeto.linkCodigo}" target="_blank" class="btn-codigo" style="background-color: #f4f7f5; color: #2e7d32; border: 1px solid #2e7d32; padding: 8px 15px; text-decoration: none; border-radius: 5px; font-size: 14px; font-weight: bold;">Código</a>
                </div>
            </div>
        `;

        gridProjetos.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', carregarProjetos);