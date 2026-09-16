let cacheFrequencias = [];

function abrirMenuFrequencia() {
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('submenu-frequencia').classList.remove('hidden');
}

function voltarAoSubmenuFrequencia() {
    document.getElementById('modulo-frequencia').classList.add('hidden');
    document.getElementById('modulo-consulta-frequencia').classList.add('hidden');
    document.getElementById('submenu-frequencia').classList.remove('hidden');
}

function abrirFormularioFrequencia() {
    document.getElementById('submenu-frequencia').classList.add('hidden');
    document.getElementById('modulo-frequencia').classList.remove('hidden');
    document.getElementById('freq-data').valueAsDate = new Date();
    
    carregarAlunosGlobal(alunos => {
        const selSerie = document.getElementById('freq-serie');
        selSerie.innerHTML = '<option value="">Selecione a série...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => {
            let o = document.createElement('option');
            o.value = s;
            o.text = s;
            selSerie.appendChild(o);
        });
    });
}

function carregarAlunosPorSerieFreq() {
    const serie = document.getElementById('freq-serie').value;
    const selAluno = document.getElementById('freq-aluno');
    selAluno.innerHTML = '<option value="">Selecione o aluno...</option>';
    if(!serie) return;
    
    listaDeAlunos.filter(a => a.serie === serie).forEach(a => {
        let opt = document.createElement('option');
        opt.value = a.ra;
        opt.text = `${a.nome} (RA: ${a.ra}) - Turma: ${a.turma || ''}`;
        selAluno.appendChild(opt);
    });
}

// 🚀 SALVAR FREQUÊNCIA DIRETAMENTE NO SUPABASE
async function salvarFrequencia() {
    const dataFreq = document.getElementById('freq-data').value;
    const ra = document.getElementById('freq-aluno').value;
    const status = document.getElementById('freq-status').value;
    const justificativa = document.getElementById('freq-justificativa').value;
    const obs = document.getElementById('freq-obs').value;
    
    if(!dataFreq || !ra) {
        alert("Preencha a data e selecione o aluno.");
        return;
    }
    
    let aluno = listaDeAlunos.find(a => String(a.ra) === String(ra));
    
    const { error } = await _supabase.from('frequencias').insert([{
        usuario: 'Teste Aberto', // Temporário enquanto validamos a plataforma aberta
        data_frequencia: dataFreq,
        ra: aluno.ra,
        nome: aluno.nome,
        serie: aluno.serie,
        status: status,
        justificativa: justificativa,
        obs: obs
    }]);

    if (error) {
        alert("Erro ao salvar no Supabase: " + error.message);
    } else {
        alert("Frequência salva com sucesso no Supabase!");
        voltarAoSubmenuFrequencia();
    }
}

// 🚀 CONSULTAR FREQUÊNCIAS DIRETAMENTE DO SUPABASE
async function abrirTelaConsultaFrequencia() {
    document.getElementById('submenu-frequencia').classList.add('hidden');
    document.getElementById('modulo-consulta-frequencia').classList.remove('hidden');
    
    // Limpa filtros antigos se existirem na tela
    const filtroData = document.getElementById('filtro-data-freq');
    const filtroBusca = document.getElementById('filtro-busca-freq');
    if(filtroData) filtroData.value = '';
    if(filtroBusca) filtroBusca.value = '';
    
    const { data, error } = await _supabase
        .from('frequencias')
        .select('*')
        .order('id', { ascending: false });
        
    if (error) {
        alert("Erro ao buscar registros: " + error.message);
        return;
    }
    
    cacheFrequencias = data || [];
    renderizarTabelaFrequencia(cacheFrequencias);
}

function filtrarTabelaFrequencia() {
    const dataFiltro = document.getElementById('filtro-data-freq') ? document.getElementById('filtro-data-freq').value : '';
    const busca = document.getElementById('filtro-busca-freq') ? document.getElementById('filtro-busca-freq').value.toLowerCase() : '';
    
    let filtrados = cacheFrequencias.filter(l => {
        let dataRegFmt = l.data_frequencia ? l.data_frequencia.split('T')[0] : "";
        let matchData = (!dataFiltro || dataRegFmt === dataFiltro);
        let matchBusca = (!busca || l.nome.toLowerCase().includes(busca) || String(l.ra).includes(busca) || l.serie.toLowerCase().includes(busca));
        return matchData && matchBusca;
    });
    
    renderizarTabelaFrequencia(filtrados);
}

function limparFiltrosFrequencia() {
    if(document.getElementById('filtro-data-freq')) document.getElementById('filtro-data-freq').value = '';
    if(document.getElementById('filtro-busca-freq')) document.getElementById('filtro-busca-freq').value = '';
    renderizarTabelaFrequencia(cacheFrequencias);
}

function renderizarTabelaFrequencia(lista) {
    const corpo = document.getElementById('corpo-tabela-frequencia');
    if(!corpo) return; 
    corpo.innerHTML = "";
    
    if(lista.length === 0) {
        corpo.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #666;">Nenhum registro encontrado.</td></tr>`;
        return;
    }
    
    lista.forEach(l => {
        let dataFmt = l.data_frequencia ? new Date(l.data_frequencia).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "-";
        
        corpo.innerHTML += `<tr>
            <td>${dataFmt}</td>
            <td><strong>${l.nome}</strong></td>
            <td>${l.ra}</td>
            <td>${l.serie}</td>
            <td>${l.status || ''}</td>
            <td>${l.justificativa || ''}</td>
            <td>${l.obs || ''}</td>
        </tr>`;
    });
}
