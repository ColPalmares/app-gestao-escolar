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


// ==========================================
// GESTÃO DE ALUNOS
// ==========================================

function abrirMenuAlunos() {
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('modulo-alunos').classList.remove('hidden');
    carregarSeriesCadastroAluno();
}

async function carregarSeriesCadastroAluno() {
    const selSerie = document.getElementById('cad-aluno-serie');
    selSerie.innerHTML = '<option value="">Selecione a série...</option>';
    
    // Puxa as séries únicas da tabela de turmas
    const { data, error } = await window._supabase.from('turmas').select('serie');
    if (data) {
        const seriesUnicas = [...new Set(data.map(t => t.serie.trim()))];
        seriesUnicas.forEach(s => {
            selSerie.innerHTML += `<option value="${s}">${s}</option>`;
        });
    }
}

async function atualizarTurmasCadastroAluno() {
    const serie = document.getElementById('cad-aluno-serie').value;
    const selTurma = document.getElementById('cad-aluno-turma');
    
    selTurma.innerHTML = '<option value="">Selecione a turma...</option>';
    if (!serie) return;

    const { data, error } = await window._supabase.from('turmas').select('*').eq('serie', serie).order('nome');
    if (data) {
        data.forEach(t => {
            selTurma.innerHTML += `<option value="${t.nome}">${t.nome}</option>`;
        });
    }
}

async function salvarAluno() {
    const ra = document.getElementById('cad-aluno-ra').value.trim();
    const nome = document.getElementById('cad-aluno-nome').value.trim();
    const serie = document.getElementById('cad-aluno-serie').value;
    const turma = document.getElementById('cad-aluno-turma').value;

    if (!ra || !nome || !serie || !turma) {
        alert("Preencha todos os campos, incluindo Série e Turma!");
        return;
    }

    const btnSalvar = document.querySelector('#modulo-alunos button');
    btnSalvar.disabled = true;
    btnSalvar.textContent = "Salvando...";

    // Upsert: Se o RA já existir, ele atualiza a turma. Se for RA novo, ele cria o aluno.
    const { error } = await window._supabase.from('alunos').upsert([{
        ra: ra,
        nome: nome,
        serie: serie,
        turma: turma
    }], { onConflict: 'ra' });

    btnSalvar.disabled = false;
    btnSalvar.textContent = "Salvar Aluno";

    if (error) {
        console.error("Erro ao salvar aluno:", error);
        alert("Erro ao salvar aluno: " + error.message);
    } else {
        alert("✅ Aluno salvo com sucesso!");
        document.getElementById('cad-aluno-ra').value = "";
        document.getElementById('cad-aluno-nome').value = "";
        document.getElementById('cad-aluno-serie').value = "";
        document.getElementById('cad-aluno-turma').innerHTML = '<option value="">Selecione a turma...</option>';
        
        // Atualiza a lista global em cache
        if (typeof carregarAlunosGlobal === 'function') {
            carregarAlunosGlobal(() => console.log("Lista recarregada."));
        }
    }
}
