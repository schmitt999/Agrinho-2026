let dinheiro = 1000;
let sustentabilidade = 80;
let producao = 20;
let rodada = 1;
let mapaSlots = ["Sede", false, false, false, false, false, false, false, false];
let upgradesAdquiridos = { trator: false, gota: false, bio: false };
let slotSelecionadoAtualmente = null;

const turnosEventos = [
    { desc: "☀️ ONDA DE CALOR: Culturas de Arroz sofrem desgaste extra por evaporação." },
    { desc: "📈 BOOM DA SOJA: O mercado internacional valorizou grãos tecnológicos! Lucro maior nesta rodada." },
    { desc: "🐛 ALERTA DE INSETOS: Plantações convencionais perdem rendimento se não houver manejo biológico." },
    { desc: "🌿 FEIRA AGRO: Consumidores buscam frutas orgânicas. Árvores geram bônus financeiro." }
];

// Força o carregamento seguro dos elementos na inicialização
window.onload = function() {
    let salvo = localStorage.getItem("agroMagnata") || 0;
    let elementoRecorde = document.getElementById("recorde-valor");
    if (elementoRecorde) {
        elementoRecorde.innerText = salvo;
    }
};

function iniciarJogo() {
    dinheiro = 1000;
    sustentabilidade = 80;
    producao = 20;
    rodada = 1;
    mapaSlots = ["Sede", false, false, false, false, false, false, false, false];
    upgradesAdquiridos = { trator: false, gota: false, bio: false };

    // Proteção para os botões da loja existirem antes de alterar opacidade
    let btnTrator = document.getElementById("btn-trator");
    let btnGota = document.getElementById("btn-gota");
    let btnBio = document.getElementById("btn-bio");
    
    if (btnTrator) btnTrator.style.opacity = "1";
    if (btnGota) btnGota.style.opacity = "1";
    if (btnBio) btnBio.style.opacity = "1";

    gerarMapaVisual();
    mudarMissaoDoTurno();
    atualizarInterface();

    document.getElementById('tela-inicial').classList.add('escondido');
    document.getElementById('tela-fim').classList.add('escondido');
    document.getElementById('tela-jogo').classList.remove('escondido');
}

function atualizarInterface() {
    document.getElementById('res-dinheiro').innerText = `R$ ${dinheiro}`;
    document.getElementById('res-rodada').innerText = rodada;

    if (sustentabilidade > 100) sustentabilidade = 100;
    if (producao > 100) producao = 100;
    if (sustentabilidade < 0) sustentabilidade = 0;
    if (producao < 0) producao = 0;

    document.getElementById('barra-sust').style.width = `${sustentabilidade}%`;
    document.getElementById('barra-prod').style.width = `${producao}%`;

    if (sustentabilidade <= 5) finalizarJogo("COLAPSO AMBIENTAL", "A degradação ecológica tornou suas terras completamente estéreis.");
    if (dinheiro < 0) finalizarJogo("FALÊNCIA TOTAL", "O acúmulo de despesas operacionais quebrou sua fazenda.");
}

function gerarMapaVisual() {
    for (let i = 1; i < 9; i++) {
        let slot = document.getElementById(`slot-${i}`);
        if (slot) {
            if (!mapaSlots[i]) {
                slot.className = "slot";
                slot.innerHTML = `🟫<span>Cultivar</span>`;
            } else {
                slot.className = "slot ocupado";
                if (mapaSlots[i] === 'soja') slot.innerHTML = `🌱<span>Soja Tech</span>`;
                if (mapaSlots[i] === 'arroz') slot.innerHTML = `🌾<span>Arroz</span>`;
                if (mapaSlots[i] === 'arvore') slot.innerHTML = `🌳<span>Pomar</span>`;
            }
        }
    }
}

function abrirMenuPlantio(index) {
    if (mapaSlots[index] !== false) return;
    slotSelecionadoAtualmente = index;
    document.getElementById("modal-plantio").classList.remove("escondido");
}

function fecharMenuPlantio() {
    document.getElementById("modal-plantio").classList.add("escondido");
    slotSelecionadoAtualmente = null;
}

function plantarCultura(tipo) {
    if (slotSelecionadoAtualmente === null) return;
    
    let custos = { soja: 120, arroz: 100, arvore: 150 };
    let custo = custos[tipo];

    if (dinheiro >= custo) {
        dinheiro -= custo;
        mapaSlots[slotSelecionadoAtualmente] = tipo;

        if (tipo === 'soja') { producao += 25; sustentabilidade -= 15; }
        if (tipo === 'arroz') { producao += 15; sustentabilidade -= 5; }
        if (tipo === 'arvore') { producao += 8; sustentabilidade += 20; }

        document.getElementById('feedback-campo').innerText = `Sucesso! Lote ${slotSelecionadoAtualmente} cultivado.`;
        fecharMenuPlantio();
        gerarMapaVisual();
        atualizarInterface();
    } else {
        alert("Recursos financeiros insuficientes!");
    }
}

function comprarUpgrade(tipo) {
    if (tipo === 'trator' && !upgradesAdquiridos.trator && dinheiro >= 400) {
        dinheiro -= 400; upgradesAdquiridos.trator = true; producao += 15;
        document.getElementById("btn-trator").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "⚡ Trator Elétrico comprado!";
    } 
    else if (tipo === 'gota' && !upgradesAdquiridos.gota && dinheiro >= 300) {
        dinheiro -= 300; upgradesAdquiridos.gota = true; sustentabilidade += 15;
        document.getElementById("btn-gota").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "💧 Irrigação Gota a Gota instalada!";
    } 
    else if (tipo === 'bio' && !upgradesAdquiridos.bio && dinheiro >= 250) {
        dinheiro -= 250; upgradesAdquiridos.bio = true; sustentabilidade += 10; producao += 10;
        document.getElementById("btn-bio").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "🧪 Sistema de Biofertilizantes ativado.";
    }
    atualizarInterface();
}

function mudarMissaoDoTurno() {
    let elem = document.getElementById("evento-desc");
    if (elem) {
        let indice = Math.floor(Math.random() * turnosEventos.length);
        elem.innerText = turnosEventos[indice].desc;
    }
}

function pasarRodada() {} // Alias de segurança caso o HTML chame sem o 's'
function passarRodada() {
    let qtdSoja = mapaSlots.filter(x => x === 'soja').length;
    let qtdArroz = mapaSlots.filter(x => x === 'arroz').length;
    let qtdArvore = mapaSlots.filter(x => x === 'arvore').length;

    let ganhoTurno = (qtdSoja * 220) + (qtdArroz * 150) + (qtdArvore * 110) + 100;

    if (upgradesAdquiridos.trator) ganhoTurno += 80;
    if (upgradesAdquiridos.gota) sustentabilidade += 3;
    if (upgradesAdquiridos.bio) { ganhoTurno += 40; sustentabilidade += 2; }

    dinheiro += Math.floor(ganhoTurno);
    sustentabilidade -= 6;
    rodada++;

    if (rodada > 10) {
        let totalScore = dinheiro + (sustentabilidade * 15) + (producao * 5);
        let recordeSalvo = localStorage.getItem("agroMagnata") || 0;
        
        if (totalScore > parseInt(recordeSalvo)) {
            localStorage.setItem("agroMagnata", totalScore);
        }
        
        let rank = "Bronze 🥉";
        if (totalScore > 3000) rank = "Líder Global Sustentável 👑🌿";
        else if (totalScore > 2000) rank = "Diretor Ouro 🥇";
        else if (totalScore > 1300) rank = "Gerente Prata 🥈";

        document.getElementById("fim-rank").innerText = `RANK: ${rank}`;
        finalizarJogo("🏆 SAFRA CONCLUÍDA", "Você gerenciou os ciclos de mercado com maestria tecnológica!", totalScore);
    } else {
        document.getElementById('feedback-campo').innerText = `💰 Safra recolhida! Faturamento bruto de +R$ ${Math.floor(ganhoTurno)}.`;
        mudarMissaoDoTurno();
        atualizarInterface();
    }
}

function finalizarJogo(titulo, msg, pontos = 0) {
    document.getElementById('tela-jogo').classList.add('escondido');
    document.getElementById('tela-fim').classList.remove('escondido');
    document.getElementById('fim-titulo').innerText = titulo;
    document.getElementById('fim-mensagem').innerText = msg;
    document.getElementById('pontos-finais').innerText = pontos;
}

function reiniciarJogo() {
    let salvo = localStorage.getItem("agroMagnata") || 0;
    let elementoRecorde = document.getElementById("recorde-valor");
    if (elementoRecorde) {
        elementoRecorde.innerText = salvo;
    }
    iniciarJogo();
}