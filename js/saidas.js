let cacheSaidas = [];

function abrirMenuSaida() {
    document.getElementById('tela-menu').classList.add('hidden');
    document.getElementById('submenu-saida').classList.remove('hidden');
}

function voltarAoSubmenuSaida() {
    document.getElementById('modulo-saida').classList.add('hidden');
    document.getElementById('modulo-consulta-saida').classList.add('hidden');
    document.getElementById('submenu-saida').classList.remove('hidden');
}

function abrirFormularioSaida() {
    document.getElementById('submenu-saida').classList.add('hidden');
    document.getElementById('modulo-saida').classList.remove('hidden');
    document.getElementById('saida-data').valueAsDate = new Date();
    
    carregarAlunosGlobal(alunos => {
        const selSerie = document.getElementById('saida-serie');
        selSerie.innerHTML = '<option value="">Selecione...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => {
            let o = document.createElement('option');
            o.value = s;
            o.text = s;
            selSerie.appendChild(o);
        });
    });
}

function carregarAlunosPorSerieSaida() {
    const serie = document.getElementById('saida-serie').value;
    const selAluno = document.getElementById('saida-aluno');
    selAluno.innerHTML = '<option value="">Selecione o aluno...</option>';
    if(!serie) return;
    
    listaDeAlunos.filter(a => a.serie === serie).forEach(a => {
        let opt = document.createElement('option');
        opt.value = a.ra;
        opt.text = `${a.nome} (RA: ${a.ra}) - Turma: ${a.turma}`;
        selAluno.appendChild(opt);
    });
}

function salvarSaida() {
    const data = document.getElementById('saida-data').value;
    const ra = document.getElementById('saida-aluno').value;
    const tipo = document.getElementById('saida-tipo').value;
    const desc = document.getElementById('saida-descricao').value;
    
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
            modulo: 'autorizacao_saida',
            emailUsuario: usuarioLogado,
            dataSaida: data,
            nome: aluno.nome,
            ra: aluno.ra,
            serie: aluno.serie,
            tipo: tipo,
            descricao: desc
        })
    }).then(() => {
        alert("Autorização salva com sucesso!");
        voltarAoSubmenuSaida();
    });
}

function abrirTelaConsultaSaida() {
    document.getElementById('submenu-saida').classList.add('hidden');
    document.getElementById('modulo-consulta-saida').classList.remove('hidden');
    document.getElementById('filtro-tipo-saida').value = 'TODOS';
    document.getElementById('filtro-data-saida').value = '';
    document.getElementById('filtro-busca-saida').value = '';
    
    fetch(API_URL + '?acao=buscarRegistrosSaida')
        .then(res => res.json())
        .then(lista => {
            cacheSaidas = lista;
            renderizarTabelaSaidas(lista);
        });
}

function filtrarTabelaSaidas() {
    const tipoFiltro = document.getElementById('filtro-tipo-saida').value;
    const dataFiltro = document.getElementById('filtro-data-saida').value;
    const busca = document.getElementById('filtro-busca-saida').value.toLowerCase();
    
    let filtrados = cacheSaidas.filter(l => {
        let matchTipo = (tipoFiltro === 'TODOS' || l.tipo === tipoFiltro);
        let dataRegFmt = l.dataSaida ? l.dataSaida.split('T')[0] : "";
        let matchData = (!dataFiltro || dataRegFmt === dataFiltro);
        let matchBusca = (!busca || l.nome.toLowerCase().includes(busca) || String(l.ra).includes(busca) || l.serie.toLowerCase().includes(busca));
        return matchTipo && matchData && matchBusca;
    });
    
    renderizarTabelaSaidas(filtrados);
}

function limparFiltrosSaida() {
    document.getElementById('filtro-tipo-saida').value = 'TODOS';
    document.getElementById('filtro-data-saida').value = '';
    document.getElementById('filtro-busca-saida').value = '';
    renderizarTabelaSaidas(cacheSaidas);
}

function renderizarTabelaSaidas(lista) {
    const corpo = document.getElementById('corpo-tabela-saidas');
    corpo.innerHTML = "";
    
    if(lista.length === 0) {
        corpo.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #666;">Nenhum registro encontrado.</td></tr>`;
        return;
    }
    
    lista.forEach(l => {
        let dataFmt = l.dataSaida ? new Date(l.dataSaida).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "-";
        corpo.innerHTML += `<tr>
            <td>${new Date(l.dataRegistro).toLocaleDateString()}</td>
            <td>${l.usuario}</td>
            <td>${dataFmt}</td>
            <td><strong>${l.nome}</strong></td>
            <td>${l.ra}</td>
            <td>${l.serie}</td>
            <td>${l.tipo}</td>
            <td>${l.descricao}</td>
        </tr>`;
    });
}
