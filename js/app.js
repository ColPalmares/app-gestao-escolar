const CLIENT_ID = '293823202125-glofclf9sgueb5vc079v8fas105i1b57.apps.googleusercontent.com'; 
const API_URL = 'https://script.google.com/macros/s/AKfycbwT6wFmQ2qXiaHus3QpWghtrvUS5Gw1U1tmAeSGKONp7PdA3G6No3ntgW7UgQrKKt5W1g/exec';

let usuarioLogado = "";
let dadosEscopoUsuario = {};
let listaDeAlunos = [];

window.onload = function () {
    google.accounts.id.initialize({ client_id: CLIENT_ID, callback: tratarRespostaLogin });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), { theme: "outline", size: "large", text: "continue_with" });
};

function tratarRespostaLogin(resposta) {
    const payload = decodificarJWT(resposta.credential);
    usuarioLogado = payload.email;
    document.getElementById('tela-login').classList.add('hidden');
    document.getElementById('tela-menu').classList.remove('hidden');
    document.getElementById('msg-bem-vindo').innerText = "Logado como: " + usuarioLogado;
    verificarPermissoes(usuarioLogado);
}

function decodificarJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}

function verificarPermissoes(email) {
    fetch(API_URL + '?acao=buscarPermissoes&email=' + encodeURIComponent(email))
        .then(res => res.json())
        .then(resultado => {
            document.getElementById('carregando-permissoes').classList.add('hidden');
            document.getElementById('lista-modulos').classList.remove('hidden');
            dadosEscopoUsuario = resultado;
            const modulos = resultado.modulos || [];
            if (modulos.includes("autorizacao_saida")) document.getElementById('btn-mod-saida').style.display = 'block';
            if (modulos.includes("frequencia")) document.getElementById('btn-mod-frequencia').style.display = 'block';
            if (modulos.includes("ocorrencias")) document.getElementById('btn-mod-ocorrencias').style.display = 'block';
            if (modulos.includes("notas")) document.getElementById('btn-mod-notas').style.display = 'block';
        });
}

function voltarAoMenuPrincipal() {
    const telas = document.querySelectorAll('.container > div');
    telas.forEach(div => {
        if(div.id !== 'tela-menu' && div.id !== 'tela-login' && !div.classList.contains('logo-container')) {
            div.classList.add('hidden');
        }
    });
    document.getElementById('tela-menu').classList.remove('hidden');
}

// Função utilitária global para carregar a lista de alunos em cache e evitar requisições repetidas
function carregarAlunosGlobal(callback) {
    if (listaDeAlunos.length > 0) {
        if(callback) callback(listaDeAlunos);
        return;
    }
    fetch(API_URL + '?acao=buscarAlunos')
        .then(res => res.json())
        .then(alunos => {
            listaDeAlunos = alunos;
            if(callback) callback(listaDeAlunos);
        });
}
