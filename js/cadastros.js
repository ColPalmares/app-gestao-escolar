// Navegação
function abrirMenuCadastros() {
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('modulo-cadastros').classList.remove('hidden');
    carregarListasCadastros();
}

// Carregar tabelas ao abrir a tela
async function carregarListasCadastros() {
    // Carregar Anos Letivos
    const { data: anos } = await _supabase.from('anos_letivos').select('*').order('ano', { ascending: false });
    const tbodyAnos = document.getElementById('lista-anos');
    tbodyAnos.innerHTML = "";
    if(anos) anos.forEach(a => {
        tbodyAnos.innerHTML += `<tr><td>${a.ano}</td><td>${a.ativo ? '🟢 Vigente' : 'Inativo'}</td></tr>`;
    });

    // Carregar Turmas
    const { data: turmas } = await _supabase.from('turmas').select('*').order('serie');
    const tbodyTurmas = document.getElementById('lista-turmas');
    tbodyTurmas.innerHTML = "";
    if(turmas) turmas.forEach(t => {
        tbodyTurmas.innerHTML += `<tr><td>${t.serie}</td><td>${t.nome}</td></tr>`;
    });

    // Carregar Disciplinas
    const { data: disc } = await _supabase.from('disciplinas').select('*').order('nome');
    const tbodyDisc = document.getElementById('lista-disciplinas');
    tbodyDisc.innerHTML = "";
    if(disc) disc.forEach(d => {
        tbodyDisc.innerHTML += `<tr><td>${d.nome}</td><td>${d.area || '-'}</td></tr>`;
    });
}

// Salvar Ano Letivo
async function salvarAnoLetivo() {
    const ano = document.getElementById('cad-ano').value;
    const ativo = document.getElementById('cad-ano-ativo').checked;
    
    if(!ano) return alert("Digite o ano!");

    // Se marcou como ativo, desativa os outros primeiro
    if (ativo) {
        await _supabase.from('anos_letivos').update({ ativo: false }).neq('ano', 0);
    }

    const { error } = await _supabase.from('anos_letivos').insert([{ ano: parseInt(ano), ativo: ativo }]);
    if (error) alert("Erro: " + error.message);
    else { document.getElementById('cad-ano').value = ""; carregarListasCadastros(); }
}

// Salvar Turma
async function salvarTurma() {
    const serie = document.getElementById('cad-turma-serie').value;
    const nome = document.getElementById('cad-turma-nome').value;
    
    if(!serie || !nome) return alert("Preencha Série e Nome da Turma!");

    const { error } = await _supabase.from('turmas').insert([{ serie: serie, nome: nome }]);
    if (error) alert("Erro: " + error.message);
    else { 
        document.getElementById('cad-turma-serie').value = ""; 
        document.getElementById('cad-turma-nome').value = ""; 
        carregarListasCadastros(); 
    }
}

// Salvar Disciplina
async function salvarDisciplina() {
    const nome = document.getElementById('cad-disc-nome').value;
    const area = document.getElementById('cad-disc-area').value;
    
    if(!nome) return alert("Preencha o Nome da Disciplina!");

    const { error } = await _supabase.from('disciplinas').insert([{ nome: nome, area: area }]);
    if (error) alert("Erro: " + error.message);
    else { 
        document.getElementById('cad-disc-nome').value = ""; 
        document.getElementById('cad-disc-area').value = ""; 
        carregarListasCadastros(); 
    }
}
