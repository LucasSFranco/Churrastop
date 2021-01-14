// Útil

let campos = ["Nome", "Senha", "Email", "Idade", "Peso", "Imc", "GorduraCorporal", "Mensalidade", "AulasSemana"]

// Armazenamento

let filtroClientes = []

let clientes = [
	{
		id: 0,
		nome: "Bernardo Bohm",
		senha: "golfi123",
		email: "bernardobohm@gmail.com",
		idade: 17,
        peso: [80.7, 76.4, 74.9, 73.2],
        imc: 21.4,
        gorduraCorporal: [15.6, 13.7, 12.9, 11.7],
        mensalidade: 145.0,
        aulasSemana: 5,
        date: [
            {dia: 5, mes: "Jan", ano: 2019},
            {dia: 5, mes: "Fev", ano: 2019},
            {dia: 10, mes: "Mar", ano: 2019},
            {dia: 8, mes: "Abr", ano: 2019},
        ]
	},
    {
        id: 1,
        nome: "Mateus Balbinot",
        senha: "raspoocumsm",
        email: "mateusbalbinot@gmail.com",
        idade: 17,
        peso: [70.2, 68.3, 65.1],
        imc: 20.6,
        gorduraCorporal: [12.1, 11.6, 10.1],
        mensalidade: 70.0,
        aulasSemana: 1,
        date: [
            {dia: 2, mes: "Jan", ano: 2019},
            {dia: 10, mes: "Fev", ano: 2019},
            {dia: 28, mes: "Mar", ano: 2019},
        ]
    },
    {
        id: 2,
        nome: "Darlyn",
        senha: "indianosdeliciosos",
        email: "darlyn@gmail.com",
        idade: 18,
        peso: [62.8, 61.9],
        imc: 19.3,
        gorduraCorporal: [9, 8.6],
        mensalidade: 100.0,
        aulasSemana: 3,
        date: [
            {dia: 11, mes: "Dez", ano: 2018},
            {dia: 23, mes: "Jan", ano: 2019},
        ]
    },
]

// Filtrar clientes

let filtrarClientes = () => {
    let pesquisa = document.getElementById("filtro").value

    if (!pesquisa) {
        carregaListaClientes()
    } else {
        clientes.map(x => pesquisa == x.nome ? filtroClientes.push(x) : null )
        carregaListaFiltroClientes()
        filtroClientes = []
    }
}

let carregaListaFiltroClientes = () => {
    let content = filtroClientes.map(p => htmlListaClientes(p)).join('')
    document.getElementById("tableBody").innerHTML = content
}


// Remove todos os atributos pendentes dos campos de adicionar dados do cliente

let formAdd = (index) => {
    let pessoa = clientes.find(p => p.id == index)

    document.getElementById("addButton").classList = ""
    document.getElementById("addButton").classList.add(`${index}`)
    document.getElementById("addButton").setAttribute("href","")



    let addCampos = campos.filter((c) => c=="Peso" || c=="GorduraCorporal")

    addCampos.map((c) => {
        document.getElementById(`add${c}`).value = ""
        document.getElementById(`add${c}`).classList.remove("input-error")
        document.getElementById(`addError${c}`).textContent=""
    })
}

// Remove todos os atributos pendentes dos campos de criar cliente

let formCriar = () => {

    document.getElementById("createButton").setAttribute("href","")

    campos.map((c) => {
        document.getElementById(`create${c}`).value = ""
        document.getElementById(`create${c}`).classList.remove("input-error")
        document.getElementById(`createError${c}`).textContent=""
    })

	document.getElementById("createErrorExistente").textContent=""
}

// Remove todos os atributos pendentes dos campos de editar cliente

let formEditar = (index) => {
	let pessoa = clientes.find(p => p.id == index)

    document.getElementById("editButton").classList = ""
    document.getElementById("editButton").classList.add(`${index}`)
    document.getElementById("editButton").setAttribute("href","") 

    campos.map((c) => {

        document.getElementById(`edit${c}`).classList.remove("input-error")
        document.getElementById(`editError${c}`).textContent=""

        if (typeof(pessoa[minimizeFirstLetter(c)]) == "object") {
            document.getElementById(`edit${c}`).value = pessoa[minimizeFirstLetter(c)].slice(-1)[0]
        } else {
            document.getElementById(`edit${c}`).value = pessoa[minimizeFirstLetter(c)]
        }
    })

    document.getElementById("editErrorExistente").textContent=""

}

// Cria um cliente, armazena-o e restringe os campos de cadastro

let criarCliente = () => {

    let now = new Date()

	let createPessoa = {
        id: clientes.length,
        nome: document.getElementById("createNome").value,
        senha: document.getElementById("createSenha").value,
        email: document.getElementById("createEmail").value,
        idade: parseInt(document.getElementById("createIdade").value),
        peso: [parseFloat(document.getElementById("createPeso").value.replace(",", "."))],
        imc: parseFloat(document.getElementById("createImc").value.replace(",", ".")),
        gorduraCorporal: [parseFloat(document.getElementById("createGorduraCorporal").value.replace(",", "."))],
        mensalidade: parseFloat(document.getElementById("createMensalidade").value.replace(",", ".")),
        aulasSemana: parseInt(document.getElementById("createAulasSemana").value),
        date: [{
            dia: now.getDate(),
            mês: generateMonth(now.getMonth()),
            ano: now.getFullYear(),
        }],
    }

    let validation = []

    validation.push(generateMask(createPessoa.nome, "letterIdentifier", "create", "Nome"))
    validation.push(generateMask(createPessoa.senha, "generic", "create", "Senha"))
    validation.push(generateMask(createPessoa.email, "email", "create", "Email"))
    validation.push(generateMask(createPessoa.idade, "int", "create", "Idade"))
    validation.push(generateMask(createPessoa.peso, "float", "create", "Peso"))
    validation.push(generateMask(createPessoa.imc, "float", "create", "Imc"))
    validation.push(generateMask(createPessoa.gorduraCorporal, "float", "create", "GorduraCorporal"))
    validation.push(generateMask(createPessoa.mensalidade, "float", "create", "Mensalidade"))
    validation.push(generateMask(createPessoa.aulasSemana, "int", "create", "AulasSemana"))

    let existe = (clientes.map(p => p.nome == createPessoa.nome)).find(i => i == true)

    if (existe && createPessoa.nome) {
        document.getElementById("createErrorExistente").textContent="Pessoa já existe"
        document.getElementById("createNome").classList.add("input-error")
        validation.push(false)
    } else if (!existe && createPessoa.nome) {
        document.getElementById("createNome").classList.remove("input-error")
        document.getElementById("createErrorExistente").textContent=""
        validation.push(true)
    }

    if(validation.every(x => x)) {
        clientes.push(createPessoa)
        carregaListaClientes()
        document.getElementById("createButton").setAttribute("href","#criarClienteModal")
    }
}

// Edita um cliente, rearmazena-o e restringe os campos de edição

let editarCliente = () => {

	let index = parseInt(document.getElementById("editButton").className.split(" ").pop())

	let editPessoa = {
        nome: document.getElementById("editNome").value,
        senha: document.getElementById("editSenha").value,
        email: document.getElementById("editEmail").value,
        idade: parseInt(document.getElementById("editIdade").value),
        peso: parseFloat(document.getElementById("editPeso").value.replace(",", ".")),
        imc: parseFloat(document.getElementById("editImc").value.replace(",", ".")),
        gorduraCorporal: parseFloat(document.getElementById("editGorduraCorporal").value.replace(",", ".")),
        mensalidade: parseFloat(document.getElementById("editMensalidade").value.replace(",", ".")),
        aulasSemana: parseInt(document.getElementById("editAulasSemana").value),
	}

    let validation = []

    validation.push(generateMask (editPessoa.nome, "letterIdentifier", "edit", "Nome"))
    validation.push(generateMask (editPessoa.senha, "generic", "edit", "Senha"))
    validation.push(generateMask (editPessoa.email, "email", "edit", "Email"))
    validation.push(generateMask (editPessoa.idade, "int", "edit", "Idade"))
    validation.push(generateMask (editPessoa.peso, "float", "edit", "Peso"))
    validation.push(generateMask (editPessoa.imc, "float", "edit", "Imc"))
    validation.push(generateMask (editPessoa.gorduraCorporal, "float", "edit", "GorduraCorporal"))
    validation.push(generateMask (editPessoa.mensalidade, "float", "edit", "Mensalidade"))
    validation.push(generateMask (editPessoa.aulasSemana, "int", "edit", "AulasSemana"))

    let pessoa = clientes.indexOf(clientes.find(p => p.id == index))
    let existe = (clientes.map(p => p.id != index && p.nome == editPessoa.nome)).find(i => i == true)

    if (existe) {
        document.getElementById("editErrorExistente").textContent="Pessoa já existe"
        document.getElementById("editNome").classList.add("input-error")
        validation.push(false)
    } else if (!existe && editPessoa.nome) {
        document.getElementById("editNome").classList.remove("input-error")
        document.getElementById("editErrorExistente").textContent=""
        validation.push(true)
    }

    if(validation.every(x => x)) {
        
        clientes[pessoa].peso.pop()
        clientes[pessoa].gorduraCorporal.pop()

        let peso = [].concat(clientes[pessoa].peso, editPessoa.peso)
        let gorduraCorporal = [].concat(clientes[pessoa].gorduraCorporal, editPessoa.gorduraCorporal)

	    clientes[pessoa] = {
	    	id: index,
            nome: editPessoa.nome,
            senha: editPessoa.senha,
            email: editPessoa.email,
            idade: editPessoa.idade,
            peso: peso,
            imc: editPessoa.imc,
            gorduraCorporal: gorduraCorporal,
            mensalidade: editPessoa.mensalidade,
            aulasSemana: editPessoa.aulasSemana,
            date: clientes[pessoa].date,
	    }
	    carregaListaClientes()
        document.getElementById("editButton").setAttribute("href","#editarClienteModal")
	}
}

// Deletar cliente

let deletarCliente = (index) => {
	let pessoa = clientes.indexOf(clientes.find(p => p.id == index))
	clientes.splice(pessoa, 1)
	carregaListaClientes()
}

// Adicionar dados do cliente

let adicionarDadosCliente = () => {
    let index = parseInt(document.getElementById("addButton").className.split(" ").pop())

    let addPessoa = {
        peso: parseFloat(document.getElementById("addPeso").value.replace(",", ".")),
        gorduraCorporal: parseFloat(document.getElementById("addGorduraCorporal").value.replace(",", ".")),
    }
    
    let pessoa = clientes.indexOf(clientes.find(p => p.id == index))
    let validation = []

    validation.push(generateMask (addPessoa.peso, "float", "add", "Peso"))
    validation.push(generateMask (addPessoa.gorduraCorporal, "float", "add", "GorduraCorporal"))

    if(validation.every(x => x)) {
        clientes[pessoa].peso.push(addPessoa.peso)
        clientes[pessoa].gorduraCorporal.push(addPessoa.gorduraCorporal)    

        let now = new Date()

        clientes[pessoa].date.push({
            dia: now.getDate(),
            mes: generateMonth(now.getMonth()),
            ano: now.getFullYear(),
        })    
        carregaListaClientes()
        document.getElementById("addButton").setAttribute("href","#adicionarDadosModal")
    }
}

// Ver histórico de evolução

let historicoEvolucao = (index) => { 

    let pessoa = clientes[clientes.indexOf(clientes.find((p) => p.id == index))]
    
    carregaListaEvolucao(pessoa)

    let categorias = []
    let content = ""

    for (var i=0; i<pessoa.peso.length;i++){
        content = `${pessoa.date[i].dia} ${pessoa.date[i].mes}`
        categorias.push(content)
    }

    Highcharts.setOptions({
        colors: ['#DDD', '#999']
    })

    Highcharts.chart('container', {
        chart: {
            type: 'area'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categorias
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            },
        },
        exporting: { enabled: false },
        series: [{
            name: 'Peso (Kg)',
            data: pessoa.peso
        }, {
            name: 'Gordura corporal (%)',
            data: pessoa.gorduraCorporal
        }]
    })
}

// Carregar itens da tabela do histórico de evolução

let htmlListaEvolucao = (pessoa, i) => `
    <tr>
        <td>${pessoa.peso[i]}</td>
        <td>${pessoa.gorduraCorporal[i]}</td>
        <td>${pessoa.date[i].dia}</td>
        <td>${pessoa.date[i].mes}</td>
        <td>${pessoa.date[i].ano}</td>
    </tr>
`

let carregaListaEvolucao = (pessoa) => {
    let content = ""
    for (var i=0; i<pessoa.peso.length;i++){
        content += htmlListaEvolucao(pessoa, i) 
    }
    document.getElementById("evolutionTable").innerHTML = content
}

// Carregar itens na tela

let htmlListaClientes = (pessoa) => `
	<tr>
		<td>${pessoa.nome}</td>
        <td>${pessoa.email}</td>
        <td>${pessoa.idade}</td>
        <td>${pessoa.peso[pessoa.peso.length-1].toFixed(1)}</td>
        <td>${pessoa.imc.toFixed(1)}</td>
        <td>${pessoa.gorduraCorporal[pessoa.gorduraCorporal.length-1].toFixed(1)}</td>
		<td>${pessoa.mensalidade.toFixed(2).replace(".", ",")}</td>
		<td>${pessoa.aulasSemana}x</td>
		<td class="actions">
			<a onclick="formEditar(${pessoa.id})" href="#editarClienteModal" class="edit" data-toggle="modal" data-backdrop="static" data-keyboard="false">
                <i class="material-icons" data-toggle="tooltip" title="Editar">create</i>
            </a>
			<a onclick="deletarCliente(${pessoa.id})" href="#" class="delete">
                <i class="material-icons" data-toggle="tooltip" title="Deletar">delete</i>
            </a>
            <a onclick="formAdd(${pessoa.id})" href="#adicionarDadosModal" class="add" data-toggle="modal" data-backdrop="static" data-keyboard="false">
                <i class="material-icons" data-toggle="tooltip" title="Adicionar dados">input</i>
            </a>
            <a onclick="historicoEvolucao(${pessoa.id})" href="#historicoEvolucaoModal" class="view" data-toggle="modal" data-backdrop="static" data-keyboard="false">
                <i class="material-icons" data-toggle="tooltip" title="Histórico de evolução">receipt</i>
            </a>
		</td>
	</tr>
`

let carregaListaClientes = () => {
	let content = clientes.map(p => htmlListaClientes(p)).join('')
	document.getElementById("tableBody").innerHTML = content
}

document.addEventListener("DOMContentLoaded", carregaListaClientes);