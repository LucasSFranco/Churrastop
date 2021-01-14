// Útil

campos = ["Nome", "Marca", "Preco", "Quantidade"]

// Armazenamento

let produtos = [
	{
		id: 0,
		nome: "Água s/ gás 500ml",
		marca: "Crystal",
		preco: 3,
		quantidade: 79,
	},
	{
		id: 1,
		nome: "Água c/ gás 500ml",
		marca: "Crystal",
		preco: 4,
		quantidade: 63,
	},
	{ 
		id: 2,
		nome: "Bebida energética 500ml",
		marca: "Gatorade",
		preco: 5.99,
		quantidade: 26,
	},
	{
		id: 3,
		nome: "Barra de cereal Whey Bar 100g",
		marca: "Hannibal",
		preco: 3.49,
		quantidade: 82,
	},
	{
		id: 4,
		nome: "Suplemento Whey Protein 3kg",
		marca: "Hannibal",
		preco: 94.99,
		quantidade: 6,
	},
]

// Remove todos os atributos pendentes dos campos de criar produto

let formCriar = () => {

    document.getElementById("createButton").setAttribute("href","")

    campos.map((c) => {
        document.getElementById(`create${c}`).value = ""
        document.getElementById(`create${c}`).classList.remove("input-error")
        document.getElementById(`createError${c}`).textContent=""
    })
    document.getElementById("createErrorExistente").textContent=""
}

// Remove todos os atributos pendentes dos campos de editar produto

let formEditar = (index) => {
    let item = produtos.find(i => i.id == index)

    document.getElementById("editButton").classList = ""
    document.getElementById("editButton").classList.add(`${index}`)
    document.getElementById("editButton").setAttribute("href","") 

    campos.map((c) => {

        document.getElementById(`edit${c}`).classList.remove("input-error")
        document.getElementById(`editError${c}`).textContent=""
        document.getElementById(`edit${c}`).value = item[minimizeFirstLetter(c)]
    
    })
    document.getElementById("editErrorExistente").textContent=""
}

// Cria um produto, armazena-o e restringe os campos de cadastro

let criarProduto = () => {

    let createProduto = {
        id: produtos.length,
        nome: document.getElementById("createNome").value,
        marca: document.getElementById("createMarca").value,
        preco: parseFloat(document.getElementById("createPreco").value.replace(",", ".")),
        quantidade: parseInt(document.getElementById("createQuantidade").value),
    }

    let validation = []

    validation.push(generateMask(createProduto.nome, "genericIdentifier", "create", "Nome"))
    validation.push(generateMask(createProduto.marca, "genericIdentifier", "create", "Marca"))
    validation.push(generateMask(createProduto.preco, "float", "create", "Preco"))
    validation.push(generateMask(createProduto.quantidade, "int", "create", "Quantidade"))

    let existe = (produtos.map(p => p.nome == createProduto.nome)).find(i => i == true)

    if (existe && createProduto.nome) {
        document.getElementById("createErrorExistente").textContent="Pessoa já existe"
        document.getElementById("createNome").classList.add("input-error")
        validation.push(false)
    } else if (!existe && createProduto.nome) {
        document.getElementById("createNome").classList.remove("input-error")
        document.getElementById("createErrorExistente").textContent=""
        validation.push(true)
    }

    if (validation.every(x => x)) {
        produtos.push(createProduto)
        carregaListaProdutos()

        document.getElementById("createButton").setAttribute("href","#criarProdutoModal")

    }
}

// Edita um produto, rearmazena-o e restringe os campos de edição

let editarProduto = () => {
    let index = parseInt(document.getElementById("editButton").className.split(" ").pop())

    let editProduto = {
        id: produtos.length,
        nome: document.getElementById("editNome").value,
        marca: document.getElementById("editMarca").value,
        preco: parseFloat(document.getElementById("editPreco").value.replace(",", ".")),
        quantidade: parseInt(document.getElementById("editQuantidade").value),
    }

    console.log(editProduto)

    let pessoa = produtos.indexOf(produtos.find(p => p.id == index))
    let existe = (produtos.map(p => p.id != index && p.nome == editProduto.nome && p.marca == editProduto.marca)).find(i => i == true)

    let validation = []

    validation.push(generateMask(editProduto.nome, "genericIdentifier", "edit", "Nome"))
    validation.push(generateMask(editProduto.marca, "genericIdentifier", "edit", "Marca"))
    validation.push(generateMask(editProduto.preco, "float", "edit", "Preco"))
    validation.push(generateMask(editProduto.quantidade, "int", "edit", "Quantidade"))

    if (existe) {
        document.getElementById("editErrorExistente").textContent="Produto já existente"
        document.getElementById("editNome").classList.add("input-error")
        document.getElementById("editMarca").classList.add("input-error")
        validation.push(false)
    } else if (!existe && editProduto.nome && editarProduto.marca) {
        document.getElementById("editNome").classList.remove("input-error")
        document.getElementById("editMarca").classList.remove("input-error")
        document.getElementById("editErrorExistente").textContent=""
        validation.push(true)
    }

    if (validation.every(x => x)) {
        produtos[pessoa] = {
            id: index,
            nome: editProduto.nome,
            marca: editProduto.marca,
            preco: editProduto.preco,
            quantidade: editProduto.quantidade,
        }
        carregaListaProdutos()
        document.getElementById("editButton").setAttribute("href","#editarProdutoModal")
    }
}

// Deletar produto

let deletarProduto = (index) => {
	let item = produtos.indexOf(produtos.find(p => p.id == index))
	produtos.splice(item, 1)
	carregaListaProdutos()
}

// Carregar itens na tela

let htmlListaProdutos = (produto) => `
	<tr>
		<td>${produto.nome}</td>
		<td>${produto.marca}</td>
		<td>${produto.preco.toFixed(2).replace(".", ",")}</td>
		<td>${produto.quantidade} un.</td>
		<td class="actions">
			<a onclick="formEditar(${produto.id})" href="#editarProdutoModal" class="edit" data-toggle="modal" data-backdrop="static" data-keyboard="false">
                <i class="material-icons" data-toggle="tooltip" title="Editar">create</i>
            </a>
			<a onclick="deletarProduto(${produto.id})" href="#" class="delete">
                <i class="material-icons" data-toggle="tooltip" title="Deletar">delete</i>
            </a>
		</td>
	</tr>
`

let carregaListaProdutos = () => {
	let content = produtos.map(p => htmlListaProdutos(p)).join('')
	document.getElementById("tableBody").innerHTML = content
}

document.addEventListener("DOMContentLoaded", carregaListaProdutos);


