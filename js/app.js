// Removidos temporariamente o CLIENT_ID e a API_URL do Google Apps Script

// 🚀 Simulando um usuário logado com acesso total para testes
let usuarioLogado = "Teste Aberto";
let dadosEscopoUsuario = { perfil: 'admin', serieEscopo: 'Todas', materiaEscopo: 'Todas' }; 
let listaDeAlunos = [];

window.onload = function () {
    // 1. Esconde a tela de login e vai direto pro menu principal
    const telaLogin = document.getElementById('tela-login');
    if(telaLogin) telaLogin.classList.add('hidden');
    
    document.getElementById('tela-menu').classList.remove('hidden');
    document.getElementById('msg-bem-vindo').innerText = "Modo de Teste Aberto (Supabase)";
    
    // 2. Esconde o aviso de "Carregando permissões"
    document.getElementById('carregando-permissoes').classList.add('hidden');
    document.getElementById('lista-modulos').classList.remove('hidden');
    
    // 3. Exibe todos os botões dos módulos ignorando as restrições
    document.getElementById('btn-mod-saida').style.display = 'block';
    document.getElementById('btn-mod-frequencia').style.display = 'block';
    document.getElementById('btn-mod-ocorrencias').style.display = 'block';
    document.getElementById('btn-mod-notas').style.display = 'block';
};

function voltarAoMenuPrincipal() {
    const telas = document.querySelectorAll('.container > div');
    telas.forEach(div => {
        if(div.id !== 'tela-menu' && div.id !== 'tela-login' && !div.classList.contains('logo-container')) {
            div.classList.add('hidden');
        }
    });
    document.getElementById('tela-menu').classList.remove('hidden');
}

// 🚀 BUSCAR ALUNOS DIRETAMENTE DO SUPABASE
async function carregarAlunosGlobal(callback) {
    if (listaDeAlunos.length > 0) {
        if(callback) callback(listaDeAlunos);
        return;
    }
    
    const { data, error } = await _supabase
        .from('alunos')
        .select('*')
        .order('nome', { ascending: true });
        
    if (error) {
        console.error("Erro ao buscar alunos do Supabase:", error);
        return;
    }
    
    // 🚀 Normaliza os dados igual fazíamos no Apps Script antigo
    listaDeAlunos = (data || []).map(a => ({
        ...a,
        ra: String(a.ra), // Força o RA a ser texto para os filtros não quebrarem
        turma: a.turma ? String(a.turma) : "Única" // Se estiver vazio, vira Única
    }));
    
    if(callback) callback(listaDeAlunos);
}
