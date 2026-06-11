// Variáveis básicas
let dinheiro, sustentabilidade, producao, rodada;
let construcoes = [true, false, false, false, false, false]; // Controle dos slots do mapa

// Banco de Eventos Aleatórios
const eventos = [
    { titulo: "☀️ SECA HISTÓRICA", desc: "A falta de água castiga a região. Sustentabilidade cai 15% nesta colheita.", efeito: () => { sustentabilidade -= 15; } },
    { titulo: "🌧️ CHUVA IDEAL", desc: "Clima perfeito para as plantas! Produção ganha +15% de bônus automático.", efeito: () => { producao += 15; } },
    { titulo: "📉 QUEDA DO MERCADO", desc: "O preço dos alimentos despencou. O lucro do próximo turno será menor.", efeito: () => { dinheiro -= 100; } },
    { titulo: "🌿 CERTIFICAÇÃO AGRO", desc: "Sua fazenda ganhou destaque sustentável! Bônus de R$ 250 em caixa.", efeito: () => { dinheiro += 250; } },
    { titulo: "🐛 INFESTAÇÃO DE LAGARTAS", desc: "Pragas invadem as plantações! Produção reduzida em 20%.", efeito: () => { producao -= 20; } }
];

// Carregar Recorde ao abrir a página
document.addEventListener("DOMContentLoaded", () => {
    let salvo = localStorage.getItem("agroRecorde") || 0;
    document.getElementById("recorde-valor").innerText = salvo;
});

function iniciarJogo() {
    dinheiro = 1000;
    sustentabilidade = 100;
    producao = 50;
    rodada = 1;
    construcoes = [true, false, false, false, false, false];

    resetarMapaVisual();
    document.getElementById("painel-evento").classList.add("escondido");
    document.getElementById("btn-solar").style.opacity = "1";
    document.getElementById("btn-drone").style.opacity = "1";

    atualizarInterface();
    document.getElementById('tela-inicial').classList.add('escondido');
    document.getElementById('tela-fim').classList.add('escondido');
    document.getElementById('tela-jogo').classList.remove('escondido');
}

function atualizarInterface() {
    document.getElementById('res-dinheiro').innerText = `R$ ${dinheiro}`;
    document.getElementById('res-sustentabilidade').innerText = `${sustentabilidade}%`;
    document.getElementById('res-producao').innerText = `${producao}%`;
    document.getElementById('res-rodada').innerText = rodada;

    if (sustentabilidade > 100) sustentabilidade = 100;
    if (producao > 100) producao = 100;

    // Condições instantâneas de game over
    if (sustentabilidade <= 0) finalizarJogo("❌ Desastre Ambiental", "Sua fazenda esgotou os recursos naturais do solo. O ecossistema ruiu!");
    else if (producao <= 0) finalizarJogo("❌ Escassez de Alimentos", "Sua produção foi a zero. Você faliu por não ter o que colher.");
    else if (dinheiro < 0) finalizarJogo("❌ Falência Financeira", "Suas dívidas superaram o caixa da fazenda.");
}

function tomarDecisao(tipo) {
    const feedback = document.getElementById('feedback-campo');

    if (tipo === 'agrotoxico' && verificarDinheiro(100)) {
        dinheiro -= 100; producao += 30; sustentabilidade -= 20;
        adicionarAoMapa("🌱", "Plantação");
        feedback.innerText = "Pesticida químico injetado! Insetos eliminados, mas a terra sofreu.";
    } 
    else if (tipo === 'organico' && verificarDinheiro(150)) {
        dinheiro -= 150; producao += 10; sustentabilidade += 20;
        adicionarAoMapa("🌻", "Orgânico");
        feedback.innerText = "Adubo orgânico distribuído. Solo enriquecido e protegido!";
    } 
    else if (tipo === 'solar' && verificarDinheiro(400)) {
        if (!construcoes.includes("☀️")) {
            dinheiro -= 400; sustentabilidade += 30;
            adicionarAoMapa("☀️", "Energia Solar");
            document.getElementById("btn-solar").style.opacity = "0.4";
            feedback.innerText = "Matriz solar ativada! Energia limpa garantida.";
        } else { alert("Você já tem uma usina solar!"); }
    } 
    else if (tipo === 'drone' && verificarDinheiro(350)) {
        if (!construcoes.includes("🛸")) {
            dinheiro -= 350; producao += 25;
            adicionarAoMapa("🛸", "Drone Hangar");
            document.getElementById("btn-drone").style.opacity = "0.4";
            feedback.innerText = "Hangar de drones construído. Mapeamento aéreo iniciado!";
        } else { alert("Você já tem um Hangar de Drones!"); }
    }
    atualizarInterface();
}

function verificarDinheiro(custo) {
    if (dinheiro >= custo) return true;
    alert("Saldo insuficiente!");
    return false;
}

function adicionarAoMapa(emoji, nome) {
    // Procura o primeiro slot vazio e constrói nele
    for (let i = 1; i < construcoes.length; i++) {
        if (construcoes[i] === false) {
            construcoes[i] = emoji;
            let slot = document.getElementById(`slot-${i}`);
            slot.innerHTML = `${emoji}<br><span>${nome}</span>`;
            break;
        }
    }
}

function resetarMapaVisual() {
    for (let i = 1; i < 6; i++) {
        document.getElementById(`slot-${i}`).innerHTML = `🟫<br><span>Vazio</span>`;
    }
}

function passarRodada() {
    // Lucro gerado no turno baseado na eficiência atual
    let lucroBase = Math.floor((producao * 12) + (sustentabilidade * 6));
    dinheiro += lucroBase;
    
    // Pequeno desgaste fixo por turno
    sustentabilidade -= 5; 
    
    rodada++;

    if (rodada > 10) {
        let pontosfinais = dinheiro + (sustentabilidade * 10) + (producao * 5);
        
        // Lógica de Recorde salvo
        let recordeAtual = localStorage.getItem("agroRecorde") || 0;
        if (pontosfinais > recordeAtual) {
            localStorage.setItem("agroRecorde", pontosfinais);
            finalizarJogo("🏆 NOVO RECORDE!", `Incrível! Você se provou o mestre do Agro Sustentável!`, pontosfinais);
        } else {
            finalizarJogo("🏁 Simulação Concluída", "Você manteve a fazenda funcionando e concluiu as 10 safras!", pontosfinais);
        }
    } else {
        document.getElementById('feedback-campo').innerText = `🌾 Fim do turno! A venda da colheita rendeu R$ ${lucroBase}.`;
        acionarEventoAleatorio();
        atualizarInterface();
    }
}

function acionarEventoAleatorio() {
    // 60% de chance de acontecer um evento surpresa a cada início de turno
    if (Math.random() > 0.4) {
        let sorteado = eventos[Math.floor(Math.random() * eventos.length)];
        document.getElementById("evento-titulo").innerText = sorteado.titulo;
        document.getElementById("evento-desc").innerText = sorteado.desc;
        document.getElementById("painel-evento").classList.remove("escondido");
        sorteado.efeito();
    } else {
        document.getElementById("painel-evento").classList.add("escondido");
    }
}

function finalizarJogo(titulo, mensagem, pontos = 0) {
    document.getElementById('tela-jogo').classList.add('escondido');
    document.getElementById('tela-fim').classList.remove('escondido');
    
    document.getElementById('fim-titulo').innerText = titulo;
    document.getElementById('fim-mensagem').innerText = mensagem;
    document.getElementById('pontos-finais').innerText = pontos;
}

function reiniciarJogo() {
    // Atualiza o menu com o recorde atualizado antes de recomeçar
    document.getElementById("recorde-valor").innerText = localStorage.getItem("agroRecorde") || 0;
    iniciarJogo();
}