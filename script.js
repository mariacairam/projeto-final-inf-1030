var animacao = document.getElementById("animacao");
var botaoJogar = document.getElementById("botao-jogar");
var botaoInstrucoes = document.getElementById("botao-instrucoes");
var popupAtividade = document.getElementById("pop-up-atividade");
var popupInstrucoes = document.getElementById("pop-up-instrucoes");
var fechaPopup = document.querySelectorAll(".fecha-popup");
var conversor = document.getElementById("conversor");
var menu = document.getElementById("menu");
var atividades = document.querySelectorAll(".atividade-n");
var frame = document.getElementById("frame");
var interrogacao = document.getElementById("interrogacao");
var instrucoes = document.getElementById("instrucoes-no-jogo");
var popupConversor = document.getElementById("pop-up-conversora");
var botaoConversor = document.getElementById("botao-conversor");
var botaoRetornar = document.getElementById("botao-voltar-menu");
var botaoJogarNovo = document.getElementById("botao-jogar-novamente");
var resumoEnergia = document.getElementById("resumo-energia");
var mensagemFinal = document.getElementById("mensagem-final");
var energiaGerada = document.getElementById("energia");

var frames = ["assets/frame1.png", "assets/frame2.png"];

modoJogo = null;

var frameAtual = 0;

var listaEnergia = {
    "atividade-1" : 3000,
    "atividade-2" : 10000,
    "atividade-3": 6000
}

var atividadeEscolhida = null;
var energiaAcumulada = 0;

//abrir e fechar pop-ups de escolha de atividade e instruções
var popupAberto = null;

function mostrarPopup(elemento){
    elemento.style.display = "flex";
    popupAberto = elemento;
}

botaoJogar.onclick = () => {mostrarPopup(popupAtividade)};
botaoInstrucoes.onclick = () => {mostrarPopup(popupInstrucoes)};

function fecharPopup(elemento){
    elemento.style.display = "none";
}

for (let i = 0; i < fechaPopup.length; i++) {
    fechaPopup[i].onclick = () => {fecharPopup(popupAberto)};
}

//função entrar no jogo
function jogar(elemento, atividade){
    atividadeEscolhida = atividade.getAttribute('id');
    console.log(listaEnergia[atividadeEscolhida]);
    elemento.style.display = "none";
    conversor.style.display = "flex";
    menu.style.display = "none";
    modoJogo = true;
}

for (let i = 0; i < atividades.length; i++) {
    atividades[i].onclick = () => {jogar(popupAberto, atividades[i])};
}

//botão de instruções (hover)
function mostrarInstrucoes(){
    instrucoes.style.opacity = "1";

}
interrogacao.onmouseenter = mostrarInstrucoes;

function fecharInstrucoes(){
    instrucoes.style.opacity = "0";
}
interrogacao.onmouseleave = fecharInstrucoes;

//animando frames quando a tecla espaço é clicada
function animarFrames(){
    if(atividadeEscolhida){
        frameAtual = (frameAtual + 1) % frames.length;
        frame.src = frames[frameAtual];
        energiaAcumulada += 1;
        resumoEnergia.innerHTML = energiaAcumulada;
        console.log("Frame atual:", frameAtual, "SRC:", frame.src);
    }
}

let ultimoInstante = 0;
let timeout;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && modoJogo) {
        event.preventDefault();
        animarFrames(); 

        const tempoAtual = Date.now();

        if (ultimoInstante !== 0) {
            const intervalo = tempoAtual - ultimoInstante;

            if (intervalo > 250) {
                abrirConversor("Que pena! você não foi rápido o suficiente para gerar energia.");
                return;
            }
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            abrirConversor("Que pena! você não foi rápido o suficiente para gerar energia.");
        }, 250);

        ultimoInstante = tempoAtual;
    }
});

//abrir pop-up de painel conversor
function abrirConversor(mensagem){
    modoJogo = null;
    ultimoInstante = 0;
    intervalo = 0;
    frameAtual = 0;
    mensagemFinal.innerHTML = mensagem;
    energiaGerada.innerHTML = "Você gerou " + energiaAcumulada + "Watts de " + listaEnergia[atividadeEscolhida] + " KWatts";
    popupConversor.style.display = "flex";
    energiaAcumulada = 0;
}
botaoConversor.onclick = () => {abrirConversor("Resumo da rodada:")};


//botão retornar ao menu inicial
function retornarMenu(){
    atividadeEscolhida = null;
    resumoEnergia.innerHTML = energiaAcumulada ;
    popupConversor.style.display = "none";
    conversor.style.display = "none";
    menu.style.display = "flex";

}
botaoRetornar.onclick = retornarMenu;

//botão jjogar novamente mesma atividade
function jogarNovamente(){
    modoJogo = true;
    resumoEnergia.innerHTML = energiaAcumulada ;
    popupConversor.style.display = "none";
}
botaoJogarNovo.onclick = jogarNovamente;