let cacheFrequencia = [];

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
        const sel = document.getElementById('freq-serie');
        sel.innerHTML = '<option value="">Selecione...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => {
            let o = document.createElement('option'); o.value = s; o.text = s; sel.appendChild(o);
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
        opt.text = `${a.nome} (RA: ${a.ra}) - Turma: ${a.turma}`;
        selAluno.appendChild(opt);
    });
}

function salvarFrequencia() {
    const data = document.getElementById('freq-data').value;
    const ra = document.getElementById('freq-aluno').value;
    const status = document.getElementById('freq-status').value;
    const just = document.getElementById('freq-justificativa').value;
    const obs = document.getElementById('freq-obs').value;
    
    if(!data || !ra) {
        alert("Preencha a data e selecione o aluno.");
        return;
    }
    
    let aluno = listaDeAlunos.find(a => String(a.ra) === String(ra));
    
    fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            modulo: 'frequencia',
            emailUsuario: usuarioLogado,
            dataFrequencia: data,
            nome: aluno.nome,
            ra: aluno.ra,
            serie: aluno.serie,
            frequencia: status,
            justificativa: just,
            observacoes: obs
        })
    }).then(() => {
        alert("Frequência salva com sucesso!");
        voltarAoSubmenuFrequencia();
    });
}

function abrirTelaConsultaFrequencia() {
    document.getElementById('submenu-frequencia').classList.add('hidden');
    document.getElementById('modulo-consulta-frequencia').classList.remove('hidden');
    document.getElementById('filtro-data-freq').value = '';
    document.getElementById('filtro-busca-freq').value = '';
    
    fetch(API_URL + '?acao=buscarRegistrosFrequencia')
        .then(res => res.json())
        .then(lista => {
            cacheFrequencia = lista;
            renderizarTabelaFrequencia(lista);
        });
}

function filtrarTabelaFrequencia() {
    const dataFiltro = document.getElementById('filtro-data-freq').value;
    const busca = document.getElementById('filtro-busca-freq').value.toLowerCase();
    
    let filtrados = cacheFrequencia.filter(l => {
        let dataRegFmt = l.dataFrequencia ? l.dataFrequencia.split('T')[0] : "";
        let matchData = (!dataFiltro || dataRegFmt === dataFiltro);
        let matchBusca = (!busca || l.nome.toLowerCase().includes(busca) || String(l.ra).includes(busca) || l.serie.toLowerCase().includes(busca));
        return matchData && matchBusca;
    });
    
    renderizarTabelaFrequencia(filtrados);
}

function limparFiltrosFreq() {
    document.getElementById('filtro-data-freq').value = '';
    document.getElementById('filtro-busca-freq').value = '';
    renderizarTabelaFrequencia(cacheFrequencia);
}

function renderizarTabelaFrequencia(lista) {
    const corpo = document.getElementById('corpo-tabela-frequencia');
    corpo.innerHTML = "";
    
    if(lista.length === 0) {
        corpo.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #666;">Nenhum registro encontrado.</td></tr>`;
        return;
    }
    
    lista.forEach(l => {
        let dataFmt = l.dataFrequencia ? new Date(l.dataFrequencia).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "-";
        corpo.innerHTML += `<tr>
            <td>${new Date(l.dataRegistro).toLocaleDateString()}</td>
            <td>${l.usuario}</td>
            <td>${dataFmt}</td>
            <td><strong>${l.nome}</strong></td>
            <td>${l.ra}</td>
            <td>${l.serie}</td>
            <td>${l.frequencia}</td>
            <td>${l.justificativa}</td>
            <td>${l.observacoes}</td>
        </tr>`;
    });
}
