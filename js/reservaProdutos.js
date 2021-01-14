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

// Remove todos os atributos pendentes dos campos de reservar produto

let formReserve = (index) => {

    let produto = produtos.find(p => p.id == index)

    document.getElementById("reserveButton").classList = ""
    document.getElementById("reserveButton").classList.add(`${index}`)
    document.getElementById("reserveButton").setAttribute("href","")
    document.getElementById('quantidadeDisponivel').textContent = `Quantidade disponível: ${produto.quantidade}` 

    document.getElementById("reserveQuantidade").value = 1
    document.getElementById("reserveErrorQuantidade").textContent=""
    document.getElementById("reserveQuantidade").classList.remove("input-error")

}

// Reserva produto e dá baixa no estoque

let reservarProduto = () => {

    let index = parseInt(document.getElementById("reserveButton").className.split(" ").pop())

    let quantidadeDesejada = parseInt(document.getElementById("reserveQuantidade").value)
    let quantidadeDisponivel = produtos[index].quantidade

    let validation = []

    validation.push(generateMask(quantidadeDesejada, "int", "reserve", "Quantidade"))

    if (quantidadeDesejada > quantidadeDisponivel) {
        document.getElementById("reserveErrorQuantidade").textContent="Quantidade indisponível"
        document.getElementById("reserveQuantidade").classList.add("input-error")
        validation.push(false)
    }

    if (validation.every(x => x)) {
        produtos[index].quantidade -= quantidadeDesejada
        carregaProdutos()
        document.getElementById("reserveButton").setAttribute("href", "#reservarProdutoModal")
        document.getElementById('quantidadeDisponivel').textContent = `Quantidade disponível: ${produtos[index].quantidade}`
    }
}

// Carrega itens na tela

let htmlProdutos = (produto) => `
    <div class="col-3"> 
        <div onClick="formReserve(${produto.id})" class="card" data-toggle="modal" data-target="#reservarProdutoModal">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Marca: ${produto.marca} </li>
                <li class="list-group-item">Quantidade disponível: ${produto.quantidade}</li>
                <li class="list-group-item">Preço: R$ ${produto.preco.toFixed(2).replace(".", ",")}</li>
            </ul>
        </div>
    </div>
` 

var carregaProdutos = () => {
    let content = produtos.map(p => htmlProdutos(p)).join("")
    document.getElementById("produtos").innerHTML = content
}

document.addEventListener("DOMContentLoaded", carregaProdutos);