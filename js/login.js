function logar(){

    var user = {
        nomeUsuario: document.getElementById("nomeUsuario").value,
        senha: document.getElementById("senha").value,
        validation: null,
        role: null
    }

    if (user.nomeUsuario === "admin" && user.senha === "admin") {
        user.validation = true;
        user.role = "admin"
    } else if (user.nomeUsuario === "cliente" && user.senha === "cliente") {
        user.validation = true;
        user.role = "cliente"
    } else if (user.nomeUsuario === "func" && user.senha === "func") {
        user.validation = true;
        user.role = "func"
    } else {
        user.validation = false;
    }

    if (!user.nomeUsuario) {
        document.getElementById("errorLogin").textContent=""
        document.getElementById("errorNomeUsuario").textContent="Campo não preenchido"
        document.getElementById("nomeUsuario").classList.add("input-error")
    } else {
        document.getElementById("errorNomeUsuario").textContent=""
        document.getElementById("nomeUsuario").classList.remove("input-error")
    }
    if (!user.senha) {
        document.getElementById("errorLogin").textContent=""
        document.getElementById("errorSenha").textContent="Campo não preenchido"
        document.getElementById("senha").classList.add("input-error")
    } else {
        document.getElementById("errorSenha").textContent=""
        document.getElementById("senha").classList.remove("input-error")
    }
    if (!user.validation && user.nomeUsuario && user.senha) {
        document.getElementById("errorLogin").textContent="Nome do usuário ou senha incorretos"
        document.getElementById("senha").classList.add("input-error")
        document.getElementById("nomeUsuario").classList.add("input-error")
    } else if (user.validation && user.nomeUsuario && user.senha) {
        document.getElementById("errorLogin").textContent=""
        document.getElementById("senha").classList.remove("input-error")
        document.getElementById("nomeUsuario").classList.remove("input-error")
    }

    if(user.nomeUsuario && user.senha && user.validation) {
        console.log("Logado!")
        if (user.role === "admin") {
            window.location.href = "homeAdmin.html"
        } else if (user.role === "cliente") {
            window.location.href = "homeCliente.html"
        } else if (user.role === "func") { 
            window.location.href = "homeFuncionario.html"
        } else {
            console.log("Erro ao realizar login!")
        }
    }
} 