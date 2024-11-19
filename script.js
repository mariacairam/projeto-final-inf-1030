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

var frames = ["assets/placeholder-anim.png", "assets/placeholder-anim2.png"];

var frameAtual = 0;

var listaEnergia = {
    "atividade-1" : 3000,
    "atividade-2" : 10000,
    "atividade-3": 6000
}

var energiaAcumulada = 0;

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


function jogar(elemento, atividade){
    console.log(listaEnergia[atividade.getAttribute('id')]);
    elemento.style.display = "none";
    conversor.style.display = "flex";
    menu.style.display = "none";
}

for (let i = 0; i < atividades.length; i++) {
    atividades[i].onclick = () => {jogar(popupAberto, atividades[i])};
}

function mostrarInstrucoes(){
    instrucoes.style.display = "flex";
}
interrogacao.onmouseenter = mostrarInstrucoes;

function fecharInstrucoes(){
    instrucoes.style.display = "none";
}
interrogacao.onmouseleave = fecharInstrucoes;


function animarFrames(){
    frameAtual = (frameAtual + 1) % frames.length;
    frame.src = frames[frameAtual];
    console.log("Frame atual:", frameAtual, "SRC:", frame.src);
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        event.preventDefault();
        animarFrames();
    }
});

function abrirConversor(){
    popupConversor.style.display = "flex";
}
botaoConversor.onclick = abrirConversor;

function retornarMenu(){
    frameAtual = 0;
    energiaAcumulada = 0;
    popupConversor.style.display = "none";
    conversor.style.display = "none";
    menu.style.display = "flex";
}
botaoRetornar.onclick = retornarMenu;

function jogarNovamente(){
    frameAtual = 0;
    energiaAcumulada = 0;
    popupConversor.style.display = "none";
}
botaoJogarNovo.onclick = jogarNovamente;