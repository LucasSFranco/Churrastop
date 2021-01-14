// Útil

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const wordRegex = RegExp(
    /^[a-zA-Z\s]*$/
);

const spaceRegex = RegExp(
    /^[\s]*$/
);

// Minimiza a primeira letra de uma palavra

let minimizeFirstLetter = (word) => {
    word = word[0].toLowerCase() + word.slice(1)
    return word
}

// Gera máscaras para os campos de registro 

let generateMask = (value, type, formType, name) => {

    let validation = false;

    if (type == "email") {
        if (!value) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else if(!emailRegex.test(value)) {
            document.getElementById(`${formType}Error${name}`).textContent="Valor inválido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    } if (type == "int") {
        let verification = document.getElementById(`${formType}${name}`).value.replace(".", "Y")

        if (isNaN(Number(verification)) || verification == "0") {
            document.getElementById(`${formType}Error${name}`).textContent="Valor inválido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else if(!Number(verification)) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    } else if (type == "float") {
        let verification = document.getElementById(`${formType}${name}`).value.replace(",", ".")

        if (isNaN(Number(verification)) || verification == "0") {
            document.getElementById(`${formType}Error${name}`).textContent="Valor inválido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else if(!Number(verification)) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    } else if (type=="generic") {
        if(!value) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    } else if (type=="genericIdentifier") {
        if(!value) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
            document.getElementById(`${formType}ErrorExistente`).textContent=""
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    } else {
        if(!value) {
            document.getElementById(`${formType}Error${name}`).textContent="Campo não preenchido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
            if (type == "letterIdentifier") {
                document.getElementById(`${formType}ErrorExistente`).textContent=""
            }
        } else if (!wordRegex.test(value)) {
            document.getElementById(`${formType}Error${name}`).textContent="Valor inválido"
            document.getElementById(`${formType}${name}`).classList.add("input-error")
            if (type == "letterIdentifier") {
                document.getElementById(`${formType}ErrorExistente`).textContent=""
            }
        } else {
            document.getElementById(`${formType}Error${name}`).textContent=""
            document.getElementById(`${formType}${name}`).classList.remove("input-error")
            validation = true
        }
    }

    return validation
}

// Gera o mes do ano

let generateMonth = (mes) => {

    let mesAno = ""

    switch(mes) {
        case 0:
            mesAno = "Jan"
            break
        case 1:
            mesAno = "Fev"
            break
        case 2:
            mesAno = "Mar"
            break
        case 3:
            mesAno = "Abr"
            break
        case 4:
            mesAno = "Mai"
            break
        case 5:
            mesAno = "Jun"
            break
        case 6:
            mesAno = "Jul"
            break
        case 7:
            mesAno = "Ago"
            break
        case 8:
            mesAno = "Set"
            break
        case 9:
            mesAno = "Out"
            break
        case 10:
            mesAno = "Nov"
            break
        case 11:
            mesAno = "Dez"
            break
    }
    return mesAno
}