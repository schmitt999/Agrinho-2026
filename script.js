Perfeito! Adicionar variedade de culturas e maquinários transforma o jogo em um verdadeiro simulador de estratégia profunda, onde cada escolha muda o destino da fazenda.

Para que tudo isso funcione de forma integrada e automática, nós vamos expandir as mecânicas. Ao clicar em um lote de terra, agora o jogador abrirá um menu de plantio especializado. Além disso, a loja de maquinários terá opções avançadas com bônus passivos a cada turno.

Substitua os códigos no seu GitHub por estas versões atualizadas:

1. O Arquivo Principal (index.html)
HTML


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agro Forte: Magnata Sustentável</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="game-container">
        <div id="tela-inicial" class="tela">
            <div class="logo-emoji">🚜🌾🍅</div>
            <h1>Agro Forte:<br><span>Império Sustentável v2</span></h1>
            <p>Gerencie culturas especializadas, compre maquinários elétricos e crie o ecossistema agrícola perfeito.</p>
            <div class="recorde-box">🏆 Recorde: <span id="recorde-valor">0</span> pts</div>
            <button class="btn-principal" onclick="iniciarJogo()">Iniciar Safra 🚀</button>
        </div>

        <div id="tela-jogo" class="tela escondido">
            <div class="status-topo">
                <div class="badge">📅 Turno: <span id="res-rodada">1</span>/10</div>
                <div class="badge ouro">💰 <span id="res-dinheiro">R$ 1000</span></div>
            </div>

            <div class="status-barras">
                <div class="barra-container">
                    <label>🌱 Saúde da Natureza:</label>
                    <div class="barra-fundo"><div id="barra-sust" class="barra-preenchimento sust"></div></div>
                </div>
                <div class="barra-container">
                    <label>📦 Volume de Produção:</label>
                    <div class="barra-fundo"><div id="barra-prod" class="barra-preenchimento prod"></div></div>
                </div>
            </div>

            <div id="painel-evento" class="missao-box">
                <span class="tag-missao">🎯 DIRETRIZ DO MERCADO</span>
                <p id="evento-desc">Planeje suas culturas de acordo com o clima regional.</p>
            </div>

            <div class="mapa-fazenda">
                <div class="slot ocupado" id="slot-0">🚜<span>Sede</span></div>
                <div class="slot" id="slot-1" onclick="abrirMenuPlantio(1)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-2" onclick="abrirMenuPlantio(2)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-3" onclick="abrirMenuPlantio(3)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-4" onclick="abrirMenuPlantio(4)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-5" onclick="abrirMenuPlantio(5)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-6" onclick="abrirMenuPlantio(6)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-7" onclick="abrirMenuPlantio(7)">🟫<span>Vazio</span></div>
                <div class="slot" id="slot-8" onclick="abrirMenuPlantio(8)">🟫<span>Vazio</span></div>
            </div>

            <div class="log-texto" id="feedback-campo">Escolha um terreno marrom para iniciar o cultivo!</div>

            <div class="loja-titulo">🚜 MAQUINÁRIOS E UPGRADES:</div>
            <div class="grade-loja">
                <button class="item-loja" id="btn-trator" onclick="comprarUpgrade('trator')">⚡ Trator Elétrico<br><span class="preco">R$ 400</span></button>
                <button class="item-loja" id="btn-gota" onclick="comprarUpgrade('gota')">💧 Gota a Gota<br><span class="preco">R$ 300</span></button>
                <button class="item-loja" id="btn-bio" onclick="comprarUpgrade('bio')">🧪 Biofertilizante<br><span class="preco">R$ 250</span></button>
            </div>

            <button class="btn-principal btn-avancar" onclick="passarRodada()">Colher Safra e Avançar Turno 🌾</button>
        </div>

        <div id="modal-plantio" class="modal escondido">
            <div class="modal-content">
                <h3>O que deseja plantar neste lote?</h3>
                <div class="opcoes-plantio">
                    <button class="card-cultura" onclick="plantarCultura('soja')">
                        <span class="emoji-cultura">🌱</span>
                        <strong>Soja Alta Tech</strong>
                        <p>Rende muito dinheiro rápido, mas desgasta o solo.</p>
                        <span class="custo">Custo: R$ 120</span>
                    </button>
                    <button class="card-cultura" onclick="plantarCultura('arroz')">
                        <span class="emoji-cultura">🌾</span>
                        <strong>Arroz Irrigado</strong>
                        <p>Produção equilibrada, consumo médio de recursos.</p>
                        <span class="custo">Custo: R$ 100</span>
                    </button>
                    <button class="card-cultura" onclick="plantarCultura('arvore')">
                        <span class="emoji-cultura">🌳</span>
                        <strong>Árvores Frutíferas</strong>
                        <p>Lucro moderado, mas regenera muito a sustentabilidade.</p>
                        <span class="custo">Custo: R$ 150</span>
                    </button>
                </div>
                <button class="btn-fechar" onclick="fecharMenuPlantio()">Cancelar</button>
            </div>
        </div>

        <div id="tela-fim" class="tela escondido">
            <h2 id="fim-titulo">Balanço da Safra</h2>
            <div class="rank-badge" id="fim-rank">RANK</div>
            <p id="fim-mensagem">...</p>
            <div class="pontuacao-final">Score Final: <span id="pontos-finais">0</span></div>
            <button class="btn-principal" onclick="reiniciarJogo()">Iniciar Nova Temporada 🔄</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
2. O Visual Moderno (style.css)
CSS


* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', system-ui, sans-serif; }

body {
    background: #0b0e0c;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 10px;
}

.game-container {
    background: #121814;
    color: #f0f3f1;
    width: 100%;
    max-width: 440px;
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.8);
    border: 2px solid #2e7d32;
    position: relative;
}

.tela { padding: 25px 20px; display: flex; flex-direction: column; align-items: center; }
.escondido { display: none !important; }

.logo-emoji { font-size: 55px; margin-bottom: 10px; text-shadow: 0 4px 8px rgba(0,0,0,0.3); }
h1 { color: #ffffff; font-size: 26px; font-weight: 800; margin-bottom: 15px; text-align: center; }
h1 span { color: #4caf50; }
p { color: #9aa79d; font-size: 14px; text-align: center; margin-bottom: 25px; line-height: 1.4; }

.recorde-box { background: #1b261f; color: #81c784; padding: 6px 20px; border-radius: 50px; font-weight: bold; margin-bottom: 25px; border: 1px solid #2e3d32; }

.btn-principal {
    background: linear-gradient(135deg, #4caf50, #2e7d32);
    color: white;
    font-size: 16px;
    font-weight: bold;
    padding: 14px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    width: 100%;
    box-shadow: 0 4px 15px rgba(76,175,80,0.3);
}

/* Status e Barras */
.status-topo { display: flex; justify-content: space-between; width: 100%; margin-bottom: 15px; }
.badge { background: #1b261f; padding: 8px 16px; border-radius: 12px; font-weight: bold; font-size: 14px; }
.ouro { color: #ffd54f; }

.status-barras { width: 100%; margin-bottom: 15px; background: #1b261f; padding: 12px; border-radius: 16px; }
.barra-container { margin-bottom: 8px; }
.barra-container label { display: block; font-size: 11px; color: #9aa79d; font-weight: bold; margin-bottom: 4px; }
.barra-fundo { background: #0b0e0c; height: 12px; border-radius: 6px; overflow: hidden; }
.barra-preenchimento { height: 100%; width: 0%; transition: width 0.4s ease; }
.sust { background: #4caf50; box-shadow: 0 0 8px rgba(76,175,80,0.7); }
.prod { background: #2196f3; box-shadow: 0 0 8px rgba(33,150,243,0.7); }

.missao-box { width: 100%; background: #231f14; border: 1px solid #ffb300; padding: 10px; border-radius: 12px; margin-bottom: 15px; }
.tag-missao { font-size: 9px; background: #ffb300; color: #000; padding: 2px 6px; font-weight: 900; border-radius: 4px; }
.missao-box p { color: #ffe082; font-size: 12px; margin: 4px 0 0 0; text-align: left; }

/* Grid Mapa */
.mapa-fazenda { width: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 15px; }
.slot { background: #1b261f; border: 2px dashed #3a4d3f; border-radius: 14px; padding: 14px 0; text-align: center; font-size: 22px; cursor: pointer; }
.slot span { display: block; font-size: 10px; color: #81c784; margin-top: 4px; }
.slot.ocupado { background: #2e7d32; border-style: solid; border-color: #4caf50; }
.slot.ocupado span { color: white; font-weight: bold; }

.log-texto { font-size: 12px; color: #9aa79d; background: #0b0e0c; width: 100%; padding: 8px; border-radius: 8px; margin-bottom: 15px; text-align: center; }

/* Menu Upgrades */
.loja-titulo { width: 100%; text-align: left; font-size: 11px; font-weight: bold; color: #64dd17; margin-bottom: 6px; }
.grade-loja { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; width: 100%; margin-bottom: 20px; }
.item-loja { background: #161f1a; border: 1px solid #2e3d31; border-radius: 10px; padding: 10px 2px; color: #fff; font-size: 11px; font-weight: bold; cursor: pointer; }
.item-loja .preco { color: #ffd54f; font-size: 10px; }

.btn-avancar { background: #1b5e20; }

/* Janela Modal de Plantio */
.modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 10; padding: 20px; }
.modal-content { background: #161c18; border: 2px solid #4caf50; border-radius: 20px; padding: 20px; width: 100%; max-width: 360px; text-align: center; }
.modal-content h3 { font-size: 16px; margin-bottom: 15px; color: #fff; }
.opcoes-plantio { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
.card-cultura { background: #222c24; border: 1px solid #3a4d3f; border-radius: 12px; padding: 10px; text-align: left; cursor: pointer; color: #fff; position: relative; }
.card-cultura:hover { border-color: #4caf50; background: #2a382d; }
.emoji-cultura { font-size: 24px; float: left; margin-right: 10px; }
.card-cultura strong { font-size: 13px; color: #81c784; }
.card-cultura p { font-size: 11px; color: #9aa79d; text-align: left; margin: 2px 0 5px 0; }
.card-cultura .custo { font-size: 10px; background: #331e1e; color: #ff8a80; padding: 2px 6px; border-radius: 4px; font-weight: bold; }
.btn-fechar { background: #c62828; color: white; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold; }

.rank-badge { background: #ffd54f; color: #000; padding: 5px 20px; font-weight: 900; border-radius: 8px; margin-bottom: 15px; font-size: 18px; }
.pontuacao-final { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #81c784; }
3. A Lógica Atualizada (script.js)
JavaScript


let dinheiro, sustentabilidade, producao, rodada;
let mapaSlots = [];
let upgradesAdquiridos = { trator: false, gota: false, bio: false };
let slotSelecionadoAtualmente = null;

const turnosEventos = [
    { desc: "☀️ ONDA DE CALOR: Culturas de Arroz sofrem desgaste extra por evaporação.", tipo: "clima" },
    { desc: "📈 BOOM DA SOJA: O mercado internacional valorizou grãos tecnológicos! Lucro maior nesta rodada.", tipo: "economia" },
    { desc: "🐛 ALERTA DE INSETOS: Plantações convencionais perdem rendimento se não houver manejo biológico.", tipo: "crise" },
    { desc: "🌿 FEIRA AGRO: Consumidores buscam frutas orgânicas. Árvores geram bônus financeiro.", tipo: "economia" }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("recorde-valor").innerText = localStorage.getItem("agroMagnata") || 0;
});

function iniciarJogo() {
    dinheiro = 1000;
    sustentabilidade = 80;
    producao = 20;
    rodada = 1;
    mapaSlots = ["Sede", false, false, false, false, false, false, false, false];
    upgradesAdquiridos = { trator: false, gota: false, bio: false };

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

        // Efeitos imediatos do plantio
        if (tipo === 'soja') { producao += 25; sustentabilidade -= 15; }
        if (tipo === 'arroz') { producao += 15; sustentabilidade -= 5; }
        if (tipo === 'arvore') { producao += 8; sustentabilidade += 20; }

        document.getElementById('feedback-campo').innerText = `Sucesso! Cultura inserida no lote ${slotSelecionadoAtualmente}.`;
        fecharMenuPlantio();
        gerarMapaVisual();
        atualizarInterface();
    } else {
        alert("Recursos financeiros insuficientes para esta cultura!");
    }
}

function comprarUpgrade(tipo) {
    if (tipo === 'trator' && !upgradesAdquiridos.trator && dinheiro >= 400) {
        dinheiro -= 400; upgradesAdquiridos.trator = true; producao += 15;
        document.getElementById("btn-trator").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "⚡ Trator Elétrico comprado! Rendimento de colheita otimizado e emissão zero.";
    } 
    else if (tipo === 'gota' && !upgradesAdquiridos.gota && dinheiro >= 300) {
        dinheiro -= 300; upgradesAdquiridos.gota = true; sustentabilidade += 15;
        document.getElementById("btn-gota").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "💧 Irrigação Gota a Gota instalada! Desperdício de água reduzido.";
    } 
    else if (tipo === 'bio' && !upgradesAdquiridos.bio && dinheiro >= 250) {
        dinheiro -= 250; upgradesAdquiridos.bio = true; sustentabilidade += 10; producao += 10;
        document.getElementById("btn-bio").style.opacity = "0.3";
        document.getElementById('feedback-campo').innerText = "🧪 Sistema de Biofertilizantes ativado. Nutrição natural para a terra.";
    }
    atualizarInterface();
}

function mudarMissaoDoTurno() {
    let indice = Math.floor(Math.random() * turnosEventos.length);
    document.getElementById("evento-desc").innerText = turnosEventos[indice].desc;
}

function passarRodada() {
    // Lucros calculados de acordo com a quantidade de cada planta no mapa
    let qtdSoja = mapaSlots.filter(x => x === 'soja').length;
    let qtdArroz = mapaSlots.filter(x => x === 'arroz').length;
    let qtdArvore = mapaSlots.filter(x => x === 'arvore').length;

    let ganhoTurno = (qtdSoja * 220) + (qtdArroz * 150) + (qtdArvore * 110) + 100; // +100 base da sede

    // Bônus e deduções dos maquinários contratados
    if (upgradesAdquiridos.trator) ganhoTurno += 80;
    if (upgradesAdquiridos.gota) sustentabilidade += 3;
    if (upgradesAdquiridos.bio) { ganhoTurno += 40; sustentabilidade += 2; }

    dinheiro += Math.floor(ganhoTurno);

    // Desgaste natural do tempo
    sustentabilidade -= 6;

    rodada++;

    if (rodada > 10) {
        let totalScore = dinheiro + (sustentabilidade * 15) + (producao * 5);
        let recordeSalvo = localStorage.getItem("agroMagnata") || 0;
        if (totalScore > recordeSalvo) localStorage.setItem("agroMagnata", totalScore);
        
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
    document.getElementById("recorde-valor").innerText = localStorage.getItem("agroMagnata") || 0;
    iniciarJogo();
}