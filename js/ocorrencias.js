let cacheOcorrencias = [];

function abrirMenuOcorrencias() {
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('submenu-ocorrencias').classList.remove('hidden');
}

function voltarAoSubmenuOcorrencias() {
    document.getElementById('modulo-ocorrencia').classList.add('hidden');
    document.getElementById('modulo-consulta-ocorrencia').classList.add('hidden');
    document.getElementById('submenu-ocorrencias').classList.remove('hidden');
}

function abrirFormularioOcorrencia() {
    document.getElementById('submenu-ocorrencias').classList.add('hidden');
    document.getElementById('modulo-ocorrencia').classList.remove('hidden');
    document.getElementById('ocorrencia-data').valueAsDate = new Date();
    
    carregarAlunosGlobal(alunos => {
        const sel = document.getElementById('ocorrencia-serie');
        sel.innerHTML = '<option value="">Selecione...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => {
            let o = document.createElement('option'); o.value = s; o.text = s; sel.appendChild(o);
        });
    });
}

function carregarAlunosPorSerieOcorrencia() {
    const serie = document.getElementById('ocorrencia-serie').value;
    const selAluno = document.getElementById('ocorrencia-aluno');
    selAluno.innerHTML = '<option value="">Selecione o aluno...</option>';
    if(!serie) return;
    
    listaDeAlunos.filter(a => a.serie === serie).forEach(a => {
        let opt = document.createElement('option');
        opt.value = a.ra;
        opt.text = `${a.nome} (RA: ${a.ra}) - Turma: ${a.turma}`;
        selAluno.appendChild(opt);
    });
}

function salvarOcorrencia() {
    const data = document.getElementById('ocorrencia-data').value;
    const ra = document.getElementById('ocorrencia-aluno').value;
    const tipo = document.getElementById('ocorrencia-tipo').value;
    const relato = document.getElementById('ocorrencia-relato').value;
    const sancao = document.getElementById('ocorrencia-sancao').value;
    
    if(!data || !ra || !tipo) {
        alert("Preencha os campos obrigatórios (Data, Aluno e Tipo).");
        return;
    }
    
    let aluno = listaDeAlunos.find(a => String(a.ra) === String(ra));
    
    fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            modulo: 'ocorrencias',
            emailUsuario: usuarioLogado,
            dataOcorrencia: data,
            serie: aluno.serie,
            nome: aluno.nome,
            ra: aluno.ra,
            tipoOcorrencia: tipo,
            relato: relato,
            sancao: sancao
        })
    }).then(() => {
        alert("Ocorrência salva com sucesso!");
        voltarAoSubmenuOcorrencias();
    });
}

function abrirTelaConsultaOcorrencia() {
    document.getElementById('submenu-ocorrencias').classList.add('hidden');
    document.getElementById('modulo-consulta-ocorrencia').classList.remove('hidden');
    document.getElementById('filtro-data-ocorrencia').value = '';
    document.getElementById('filtro-busca-ocorrencia').value = '';
    
    fetch(API_URL + '?acao=buscarRegistrosOcorrencias')
        .then(res => res.json())
        .then(lista => {
            cacheOcorrencias = lista;
            renderizarTabelaOcorrencias(lista);
        });
}

function filtrarTabelaOcorrencias() {
    const dataFiltro = document.getElementById('filtro-data-ocorrencia').value;
    const busca = document.getElementById('filtro-busca-ocorrencia').value.toLowerCase();
    
    let filtrados = cacheOcorrencias.filter(l => {
        let dataRegFmt = l.dataOcorrencia ? l.dataOcorrencia.split('T')[0] : "";
        let matchData = (!dataFiltro || dataRegFmt === dataFiltro);
        let matchBusca = (!busca || l.nome.toLowerCase().includes(busca) || String(l.ra).includes(busca) || l.serie.toLowerCase().includes(busca));
        return matchData && matchBusca;
    });
    
    renderizarTabelaOcorrencias(filtrados);
}

function limparFiltrosOcorrencia() {
    document.getElementById('filtro-data-ocorrencia').value = '';
    document.getElementById('filtro-busca-ocorrencia').value = '';
    renderizarTabelaOcorrencias(cacheOcorrencias);
}

function renderizarTabelaOcorrencias(lista) {
    const corpo = document.getElementById('corpo-tabela-ocorrencias');
    corpo.innerHTML = "";
    
    if(lista.length === 0) {
        corpo.innerHTML = `<tr><td colspan="9" style="text-align: center; color: #666;">Nenhum registro encontrado.</td></tr>`;
        return;
    }
    
    lista.forEach(l => {
        let dataFmt = l.dataOcorrencia ? new Date(l.dataOcorrencia).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "-";
        corpo.innerHTML += `<tr>
            <td>${new Date(l.dataRegistro).toLocaleDateString()}</td>
            <td>${l.usuario}</td>
            <td>${dataFmt}</td>
            <td>${l.serie}</td>
            <td><strong>${l.nome}</strong></td>
            <td>${l.ra}</td>
            <td>${l.tipoOcorrencia}</td>
            <td>${l.relato}</td>
            <td>${l.sancao}</td>
        </tr>`;
    });
}
