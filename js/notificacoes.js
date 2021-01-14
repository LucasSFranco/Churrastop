/*
	Notificações de falta: 
	1. O cliente ao ir treinar, passa a catraca;
	2. A catraca registra o dia que ela foi utilizada pelo usuário daquele ID;
	3. O dado é armazenado por um mês;
	4. Ao final do mês, o seguinte cálculo é feito: aulas por semana (registrado) * 4 - quantidade de idas;
	5. Tem-se o resultado das faltas do usuário no mês.
	(Viável)

	Notificações de mensalidade:
	1. As mensalidades são pagas do dia 1º ao 5º de cada mês;
	2. Se o usuário não tiver pago no 3º dia ainda, o sistema notifica o usuário.
	(Como ele sabe se pagou?)
*/

// Armazenamento

let notificacoes = [
	{
		message: "Darlyn, você deve pagar sua mensalidade até dia 05/12/2018.",
		date: "03/12/2018",
	},
	{
		message: "Darlyn, você faltou 2 treinos este mês.",
		date: "01/12/2018",
	},
	{
		message: "Darlyn, você deve pagar sua mensalidade até dia 05/11/2018.",
		date: "03/11/2018",
	},
	{
		message: "Darlyn, você faltou 5 treinos este mês.",
		date: "01/11/2018",
	},
]

// Carrega itens na tela

let htmlListanotificacoes = (notificacao) => `
	<tr>
		<td class="date">${notificacao.date}</td>
		<td class="message">${notificacao.message}</td>
	</tr>
`

let carregaListaNotificacoes = () => {
	let content = notificacoes.map(notificacao => htmlListanotificacoes(notificacao)).join('')
	document.getElementById("tableBody").innerHTML = content
}

document.addEventListener("DOMContentLoaded", carregaListaNotificacoes);

