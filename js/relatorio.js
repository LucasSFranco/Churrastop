// Armazenamento

let produtos = [
    {
        id: 0,
        nome: "Água s/ gás 500ml",
        marca: "Crystal",
        quantidadeVendida: 14,
        quantidadeDisponivel:  79,
    },
    {
        id: 1,
        nome: "Água c/ gás 500ml",
        marca: "Crystal",
        quantidadeVendida: 23,
        quantidadeDisponivel: 63,
    },
    { 
        id: 2,
        nome: "Bebida energética 500ml",
        marca: "Gatorade",
        quantidadeVendida: 4,
        quantidadeDisponivel: 26,
    },
    {
        id: 3,
        nome: "Barra de cereal Whey Bar 100g",
        marca: "Hannibal",
        quantidadeVendida: 31,
        quantidadeDisponivel: 82,
    },
    {
        id: 4,
        nome: "Suplemento Whey Protein 3kg",
        marca: "Hannibal",
        quantidadeVendida: 0,
        quantidadeDisponivel: 6,
    },
]

// Produto mais vendido

let produtoMaisVendido = () => {
    let maisVendido = -1;
    let produtoMaisVendido = null;

    for (var i=0; i<produtos.length; i++) {
        if (produtos[i].quantidadeVendida>maisVendido) {
            maisVendido = produtos[i].quantidadeVendida;
            produtoMaisVendido = produtos[i];
        }
    }
    return produtoMaisVendido
}

// Produto menos vendido

let produtoMenosVendido = () => {
    let menosVendido = produtoMaisVendido().quantidadeVendida;
    let produtoMenosVendido = null;

    for (var i=0; i<produtos.length; i++) {
        if (produtos[i].quantidadeVendida<menosVendido) {
            menosVendido = produtos[i].quantidadeVendida;
            produtoMenosVendido = produtos[i];
        }
    }
    return produtoMenosVendido
}

// Carrega itens na tela

let htmlProdutos = (produto) => `
    <tr>
        <td>${produto.nome}</td>
        <td>${produto.marca}</td>
        <td>${produto.quantidadeVendida} un.</td>
        <td>${produto.quantidadeDisponivel} un.</td>
    </tr>
` 

let carregaProdutos = () => {

    let maisVendido = produtoMaisVendido()
    let menosVendido = produtoMenosVendido()

    let content = produtos.map(p => htmlProdutos(p)).join("")

    document.getElementById("produtos").innerHTML = content
    document.getElementById("produtoMaisVendido").innerHTML = `
        <tr>
            <td>${maisVendido.nome} - ${maisVendido.marca}</td>
        </tr>
    `
    document.getElementById("produtoMenosVendido").innerHTML = `
        <tr>
            <td>${menosVendido.nome} - ${menosVendido.marca}</td>
        </tr>
    `
}

document.addEventListener("DOMContentLoaded", carregaProdutos);