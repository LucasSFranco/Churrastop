// Útil

let campos = ["Nome", "Senha", "Salario", "HorarioAtuacao", "NomeAlunos"]

// Armazenamento

let funcionarios = [
	{
		id: 0,
		nome: "Lucas Surdi Franco",
		senha: "12345supersegura",
		salario: 1789.40,
		horarioAtuacao: "Segunda à sexta: 6:00-15:00",
        nomeAlunos: ["Licul Rauss", "Zasil Nazouhil Cacuopu", "Hoene Astoousr", "Zeousn Muate", "Vahai"],
	},
	{
		id: 1,
        nome: "Pedro Farias",
        senha: "seila",
        salario: 2132.21,
        horarioAtuacao: "Segunda à sexta: 18:00-24:00",
        nomeAlunos: ["Deuran Faxio", "Geube Waenu", "Maroin Ciomaes Cousr", "Luiar", "Zauro Irzil", "Heoho Waufo Pubao", "Almogo Zafuo"],
	},
	{
    	id: 2,
		nome: "Lucas Daian Wagner",
		senha: "gaytoraide",
		salario: 405.67,
		horarioAtuacao: "Sábado: 8:00-12:00",
        nomeAlunos: ["Fuaha", "Xoxo Bauro", "Dimoion Elkau"],
	},
]


// Remove todos os atributos pendentes dos campos de criar funcionário

let formCriar = () => {

    document.getElementById("createButton").setAttribute("href","")

    campos.map((c) => {
        document.getElementById(`create${c}`).value = ""
        document.getElementById(`create${c}`).classList.remove("input-error")
        document.getElementById(`createError${c}`).textContent=""
    })

    document.getElementById("createErrorExistente").textContent=""
}

// Remove todos os atributos pendentes dos campos de editar funcionário

let formEditar = (index) => {
    let pessoa = funcionarios.find(p => p.id == index)

    document.getElementById("editButton").classList = ""
    document.getElementById("editButton").classList.add(`${index}`)
    document.getElementById("editButton").setAttribute("href","") 

    campos.map((c) => {

        document.getElementById(`edit${c}`).classList.remove("input-error")
        document.getElementById(`editError${c}`).textContent=""

        if (typeof(pessoa[minimizeFirstLetter(c)]) == "object") {
            document.getElementById(`edit${c}`).value = pessoa[minimizeFirstLetter(c)].join(", ")
        } else {
            document.getElementById(`edit${c}`).value = pessoa[minimizeFirstLetter(c)]
        }
    })

    document.getElementById("editErrorExistente").textContent=""

}

// Cria um funcionário, armazena-o e restringe os campos de cadastro

let criarFuncionario = () => {
    let createPessoa = {
        id: funcionarios.length,
        nome: document.getElementById("createNome").value,
        senha: document.getElementById("createSenha").value,
        salario: parseFloat(document.getElementById("createSalario").value.replace(",", ".")),
        horarioAtuacao: document.getElementById("createHorarioAtuacao").value,
        nomeAlunos: ((document.getElementById("createNomeAlunos").value.split(",")).map((x) => x.replace(" ", ""))).filter((x) => x != ""),
    }

    let validation = []

    validation.push(generateMask (createPessoa.nome, "letterIdentifier", "create", "Nome"))
    validation.push(generateMask (createPessoa.senha, "generic", "create", "Senha"))
    validation.push(generateMask (createPessoa.salario, "email", "create", "Salario"))
    validation.push(generateMask (createPessoa.horarioAtuacao, "generic", "create", "HorarioAtuacao"))
    validation.push(generateMask (createPessoa.nomeAlunos[0], "generic", "create", "NomeAlunos"))

    let existe = (funcionarios.map((p) => p.nome == createPessoa.nome)).find(i => i == true)

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
        funcionarios.push(createPessoa)
        carregaListaFuncionarios()

        document.getElementById("createButton").setAttribute("href","#criarFuncionarioModal")

    }
}

// Edita um funcionário, rearmazena-o e restringe os campos de edição

let editarFuncionario = () => {
    let index = parseInt(document.getElementById("editButton").className.split(" ").pop())

    let editPessoa = {
        nome: document.getElementById("editNome").value,
        senha: document.getElementById("editSenha").value,
        salario: parseFloat(document.getElementById("editSalario").value.replace(",", ".")),
        horarioAtuacao: document.getElementById("editHorarioAtuacao").value,
        nomeAlunos: ((document.getElementById("editNomeAlunos").value.split(",")).map((x) => spaceRegex.test(x) ? "" : x)).filter((x) => x != ""),
    }

    let validation = []

    validation.push(generateMask (editPessoa.nome, "letterIdentifier", "edit", "Nome"))
    validation.push(generateMask (editPessoa.senha, "generic", "edit", "Senha"))
    validation.push(generateMask (editPessoa.salario, "float", "edit", "Salario"))
    validation.push(generateMask (editPessoa.horarioAtuacao, "generic", "edit", "HorarioAtuacao"))
    validation.push(generateMask (editPessoa.nomeAlunos[0], "generic", "edit", "NomeAlunos"))

    let pessoa = funcionarios.indexOf(funcionarios.find((p) => p.id == index))
    let existe = (funcionarios.map((p) => p.id != index && p.nome == editPessoa.nome)).find(i => i == true)

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
        funcionarios[pessoa] = {
            id: index,
            nome: editPessoa.nome,
            senha: editPessoa.senha,
            salario: editPessoa.salario,
            horarioAtuacao: editPessoa.horarioAtuacao,
            nomeAlunos: editPessoa.nomeAlunos,
        }
        carregaListaFuncionarios()
        document.getElementById("editButton").setAttribute("href","#editarFuncionarioModal")

    }
}

// Deletar funcionário

let deletarFuncionario = (index) => {
	let pessoa = funcionarios.indexOf(funcionarios.find((p) => p.id == index))
	funcionarios.splice(pessoa, 1)
	carregaListaFuncionarios()
}

// Carregar itens na tela

let htmlListaFuncionarios = (pessoa) => `
	<tr>
		<td>${pessoa.nome}</td>
		<td>${pessoa.salario.toFixed(2).replace(".", ",")}</td>
		<td>${pessoa.horarioAtuacao}</td>
		<td>${pessoa.nomeAlunos.join(", ")}</td>
		<td class="actions">
			<a onclick="formEditar(${pessoa.id})" href="#editarFuncionarioModal" class="edit" data-toggle="modal" data-backdrop="static" data-keyboard="false">
                <i class="material-icons" data-toggle="tooltip" title="Editar">create</i>
            </a>
			<a onclick="deletarFuncionario(${pessoa.id})" href="#" class="delete">
                <i class="material-icons" data-toggle="tooltip" title="Deletar">delete</i>
            </a>
		</td>
	</tr>
`

let carregaListaFuncionarios = () => {
	let content = funcionarios.map(p => htmlListaFuncionarios(p)).join('')
	document.getElementById("tableBody").innerHTML = content
}

document.addEventListener("DOMContentLoaded", carregaListaFuncionarios);


