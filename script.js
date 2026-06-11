let dinheiro, sustentabilidade, producao, rodada;
let mapaSlots = [];
let upgradesAdquiridos = { solar: false, drone: false, bio: false };

// Lista de eventos e missões que mudam a cada turno de forma imprevisível
const turnosEventos = [
    { desc: "Mercado em alta para Orgânicos! Use adubos naturais para ganhar bônus duplo de caixa.", tipo: "bonus" },
    { desc: "🚨 ALERTA DE PRAGA: Insetos atacando. Sua produção vai cair drasticamente se não plantar defesas.", tipo: "crise" },
    { desc: "O governo está oferecendo incentivos fiscais para quem investir em Energia Solar.", tipo: "oportunidade" },
    { desc: "🌧️ Tempestades severas lavaram os nutrientes do solo. Sustentabilidade em risco!", tipo: "clima" },
    { desc: "Festa do Peão Regional aumentou a demanda local por comida fresca!", tipo: "bonus" }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("recorde-valor").innerText = localStorage.getItem("agroImprio") || 0;
});

function iniciarJogo() {
    dinheiro = 1000;
    sustentabilidade = 80;
    producao = 30;
    rodada = 1;
    mapaSlots = ["Sede", false, false, false, false, false, false, false, false];
    upgradesAdquiridos = { solar: false, drone: false, bio: false };

    // Resetar botões da loja
    document.querySelectorAll('.item-loja').forEach(b => b.style.opacity = "1");
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

    // Ajusta o tamanho das barras de progresso visualmente
    if (sustentabilidade > 100) sustentabilidade = 100;
    if (producao > 100) producao = 100;
    if (sustentabilidade < 0) sustentabilidade = 0;
    if (producao < 0) producao = 0;

    document.getElementById('barra-sust').style.width = `${sustentabilidade}%`;
    document.getElementById('barra-prod').style.width = `${producao}%`;

    // Checa derrotas imediatas
    if (sustentabilidade <= 10) finalizarJogo("FALÊNCIA AMBIENTAL", "Seu solo virou um deserto estéril. Nenhuma planta cresce aqui.");
    if (dinheiro < 0) finalizarJogo("FALÊNCIA ECONÔMICA", "Suas dívidas bancárias engoliram a sua propriedade.");
}

function gerarMapaVisual() {
    for (let i = 1; i < 9; i++) {
        let slot = document.getElementById(`slot-${i}`);
        if (!mapaSlots[i]) {
            slot.className = "slot";
            slot.innerHTML = `🟫<span>Plantar</span>`;
        } else {
            slot.className = "slot ocupado";
            slot.innerHTML = mapaSlots[i] === "Bio" ? "🌻<span>Orgânico</span>" : "🌱<span>Normal</span>";
        }
    }
}

// Mecânica viciante: Clicar no slot abre opções de plantio rápido baseado no dinheiro
function comprarTerreno(index) {
    if (mapaSlots[index] !== false) return;

    if (dinheiro >= 150) {
        // Menu de escolha rápido direto no clique do slot
        let escolha = confirm("Pressione OK para Plantação Sustentável (R$150) ou CANCELAR para Plantação Química Rápida (R$100)");
        
        if (escolha) { // Orgânico
            dinheiro -= 150; sustentabilidade += 15; producao += 10;
            mapaSlots[index] = "Bio";
        } else { // Químico
            if (dinheiro >= 100) {
                dinheiro -= 100; sustentabilidade -= 15; producao += 25;
                mapaSlots[index] = "Quimico";
            } else { alert("Sem fundos!"); return; }
        }
        document.getElementById('feedback-campo').innerText = "Novo lote cultivado com sucesso!";
        gerarMapaVisual();
        atualizarInterface();
    } else {
        alert("Dinheiro insuficiente para começar um plantio (Mínimo R$100)");
    }
}

function comprarUpgrade(tipo) {
    if (tipo === 'solar' && !upgradesAdquiridos.solar && dinheiro >= 300) {
        dinheiro -= 300; upgradesAdquiridos.solar = true; sustentabilidade += 20;
        document.getElementById("btn-solar").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "☀️ Rede de captação solar ligada!";
    } 
    else if (tipo === 'drone' && !upgradesAdquiridos.drone && dinheiro >= 400) {
        dinheiro -= 400; upgradesAdquiridos.drone = true; producao += 25;
        document.getElementById("btn-drone").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "🛸 Drones configurados para automação.";
    } 
    else if (tipo === 'bio' && !upgradesAdquiridos.bio && dinheiro >= 500) {
        dinheiro -= 500; upgradesAdquiridos.bio = true; sustentabilidade += 15; producao += 15;
        document.getElementById("btn-bio").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "🧪 Bio-laboratório gerando sementes puras.";
    }
    atualizarInterface();
}

function mudarMissaoDoTurno() {
    let indice = Math.floor(Math.random() * turnosEventos.length);
    document.getElementById("evento-desc").innerText = turnosEventos[indice].desc;
}

function passarRodada() {
    // Cálculo do lucro da rodada baseado nas estruturas e produções
    let multiplicador = upgradesAdquiridos.bio ? 15 : 10;
    let ganhoTurno = Math.floor(producao * multiplicador);
    
    dinheiro += ganhoTurno;

    // Upgrades passivos por turno
    if (upgradesAdquiridos.solar) sustentabilidade += 4;
    if (upgradesAdquiridos.drone) dinheiro += 60;

    // Degradação fixa ambiental
    sustentabilidade -= 8;

    rodada++;

    if (rodada > 10) {
        let totalScore = dinheiro + (sustentabilidade * 12) + (producao * 6);
        let recordeSalvo = localStorage.getItem("agroImprio") || 0;
        if (totalScore > recordeSalvo) localStorage.setItem("agroImprio", totalScore);
        
        // Define o Rank final baseado na pontuação
        let rank = "Bronze 🥉";
        if (totalScore > 2500) rank = "Diamante Verde 💎🌿";
        else if (totalScore > 1800) rank = "Ouro 🥇";
        else if (totalScore > 1200) rank = "Prata 🥈";

        document.getElementById("fim-rank").innerText = `RANK: ${rank}`;
        finalizarJogo("🏆 SAFRA ENCERRADA", "Você operou os 10 turnos comerciais com sucesso!", totalScore);
    } else {
        document.getElementById('feedback-campo').innerText = `💰 Colheita realizada! Faturamento de +R$ ${ganhoTurno}.`;
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
    document.getElementById("recorde-valor").innerText = localStorage.getItem("agroImprio") || 0;
    iniciarJogo();
}