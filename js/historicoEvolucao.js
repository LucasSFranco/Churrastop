// Armazenamento

let cliente = {
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
}

// Ver histórico de evolução

let historicoEvolucao = (index) => { 

    carregaListaEvolucao(cliente)

    let categorias = []
    let content = ""
    
    for (var i=0; i<cliente.peso.length;i++){
        content = `${cliente.date[i].dia} ${cliente.date[i].mes}`
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
            data: cliente.peso
        }, {
            name: 'Gordura corporal (%)',
            data: cliente.gorduraCorporal
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

document.addEventListener("DOMContentLoaded", historicoEvolucao);