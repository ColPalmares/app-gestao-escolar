let notasJaLancadasGlobal = [];
let pesosSalvosGlobal = [];

const MATRIZ_CURRICULAR = {
    '1º Ano': ["Língua Portuguesa", "Educação Física", "Artes integradas", "Música", "Inglês", "Ciências da Natureza", "Matemática", "Ciências Humanas"],
    '2º Ano': ["Língua Portuguesa", "Educação Física", "Artes integradas", "Música", "Inglês", "Ciências da Natureza", "Matemática", "Ciências Humanas", "Tecnologia e suas aplicações"],
    '3º Ano': ["Língua Portuguesa", "Educação Física", "Artes integradas", "Música", "Inglês", "Ciências da Natureza", "Matemática", "Ciências Humanas", "Tecnologia e suas aplicações"],
    '4º Ano': ["Língua Portuguesa", "Educação Física", "Artes integradas", "Música", "Inglês", "Ciências da Natureza", "Matemática", "Ciências Humanas", "Tecnologia e suas aplicações"],
    '5º Ano': ["Língua Portuguesa", "Educação Física", "Artes integradas", "Música", "Inglês", "Ciências da Natureza", "Matemática", "Ciências Humanas", "Tecnologia e suas aplicações"],
    '6º Ano': ["Língua Portuguesa - Língua e Leitura", "Língua Portuguesa (Escrita)", "Educação Física", "Artes integradas", "Inglês", "Ciências da Natureza", "Matemática - Números e Álgebra", "Matemática - Geometria", "História", "Geografia", "Sociologia: Ética, Cidadania e Atualidades", "Tecnologia e suas aplicações"],
    '7º Ano': ["Língua Portuguesa - Língua e Leitura", "Língua Portuguesa (Escrita)", "Educação Física", "Artes integradas", "Inglês", "Ciências da Natureza", "Matemática - Números e Álgebra", "Matemática - Geometria", "História", "Geografia", "Sociologia: Ética, Cidadania e Atualidades", "Tecnologia e suas aplicações"],
    '8º Ano': ["Língua Portuguesa - Língua e Leitura", "Língua Portuguesa (Escrita)", "Educação Física", "Artes integradas", "Inglês", "Ciências da Natureza", "Matemática - Números e Álgebra", "Matemática - Geometria", "História", "Geografia", "Sociologia: Ética, Cidadania e Atualidades"],
    '9º Ano': ["Língua Portuguesa - Língua e Leitura", "Língua Portuguesa (Escrita)", "Educação Física", "Artes integradas", "Inglês", "Ciências da Natureza", "Matemática - Números e Álgebra", "Matemática - Geometria", "História", "Geografia", "Sociologia: Ética, Cidadania e Atualidades"],
    '1ª Série': ["Língua Portuguesa (Língua)", "Língua Portuguesa (Leitura)", "Língua Portuguesa (Escrita)", "Inglês", "Educação Física", "Artes", "Biologia", "Física", "Química", "Matemática - Álgebra", "Matemática - Geometria", "Geografia", "História", "Sociologia: Ética, Cidadania e Atualidades", "Filosofia", "Incubadora de projetos"],
    '2ª Série': ["Língua Portuguesa (Língua)", "Língua Portuguesa (Leitura)", "Língua Portuguesa (Escrita)", "Inglês", "Educação Física", "Artes", "Biologia", "Física", "Química", "Matemática - Álgebra", "Matemática - Geometria", "Geografia", "História", "Sociologia: Ética, Cidadania e Atualidades", "Filosofia", "Incubadora de projetos"],
    '3ª Série': ["Língua Portuguesa (Língua)", "Língua Portuguesa (Leitura)", "Língua Portuguesa (Escrita)", "Inglês", "Educação Física", "Artes", "Biologia", "Física", "Química", "Matemática - Álgebra", "Matemática - Geometria", "Geografia", "História", "Sociologia: Ética, Cidadania e Atualidades", "Filosofia"]
};

const MAPA_PESOS_DISCIPLINA_SERIE = {
    '1º Ano': { default: { prova: 0, cont: 100 } },
    '2º Ano': { default: { prova: 0, cont: 100 } },
    '3º Ano': { default: { prova: 0, cont: 100 } },
    '4º Ano': { 'Língua Portuguesa': { prova: 30, cont: 70 }, 'Inglês': { prova: 30, cont: 70 }, 'Ciências da Natureza': { prova: 30, cont: 70 }, 'Matemática': { prova: 30, cont: 70 }, 'Ciências Humanas': { prova: 30, cont: 70 }, 'default': { prova: 0, cont: 100 } },
    '5º Ano': { 'Língua Portuguesa': { prova: 30, cont: 70 }, 'Inglês': { prova: 30, cont: 70 }, 'Ciências da Natureza': { prova: 30, cont: 70 }, 'Matemática': { prova: 30, cont: 70 }, 'Ciências Humanas': { prova: 30, cont: 70 }, 'default': { prova: 0, cont: 100 } },
    '6º Ano': { 'Sociologia: Ética, Cidadania e Atualidades': { prova: 0, cont: 100 }, 'Tecnologia e suas aplicações': { prova: 0, cont: 100 }, 'Educação Física': { prova: 0, cont: 100 }, 'Artes integradas': { prova: 0, cont: 100 }, 'default': { prova: 35, cont: 65 } },
    '7º Ano': { 'Sociologia: Ética, Cidadania e Atualidades': { prova: 0, cont: 100 }, 'Tecnologia e suas aplicações': { prova: 0, cont: 100 }, 'Educação Física': { prova: 0, cont: 100 }, 'Artes integradas': { prova: 0, cont: 100 }, 'default': { prova: 35, cont: 65 } },
    '8º Ano': { 'Sociologia: Ética, Cidadania e Atualidades': { prova: 0, cont: 100 }, 'Educação Física': { prova: 0, cont: 100 }, 'Artes integradas': { prova: 0, cont: 100 }, 'default': { prova: 35, cont: 65 } },
    '9º Ano': { 'Sociologia: Ética, Cidadania e Atualidades': { prova: 0, cont: 100 }, 'Educação Física': { prova: 0, cont: 100 }, 'Artes integradas': { prova: 0, cont: 100 }, 'default': { prova: 35, cont: 65 } },
    '1ª Série': { 'Educação Física': { prova: 0, cont: 100 }, 'Incubadora de projetos': { prova: 0, cont: 100 }, 'default': { prova: 40, cont: 60 } },
    '2ª Série': { 'Educação Física': { prova: 0, cont: 100 }, 'Incubadora de projetos': { prova: 0, cont: 100 }, 'default': { prova: 40, cont: 60 } },
    '3ª Série': { 'Educação Física': { prova: 0, cont: 100 }, 'default': { prova: 40, cont: 60 } }
};

function obterRegraPesos(serie, disciplina) {
    let serieConfig = MAPA_PESOS_DISCIPLINA_SERIE[serie];
    if (!serieConfig) return { prova: 0, cont: 100 };
    if (serieConfig[disciplina]) return serieConfig[disciplina];
    return serieConfig['default'] || { prova: 0, cont: 100 };
}

function abrirMenuNotas() { 
    document.getElementById('tela-menu').classList.add('hidden'); 
    document.getElementById('submenu-notas').classList.remove('hidden'); 
}

function voltarSubmenuNotas() { 
    ['modulo-notas', 'modulo-filtro-matriz', 'modulo-exibicao-matriz', 'modulo-filtro-boletim-aluno', 'modulo-exibicao-boletim-aluno', 'modulo-filtro-boletim-turma', 'modulo-exibicao-boletim-turma'].forEach(id => {
        let el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });
    document.getElementById('submenu-notas').classList.remove('hidden'); 
}

function abrirFormularioNotas() { 
    document.getElementById('submenu-notas').classList.add('hidden'); 
    document.getElementById('modulo-notas').classList.remove('hidden'); 
    carregarDadosParaNotas(); 
}

function carregarDadosParaNotas() {
    document.getElementById('carregando-alunos-notas').classList.remove('hidden');
    document.getElementById('form-config-notas').classList.add('hidden');
    Promise.all([
        new Promise(resolve => carregarAlunosGlobal(res => resolve(res))),
        fetch(API_URL + '?acao=buscarNotasLancadas').then(res => res.json()),
        fetch(API_URL + '?acao=buscarPesosConfigurados').then(res => res.json())
    ]).then(([alunos, notas, pesos]) => {
        notasJaLancadasGlobal = notas; 
        pesosSalvosGlobal = pesos;
        configurarFormNotas();
    });
}

function configurarFormNotas() {
    document.getElementById('carregando-alunos-notas').classList.add('hidden');
    document.getElementById('form-config-notas').classList.remove('hidden');
    document.getElementById('container-tabela-notas').classList.add('hidden');
    const selSerie = document.getElementById('nota-serie');
    selSerie.innerHTML = '<option value="">Selecione a série...</option>';
    let series = [...new Set(listaDeAlunos.map(a => a.serie))].filter(Boolean);
    if (dadosEscopoUsuario.perfil === 'professor' && dadosEscopoUsuario.serieEscopo && dadosEscopoUsuario.serieEscopo !== 'Todas') {
        series = [dadosEscopoUsuario.serieEscopo];
    }
    series.forEach(s => { let o = document.createElement('option'); o.value = s; o.text = s; selSerie.appendChild(o); });
    atualizarTurmasDinamicas();
    atualizarDisciplinasPorSerie();
    atualizarPainelPesosPacotes();
}

function atualizarTurmasDinamicas() {
    const serie = document.getElementById('nota-serie').value;
    const selTurma = document.getElementById('nota-turma');
    selTurma.innerHTML = '<option value="">Selecione a turma...</option>';
    if(!serie) return;
    [...new Set(listaDeAlunos.filter(a => a.serie === serie).map(a => a.turma || "Única"))].filter(Boolean).forEach(t => {
        let o = document.createElement('option'); o.value = t; o.text = t; selTurma.appendChild(o);
    });
}

function atualizarDisciplinasPorSerie() {
    const serie = document.getElementById('nota-serie').value;
    const selDisc = document.getElementById('nota-disciplina');
    selDisc.innerHTML = '<option value="">Selecione a disciplina...</option>';
    if(!serie || !MATRIZ_CURRICULAR[serie]) return;
    let disc = MATRIZ_CURRICULAR[serie];
    if (dadosEscopoUsuario.perfil === 'professor' && dadosEscopoUsuario.materiaEscopo && dadosEscopoUsuario.materiaEscopo !== 'Todas') {
        disc = [dadosEscopoUsuario.materiaEscopo];
    }
    disc.forEach(d => { let o = document.createElement('option'); o.value = d; o.text = d; selDisc.appendChild(o); });
}

function atualizarPainelPesosPacotes() {
    const bimestre = document.getElementById('nota-bimestre').value;
    const serie = document.getElementById('nota-serie').value;
    const turma = document.getElementById('nota-turma').value;
    const disciplina = document.getElementById('nota-disciplina').value;
    const eixo = document.getElementById('nota-eixo').value;
    const container = document.getElementById('container-pesos-pacotes');
    container.innerHTML = "";
    let pacotes = eixo === 'continuas' ? ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'] : eixo === 'bimestrais' ? ['B1', 'B2', 'B3', 'B4'] : ['R1', 'R2'];
    let configSalva = pesosSalvosGlobal.find(p => p.bimestre === bimestre && p.serie === serie && p.turma === turma && p.disciplina === disciplina && p.eixo === eixo);
    let pesosObj = {};
    if (configSalva && configSalva.pesosJson) { try { pesosObj = JSON.parse(configSalva.pesosJson); } catch(e){} }
    const selPacoteAlvo = document.getElementById('atividade-pacote-alvo');
    selPacoteAlvo.innerHTML = "";
    pacotes.forEach((p, idx) => {
        let valorPadrao = pesosObj[p] !== undefined ? pesosObj[p] : (idx === 0 && Object.keys(pesosObj).length === 0 ? 100 : 0);
        let div = document.createElement('div');
        div.className = 'pacote-box';
        div.innerHTML = `<label><strong>${p}</strong> (Peso % no Eixo):</label><input type="number" min="0" max="100" value="${valorPadrao}" class="input-peso-pacote" data-pacote="${p}" oninput="calcularSomaPesosPacotes()" style="width: 100px; text-align: center;">`;
        container.appendChild(div);
        let opt = document.createElement('option'); opt.value = p; opt.text = `Pacote ${p}`; selPacoteAlvo.appendChild(opt);
    });
    calcularSomaPesosPacotes();
}

function calcularSomaPesosPacotes() {
    let soma = 0;
    document.querySelectorAll('.input-peso-pacote').forEach(inp => { soma += parseFloat(inp.value) || 0; });
    const aviso = document.getElementById('aviso-soma-pesos');
    const btnAvancar = document.getElementById('btn-avancar-notas');
    if (soma === 100) {
        aviso.innerText = "Soma dos pesos correta (100%)."; aviso.style.color = "#016552";
        btnAvancar.disabled = false; btnAvancar.style.opacity = "1";
    } else {
        aviso.innerText = `Atenção: A soma dos pesos dos pacotes é ${soma}%. O total deve ser exatamente 100%.`; aviso.style.color = "#d9534f";
        btnAvancar.disabled = true; btnAvancar.style.opacity = "0.5";
    }
}

function validarEAvancarParaLancamento() {
    const serie = document.getElementById('nota-serie').value;
    const turma = document.getElementById('nota-turma').value;
    const disciplina = document.getElementById('nota-disciplina').value;
    const bimestre = document.getElementById('nota-bimestre').value;
    const eixo = document.getElementById('nota-eixo').value;
    const nomeAtividade = document.getElementById('atividade-nome').value.trim();
    const pacoteAlvo = document.getElementById('atividade-pacote-alvo').value;
    const pesoAtividade = parseFloat(document.getElementById('atividade-peso').value) || 1;

    if(!serie || !turma || !disciplina) { alert("Preencha todos os campos."); return; }
    if(!nomeAtividade) { alert("Dê um nome para a atividade."); return; }

    let pesosConfigurados = {}; let soma = 0;
    document.querySelectorAll('.input-peso-pacote').forEach(inp => {
        let p = inp.getAttribute('data-pacote'); let v = parseFloat(inp.value) || 0;
        if(v > 0) { pesosConfigurados[p] = v; soma += v; }
    });
    if (soma !== 100) { alert("A soma dos pesos deve ser exatamente 100%."); return; }

    fetch(API_URL, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modulo: 'salvar_pesos', emailUsuario: usuarioLogado, bimestre, serie, turma, disciplina, eixo, pesos: pesosConfigurados })
    });
    gerarTabelaLancamentoAtividade(bimestre, serie, turma, disciplina, eixo, pacoteAlvo, nomeAtividade, pesoAtividade);
}

function gerarTabelaLancamentoAtividade(bimestre, serie, turma, disciplina, eixo, pacoteAlvo, nomeAtividade, pesoAtividade) {
    const alunosTurma = listaDeAlunos.filter(a => a.serie === serie && (a.turma === turma || (!a.turma && turma === "Única")));
    document.getElementById('titulo-turma-notas').innerText = `${bimestre} | ${disciplina} | ${serie} (${turma}) | Pacote: ${pacoteAlvo} | Atividade: "${nomeAtividade}"`;
    document.getElementById('th-atividade-label').innerText = `${nomeAtividade} (Peso ${pesoAtividade}) - Nota 0-100`;

    const corpo = document.getElementById('corpo-tabela-notas');
    corpo.innerHTML = "";
    alunosTurma.forEach(aluno => {
        const tr = document.createElement('tr');
        let notaExistente = "";
        let encontrada = notasJaLancadasGlobal.find(n => 
            n.bimestre === bimestre && n.serie === serie && n.turma === turma && n.disciplina === disciplina && 
            n.eixo === eixo && n.pacote === pacoteAlvo && n.nomeAtividade === nomeAtividade && String(n.ra) === String(aluno.ra)
        );
        if (encontrada) notaExistente = encontrada.nota;

        tr.innerHTML = `
            <td>${aluno.ra}</td>
            <td><strong>${aluno.nome}</strong></td>
            <td>${aluno.serie} (${turma})</td>
            <td><input type="number" min="0" max="100" step="1" class="input-nota" data-nome="${aluno.nome}" data-ra="${aluno.ra}" data-pacote="${pacoteAlvo}" data-atividade="${nomeAtividade}" data-pesoa="${pesoAtividade}" value="${notaExistente}" placeholder="0-100" oninput="validarNotaLimite(this)"></td>
        `;
        corpo.appendChild(tr);
    });
    document.getElementById('form-config-notas').classList.add('hidden');
    document.getElementById('container-tabela-notas').classList.remove('hidden');
}

function validarNotaLimite(input) {
    let val = parseFloat(input.value);
    if (val < 0) { alert("Notas não podem ser negativas."); input.value = 0; }
    else if (val > 100) { alert("A nota máxima é 100."); input.value = 100; }
}

function voltarParaConfigPesos() {
    document.getElementById('container-tabela-notas').classList.add('hidden');
    document.getElementById('form-config-notas').classList.remove('hidden');
}

function salvarNotasEmLote() {
    const btn = document.getElementById('btn-salvar-notas');
    btn.innerText = "Salvando..."; btn.disabled = true;
    const bimestre = document.getElementById('nota-bimestre').value;
    const serie = document.getElementById('nota-serie').value;
    const turma = document.getElementById('nota-turma').value;
    const disciplina = document.getElementById('nota-disciplina').value;
    const eixo = document.getElementById('nota-eixo').value;

    let lancamentos = [];
    document.querySelectorAll('.input-nota').forEach(inp => {
        let notaVal = inp.value.trim();
        if(notaVal !== "") {
            lancamentos.push({
                bimestre, serie, turma, disciplina, eixo,
                pacote: inp.getAttribute('data-pacote'),
                nomeAtividade: inp.getAttribute('data-atividade'),
                pesoAtividade: parseFloat(inp.getAttribute('data-pesoa')) || 1,
                nome: inp.getAttribute('data-nome'), ra: inp.getAttribute('data-ra'),
                nota: parseFloat(notaVal)
            });
        }
    });

    if(lancamentos.length === 0) { alert("Insira ao menos uma nota."); btn.innerText = "Salvar Notas da Atividade"; btn.disabled = false; return; }

    fetch(API_URL, {
        method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modulo: 'notas', emailUsuario: usuarioLogado, lancamentos: lancamentos })
    }).then(() => {
        alert("Notas salvas com sucesso!");
        btn.innerText = "Salvar Notas da Atividade"; btn.disabled = false;
        carregarDadosParaNotas();
    }).catch(() => {
        alert("Erro ao salvar."); btn.innerText = "Salvar Notas da Atividade"; btn.disabled = false;
    });
}

// Matriz Analítica
function abrirTelaFiltroMatrizAnalitica() {
    document.getElementById('submenu-notas').classList.add('hidden');
    document.getElementById('modulo-exibicao-matriz').classList.add('hidden');
    document.getElementById('modulo-filtro-matriz').classList.remove('hidden');
    carregarAlunosGlobal(alunos => {
        const selSerie = document.getElementById('matriz-serie');
        selSerie.innerHTML = '<option value="">Selecione a série...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => { let o = document.createElement('option'); o.value = s; o.text = s; selSerie.appendChild(o); });
    });
}

function atualizarTurmasMatrizDinamica() {
    const serie = document.getElementById('matriz-serie').value;
    const selTurma = document.getElementById('matriz-turma');
    selTurma.innerHTML = '<option value="">Selecione a turma...</option>';
    if(!serie) return;
    [...new Set(listaDeAlunos.filter(a => a.serie === serie).map(a => a.turma || "Única"))].filter(Boolean).forEach(t => {
        let o = document.createElement('option'); o.value = t; o.text = t; selTurma.appendChild(o);
    });
}

function atualizarDisciplinasMatriz() {
    const serie = document.getElementById('matriz-serie').value;
    const selDisc = document.getElementById('matriz-disciplina');
    selDisc.innerHTML = '<option value="">Selecione a disciplina...</option>';
    if(!serie || !MATRIZ_CURRICULAR[serie]) return;
    let disc = MATRIZ_CURRICULAR[serie];
    if (dadosEscopoUsuario.perfil === 'professor' && dadosEscopoUsuario.materiaEscopo && dadosEscopoUsuario.materiaEscopo !== 'Todas') {
        disc = [dadosEscopoUsuario.materiaEscopo];
    }
    disc.forEach(d => { let o = document.createElement('option'); o.value = d; o.text = d; selDisc.appendChild(o); });
}

function gerarMatrizAnaliticaCompleta() {
    const bimestre = document.getElementById('matriz-bimestre').value;
    const serie = document.getElementById('matriz-serie').value;
    const turma = document.getElementById('matriz-turma').value;
    const disciplina = document.getElementById('matriz-disciplina').value;
    if(!serie || !turma || !disciplina) { alert("Preencha todos os filtros."); return; }

    document.getElementById('modulo-filtro-matriz').classList.add('hidden');
    document.getElementById('modulo-exibicao-matriz').classList.remove('hidden');
    document.getElementById('carregando-matriz').classList.remove('hidden');
    document.getElementById('tabela-matriz-analitica').classList.add('hidden');
    document.getElementById('titulo-matriz-analitica').innerText = `MATRIZ ANALÍTICA | ${disciplina} | ${serie} (${turma}) - ${bimestre}`;

    Promise.all([
        fetch(API_URL + '?acao=buscarNotasLancadas').then(res => res.json()),
        fetch(API_URL + '?acao=buscarPesosConfigurados').then(res => res.json())
    ]).then(([notas, pesos]) => {
        notasJaLancadasGlobal = notas; pesosSalvosGlobal = pesos;
        document.getElementById('carregando-matriz').classList.add('hidden');
        document.getElementById('tabela-matriz-analitica').classList.remove('hidden');

        const alunosTurma = listaDeAlunos.filter(a => a.serie === serie && (a.turma === turma || (!a.turma && turma === "Única")));
        const notasBimTurma = notas.filter(n => n.bimestre === bimestre && n.serie === serie && n.turma === turma && n.disciplina === disciplina);

        let atividadesUnicas = [];
        notasBimTurma.forEach(n => {
            let idAtiv = `${n.pacote}_${n.nomeAtividade}`;
            if(!atividadesUnicas.some(x => x.id === idAtiv)) {
                atividadesUnicas.push({ id: idAtiv, pacote: n.pacote, nome: n.nomeAtividade, peso: n.pesoAtividade || 1 });
            }
        });

        const head = document.getElementById('head-matriz-analitica');
        const corpo = document.getElementById('corpo-matriz-analitica');
        head.innerHTML = ""; corpo.innerHTML = "";

        if (alunosTurma.length === 0) {
            corpo.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #666;">Nenhum aluno encontrado.</td></tr>`;
            return;
        }

        let tr1 = `<tr><th>Nº Sala</th><th>RA</th><th>Estudante</th><th>Situação</th>`;
        let tr2 = `<tr><th></th><th></th><th></th><th></th>`;
        atividadesUnicas.forEach(ativ => {
            tr1 += `<th style="background: #004D93; color: white;">Pacote ${ativ.pacote}</th>`;
            tr2 += `<th>${ativ.nome}<br><small>(Peso ${ativ.peso})</small></th>`;
        });
        tr1 += `<th rowspan="2" style="background: #016552; color: white;">Média Final</th></tr>`;
        tr2 += `</tr>`;
        head.innerHTML = tr1 + tr2;

        let regraSerieDisc = obterRegraPesos(serie, disciplina);

        alunosTurma.forEach((aluno, index) => {
            let htmlLinha = `<td>${index + 1}</td><td>${aluno.ra}</td><td><strong>${aluno.nome}</strong></td><td>Cursando</td>`;
            let notasAluno = notasBimTurma.filter(n => String(n.ra) === String(aluno.ra));
            let mapaNotasAluno = {};
            notasAluno.forEach(n => { mapaNotasAluno[`${n.pacote}_${n.nomeAtividade}`] = n.nota; });

            let pacotesAlocados = {};
            notasAluno.forEach(n => {
                let pkg = n.pacote;
                if(!pacotesAlocados[pkg]) pacotesAlocados[pkg] = { somaPond: 0, somaPesos: 0 };
                let pesoAtiv = n.pesoAtividade || 1;
                pacotesAlocados[pkg].somaPond += (n.nota * pesoAtiv);
                pacotesAlocados[pkg].somaPesos += pesoAtiv;
            });

            let mediasPacotes = {};
            Object.keys(pacotesAlocados).forEach(pkg => {
                let obj = pacotesAlocados[pkg];
                if(obj.somaPesos > 0) mediasPacotes[pkg] = obj.somaPond / obj.somaPesos;
            });

            let configC = pesos.find(p => p.bimestre === bimestre && p.serie === serie && p.turma === turma && p.disciplina === disciplina && p.eixo === 'continuas');
            let configB = pesos.find(p => p.bimestre === bimestre && p.serie === serie && p.turma === turma && p.disciplina === disciplina && p.eixo === 'bimestrais');
            let pesosC = configC ? JSON.parse(configC.pesosJson) : { 'C1': 100 };
            let pesosB = configB ? JSON.parse(configB.pesosJson) : { 'B1': 100 };

            let somaC = 0, temC = false;
            Object.keys(pesosC).forEach(pkg => { if(mediasPacotes[pkg] !== undefined) { somaC += (mediasPacotes[pkg] * (pesosC[pkg] / 100)); temC = true; } });
            let somaB = 0, temB = false;
            Object.keys(pesosB).forEach(pkg => { if(mediasPacotes[pkg] !== undefined) { somaB += (mediasPacotes[pkg] * (pesosB[pkg] / 100)); temB = true; } });

            let mediaBimestralFinal = "-";
            if(temC || temB) {
                let calc = (somaC * (regraSerieDisc.cont / 100)) + (somaB * (regraSerieDisc.prova / 100));
                mediaBimestralFinal = calc.toFixed(1);
            }

            atividadesUnicas.forEach(ativ => {
                let valNota = mapaNotasAluno[ativ.id] !== undefined ? mapaNotasAluno[ativ.id] : "-";
                let classeNota = (valNota !== "-" && parseFloat(valNota) < 50) ? "nota-abaixo" : "";
                htmlLinha += `<td class="${classeNota}">${valNota}</td>`;
            });

            let classeFinal = (mediaBimestralFinal !== "-" && parseFloat(mediaBimestralFinal) < 50) ? "nota-abaixo" : "";
            htmlLinha += `<td class="${classeFinal}"><strong>${mediaBimestralFinal}</strong></td>`;
            const tr = document.createElement('tr');
            tr.innerHTML = htmlLinha;
            corpo.appendChild(tr);
        });
    });
}

// Boletim Individual
function abrirTelaFiltroBoletimAluno() {
    document.getElementById('submenu-notas').classList.add('hidden');
    document.getElementById('modulo-exibicao-boletim-aluno').classList.add('hidden');
    document.getElementById('modulo-filtro-boletim-aluno').classList.remove('hidden');
    carregarAlunosGlobal(alunos => {
        const selSerie = document.getElementById('aluno-filtro-serie');
        selSerie.innerHTML = '<option value="">Selecione a série...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => { let o = document.createElement('option'); o.value = s; o.text = s; selSerie.appendChild(o); });
    });
}

function atualizarAlunosPorSerie() {
    const serie = document.getElementById('aluno-filtro-serie').value;
    const selAluno = document.getElementById('aluno-filtro-ra');
    selAluno.innerHTML = '<option value="">Selecione o aluno...</option>';
    if(!serie) return;
    listaDeAlunos.filter(a => a.serie === serie).forEach(a => {
        let o = document.createElement('option'); o.value = a.ra; o.text = `${a.nome} (RA: ${a.ra})`;
        selAluno.appendChild(o);
    });
}

function gerarBoletimIndividualAluno() {
    const raAluno = document.getElementById('aluno-filtro-ra').value;
    const serie = document.getElementById('aluno-filtro-serie').value;
    if(!raAluno || !serie) { alert("Selecione a série e o aluno."); return; }

    let alunoObj = listaDeAlunos.find(a => String(a.ra) === String(raAluno));
    document.getElementById('modulo-filtro-boletim-aluno').classList.add('hidden');
    document.getElementById('modulo-exibicao-boletim-aluno').classList.remove('hidden');
    document.getElementById('carregando-boletim-aluno').classList.remove('hidden');
    document.getElementById('tabela-boletim-aluno').classList.add('hidden');
    document.getElementById('titulo-boletim-aluno').innerText = `BOLETIM ESCOLAR 2026 - ${alunoObj.nome} (${serie})`;

    Promise.all([
        fetch(API_URL + '?acao=buscarNotasLancadas').then(res => res.json()),
        fetch(API_URL + '?acao=buscarPesosConfigurados').then(res => res.json())
    ]).then(([notas, pesos]) => {
        notasJaLancadasGlobal = notas; pesosSalvosGlobal = pesos;
        document.getElementById('carregando-boletim-aluno').classList.add('hidden');
        document.getElementById('tabela-boletim-aluno').classList.remove('hidden');

        const corpo = document.getElementById('corpo-tabela-boletim-aluno');
        corpo.innerHTML = "";
        const bimestres = ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"];
        let disciplinasSerie = MATRIZ_CURRICULAR[serie] || [];

        disciplinasSerie.forEach(disc => {
            let regraSerieDisc = obterRegraPesos(serie, disc);
            const tr = document.createElement('tr');
            let htmlLinha = `<td><strong>${disc}</strong></td>`;
            let somaMedias = 0, validos = 0;

            bimestres.forEach(bim => {
                let turmaAluno = alunoObj.turma || "Única";
                let mb = calcularMediaBimestralAlunoDisc(notas, pesos, bim, serie, turmaAluno, disc, raAluno, regraSerieDisc);
                let classeMb = (mb !== "-" && parseFloat(mb) < 50) ? "nota-abaixo" : "";
                htmlLinha += `<td class="${classeMb}">${mb}</td><td>-</td><td>-</td>`;
                if(mb !== "-") { somaMedias += parseFloat(mb); validos++; }
            });

            let mediaAnual = validos > 0 ? (somaMedias / validos).toFixed(1) : "-";
            let classeAnual = (mediaAnual !== "-" && parseFloat(mediaAnual) < 50) ? "nota-abaixo" : "";
            htmlLinha += `<td>-</td><td>-</td><td>-</td><td class="${classeAnual}"><strong>${mediaAnual}</strong></td>`;
            tr.innerHTML = htmlLinha;
            corpo.appendChild(tr);
        });
    });
}

// Boletim Consolidado
function abrirTelaFiltroBoletimTurma() {
    document.getElementById('submenu-notas').classList.add('hidden');
    document.getElementById('modulo-exibicao-boletim-turma').classList.add('hidden');
    document.getElementById('modulo-filtro-boletim-turma').classList.remove('hidden');
    carregarAlunosGlobal(alunos => {
        const selSerie = document.getElementById('turma-filtro-serie');
        selSerie.innerHTML = '<option value="">Selecione a série...</option>';
        [...new Set(alunos.map(a => a.serie))].filter(Boolean).forEach(s => { let o = document.createElement('option'); o.value = s; o.text = s; selSerie.appendChild(o); });
    });
}

function atualizarTurmasConsolidadoDinamicas() {
    const serie = document.getElementById('turma-filtro-serie').value;
    const selTurma = document.getElementById('turma-filtro-sala');
    selTurma.innerHTML = '<option value="">Selecione a turma...</option>';
    if(!serie) return;
    [...new Set(listaDeAlunos.filter(a => a.serie === serie).map(a => a.turma || "Única"))].filter(Boolean).forEach(t => {
        let o = document.createElement('option'); o.value = t; o.text = t; selTurma.appendChild(o);
    });
}

function gerarBoletimConsolidadoTurma() {
    const bimestreRef = document.getElementById('turma-filtro-bimestre').value;
    const serie = document.getElementById('turma-filtro-serie').value;
    const turma = document.getElementById('turma-filtro-sala').value;
    if(!serie || !turma) { alert("Selecione a série e a turma."); return; }

    document.getElementById('modulo-filtro-boletim-turma').classList.add('hidden');
    document.getElementById('modulo-exibicao-boletim-turma').classList.remove('hidden');
    document.getElementById('carregando-boletim-turma').classList.remove('hidden');
    document.getElementById('tabela-boletim-turma-consolidado').classList.add('hidden');
    document.getElementById('titulo-boletim-turma-consolidado').innerText = `BOLETIM CONSOLIDADO | ${serie} (${turma}) - ${bimestreRef}`;

    Promise.all([
        fetch(API_URL + '?acao=buscarNotasLancadas').then(res => res.json()),
        fetch(API_URL + '?acao=buscarPesosConfigurados').then(res => res.json())
    ]).then(([notas, pesos]) => {
        notasJaLancadasGlobal = notas; pesosSalvosGlobal = pesos;
        document.getElementById('carregando-boletim-turma').classList.add('hidden');
        document.getElementById('tabela-boletim-turma-consolidado').classList.remove('hidden');

        const alunosTurma = listaDeAlunos.filter(a => a.serie === serie && (a.turma === turma || (!a.turma && turma === "Única")));
        const head = document.getElementById('head-consolidado-turma');
        const corpo = document.getElementById('corpo-consolidado-turma');
        head.innerHTML = ""; corpo.innerHTML = "";

        if (alunosTurma.length === 0) {
            corpo.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #666;">Nenhum aluno encontrado.</td></tr>`;
            return;
        }

        let disciplinasSerie = MATRIZ_CURRICULAR[serie] || [];
        let trHead = `<tr><th>Estudante (RA)</th>`;
        disciplinasSerie.forEach(disc => { trHead += `<th>${disc}</th>`; });
        trHead += `</tr>`;
        head.innerHTML = trHead;

        alunosTurma.forEach(aluno => {
            let trHtml = `<td><strong>${aluno.nome}</strong><br><small>RA: ${aluno.ra}</small></td>`;
            disciplinasSerie.forEach(disc => {
                let regraSerieDisc = obterRegraPesos(serie, disc);
                let notaExibida = "-";

                if (bimestreRef === "Média Anual") {
                    let somaMedias = 0, validos = 0;
                    ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"].forEach(bim => {
                        let mb = calcularMediaBimestralAlunoDisc(notas, pesos, bim, serie, turma, disc, aluno.ra, regraSerieDisc);
                        if(mb !== "-") { somaMedias += parseFloat(mb); validos++; }
                    });
                    if(validos > 0) notaExibida = (somaMedias / validos).toFixed(1);
                } else {
                    notaExibida = calcularMediaBimestralAlunoDisc(notas, pesos, bimestreRef, serie, turma, disc, aluno.ra, regraSerieDisc);
                }

                let classeNota = (notaExibida !== "-" && parseFloat(notaExibida) < 50) ? "nota-abaixo" : "";
                trHtml += `<td class="${classeNota}">${notaExibida}</td>`;
            });
            let tr = document.createElement('tr');
            tr.innerHTML = trHtml;
            corpo.appendChild(tr);
        });
    });
}

function calcularMediaBimestralAlunoDisc(notas, pesos, bim, serie, turma, disc, raAluno, regraSerieDisc) {
    let notasBimAluno = notas.filter(n => n.bimestre === bim && n.serie === serie && n.turma === turma && n.disciplina === disc && String(n.ra) === String(raAluno));
    if(notasBimAluno.length === 0) return "-";

    let pacotesAlocados = {};
    notasBimAluno.forEach(n => {
        let pkg = n.pacote;
        if(!pacotesAlocados[pkg]) pacotesAlocados[pkg] = { somaPond: 0, somaPesos: 0 };
        let pesoAtiv = n.pesoAtividade || 1;
        pacotesAlocados[pkg].somaPond += (n.nota * pesoAtiv);
        pacotesAlocados[pkg].somaPesos += pesoAtiv;
    });

    let mediasPacotesCalculadas = {};
    Object.keys(pacotesAlocados).forEach(pkg => {
        let obj = pacotesAlocados[pkg];
        if(obj.somaPesos > 0) mediasPacotesCalculadas[pkg] = obj.somaPond / obj.somaPesos;
    });

    let configC = pesos.find(p => p.bimestre === bim && p.serie === serie && p.turma === turma && p.disciplina === disc && p.eixo === 'continuas');
    let configB = pesos.find(p => p.bimestre === bim && p.serie === serie && p.turma === turma && p.disciplina === disc && p.eixo === 'bimestrais');
    let pesosC = configC ? JSON.parse(configC.pesosJson) : { 'C1': 100 };
    let pesosB = configB ? JSON.parse(configB.pesosJson) : { 'B1': 100 };

    let somaContínuas = 0; let temC = false;
    Object.keys(pesosC).forEach(pkg => { if(mediasPacotesCalculadas[pkg] !== undefined) { somaContínuas += (mediasPacotesCalculadas[pkg] * (pesosC[pkg] / 100)); temC = true; } });

    let somaBimestrais = 0; let temB = false;
    Object.keys(pesosB).forEach(pkg => { if(mediasPacotesCalculadas[pkg] !== undefined) { somaBimestrais += (mediasPacotesCalculadas[pkg] * (pesosB[pkg] / 100)); temB = true; } });

    if (temC || (temB && regraSerieDisc.prova > 0) || (regraSerieDisc.prova === 0 && temC)) {
        let calculada = (somaContínuas * (regraSerieDisc.cont / 100)) + (somaBimestrais * (regraSerieDisc.prova / 100));
        return calculada.toFixed(1);
    }
    return "-";
}
