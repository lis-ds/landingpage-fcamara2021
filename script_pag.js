////// Funções do POPUPS
// Exibe o popup (novas telas)
function showPopup(id) {
  document.getElementById(id).style.visibility = "visible";
}

// Esconde o popup
function hidePopup(id) {
  document.getElementById(id).style.visibility = "hidden";

  if (id == "cancelamento") {
    document.getElementById("consulta-cancel").innerHTML = "";
  } else if (id == "consulta-geral") {
    document.getElementById("consulta-saopaulo").checked = false;
    document.getElementById("consulta-santos").checked = false;
    document.getElementById(
      "consulta-menu"
    ).innerHTML = `<option selected disabled value="">Selecione um escritório para consulta</option>`;
    document.getElementById("imprimir-agend").innerHTML = "";

    document.getElementById("consulta-consult").innerHTML = "";
  }
}

// Navegação pelas abas de consultas
function abrirConsulta(consulta) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(consulta).style.display = "block";
  event.currentTarget.className += " active";
}

// Começa com a aba id="consultaPrincipal" já aberta
document.getElementById("consultaPrincipal").click();