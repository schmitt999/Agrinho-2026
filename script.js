// Estado inicial dos recursos do jogo
let dinheiro = 1000;
let sustentabilidade = 100;
let producao = 50;
let rodada = 1;

// Guarda quais melhorias estruturais já foram compradas
let conquistas = {
    solar: false,
    drone: false
};

function iniciarJogo() {
    dinheiro = 1000;
    sustentabilidade = 100;
    producao = 50;
    rodada = 1;
    conquistas.solar = false;
    conquistas.drone = false;

    document.getElementById('elemento-solar').classList.add('escondido');
    document.getElementById('elemento-drone').classList.add('escondido');

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

    // Garante que os números não passem do limite visual ou fiquem negativos
    if (sustentabilidade > 100) sustentabilidade = 100;
    if (producao > 100) producao = 100;

    // Valida as condições de derrota instantânea
    if (sustentabilidade <= 0) {
        finalizarJogo(false, "Seu solo ficou completamente infértil e a fazenda foi multada por crime ambiental! O futuro precisa de equilíbrio.");
    } else if (producao <= 0) {
        finalizarJogo(false, "Sua produção faliu! Você não colheu alimentos suficientes para abastecer o mercado.");
    } else if (dinheiro < 0) {
        finalizarJogo(false, "Você faliu! Gastou mais dinheiro do que tinha em caixa.");
    }
}

function tomarDecisao(tipo) {
    const feedback = document.getElementById('feedback-campo');

    if (tipo === 'agrotoxico') {
        if (dinheiro >= 100) {
            dinheiro -= 100;
            producao += 25;
            sustentabilidade -= 20;
            feedback.innerText = "⚠️ Agrotóxico aplicado! Insetos eliminados, mas a qualidade do solo e da água despencou.";
        } else { alert("Dinheiro insuficiente!"); }
    } 
    
    else if (tipo === 'organico') {
        if (dinheiro >= 200) {
            dinheiro -= 200;
            producao += 10;
            sustentabilidade += 15;
            feedback.innerText = "🌱 Defensivos biológicos aplicados! Pragas controladas sem agredir a natureza.";
        } else { alert("Dinheiro insuficiente!"); }
    } 
    
    else if (tipo === 'solar') {
        if (dinheiro >= 400) {
            if (!conquistas.solar) {
                dinheiro -= 400;
                conquistas.solar = true;
                sustentabilidade += 20;
                document.getElementById('elemento-solar').classList.remove('escondido');
                feedback.innerText = "☀️ Painéis fotovoltaicos instalados! Redução drástica na pegada de carbono da fazenda.";
            } else { alert("Você já possui Energia Solar instalada!"); }
        } else { alert("Dinheiro insuficiente!"); }
    } 
    
    else if (tipo === 'drone') {
        if (dinheiro >= 350) {
            if (!conquistas.drone) {
                dinheiro -= 350;
                conquistas.drone = true;
                producao += 15;
                document.getElementById('elemento-drone').classList.remove('escondido');
                feedback.innerText = "🛸 Drone de mapeamento ativo! Irrigação e plantio controlados com precisão cirúrgica.";
            } else { alert("Você já possui Drones ativos!"); }
        } else { alert("Dinheiro insuficiente!"); }
    }

    atualizarInterface();
}

// Passar a rodada executa a colheita e gera lucros baseados na produção
function passarRodada() {
    // Rendimento: quanto maior a produção e a sustentabilidade juntas, mais você ganha
    let lucroColheita = Math.floor((producao * 10) + (sustentabilidade * 5));
    dinheiro += lucroColheita;

    // Bônus passivos das estruturas compradas
    if (conquistas.solar) sustentabilidade += 5;
    if (conquistas.drone) dinheiro += 50;

    // Desgaste natural do turno
    sustentabilidade -= 5; 

    rodada++;

    // Verifica se chegou ao fim das 10 rodadas com sucesso
    if (rodada > 10) {
        if (sustentabilidade >= 70 && dinheiro >= 1500) {
            finalizarJogo(true, `Parabéns! Você alcançou o verdadeiro Agro Forte e Sustentável. Terminou com R$ ${dinheiro} em caixa e uma fazenda ecologicamente exemplar.`);
        } else {
            finalizarJogo(true, `Você sobreviveu às 10 rodadas! Porém, sua fazenda ainda precisa equilibrar melhor as finanças e o ecossistema para ganhar o selo Ouro Verde.`);
        }
    } else {
        document.getElementById('feedback-campo').innerText = `🌾 Fim da temporada! A colheita gerou R$ ${lucroColheita} de lucro. Próxima rodada iniciada.`;
        atualizarInterface();
    }
}

function finalizarJogo(vitoria, mensagem) {
    document.getElementById('tela-jogo').classList.add('escondido');
    document.getElementById('tela-fim').classList.remove('escondido');
    
    const titulo = document.getElementById('fim-titulo');
    titulo.innerText = vitoria ? "🏆 Vitória Ecológica!" : "❌ Fim de Jogo";
    titulo.style.color = vitoria ? "#2e7d32" : "#d32f2f";
    
    document.getElementById('fim-mensagem').innerText = mensaje || mensagem;
}

function reiniciarJogo() {
    iniciarJogo();
}