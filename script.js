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
    "atividade-1": {
        nome: "jogar League of Legends",
        energia: 500
    },
    "atividade-2": {
        nome: "usar ChatGPT",
        energia: 10
    },
    "atividade-3": {
        nome: "usar ar-condicionado",
        energia: 670
    }
};

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
    elemento.style.display = "none";
    conversor.style.display = "flex";
    menu.style.display = "none";
    modoJogo = true;
}

for (let i = 0; i < atividades.length; i++) {
    atividades[i].onclick = () => {jogar(popupAberto, atividades[i])};
}

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

let timeout;

document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && modoJogo) {
        event.preventDefault();
        animarFrames(); 

        if (energiaAcumulada == listaEnergia[atividadeEscolhida].energia){
            clearTimeout(timeout);
            abrirConversor("Parabéns! você gerou energia suficiente para realizar sua atividade");
        }

        else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                abrirConversor("Que pena! você não foi rápido o suficiente para gerar energia.");
            }, 250);
        }
    }
});

//abrir pop-up de painel conversor
function abrirConversor(mensagem){
    modoJogo = null;
    frameAtual = 0;
    mensagemFinal.innerHTML = mensagem;
    resultado = 0.0389*0.365*listaEnergia[atividadeEscolhida].energia;
    energiaGerada.innerHTML = "Você gerou " + energiaAcumulada + " Watts de " + listaEnergia[atividadeEscolhida].energia + " Watts necessários para " + listaEnergia[atividadeEscolhida].nome + "! Agora parece muito, né? Essa energia toda é transformada em carbono na atmosfera. Fazendo todo dia essa atividade, você libera " + parseFloat(resultado.toFixed(1)) + " kg de CO2." ;
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