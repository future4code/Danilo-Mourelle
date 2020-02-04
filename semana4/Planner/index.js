function addTask() {
  let atividade = document.getElementById("tarefa").value
  if (atividade !== "") {
    debugger
    document.getElementById("tarefa").value = ""
    let diaDaSemana = document.getElementById("dia-da-semana").value

    document.querySelector("#" + diaDaSemana + " ul").innerHTML += "<li>" + atividade + "</li>"
       
  }
}

function riscaTask(event) {
  if (event.target.style.textDecoration === "line-through") {
    event.target.style.textDecoration = "none"
    event.target.style.color = "inherit"
  }
  else {
    event.target.style.textDecoration = "line-through"
    event.target.style.color = "red"
  }
}

function apagaTudo() {
  for (let index = 1; index <= 7; index++)  {
    switch (index) {
      case 1:
        diaDaSemana = "Segunda"
        break;
      case 2:
        diaDaSemana = "Terça"
        break;
      case 3:
        diaDaSemana = "Quarta"
        break;
      case 4:
        diaDaSemana = "Quinta"
        break;
      case 5:
        diaDaSemana = "Sexta"
        break;
      case 6:
        diaDaSemana = "Sabado"
        break;
      case 7:
        diaDaSemana = "Domingo"
        break;
    }
    document.querySelector("#" + diaDaSemana + " ul").innerHTML = ""
  }
}
