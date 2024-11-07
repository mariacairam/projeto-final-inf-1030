var animacao = document.getElementById("animacao");
var botaoJogar = document.getElementById("botao-jogar");
var botaoInstrucoes = document.getElementById("botao-instrucoes");
var popupAtividade = document.getElementById("pop-up-atividade");
var popupInstrucoes = document.getElementById("pop-up-instrucoes");
var fechaPopup = document.querySelectorAll(".fecha-popup");

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

