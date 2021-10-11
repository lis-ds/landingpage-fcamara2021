
// Agendamentos do escritório de São Paulo
var escritorio_SaoPaulo = [
  {
    data: "2021-09-25",
    dados: [
      { Nome: "Eduardo Esteves", codCad: 105, Mesa: 4 },
      { Nome: "André Alves", codCad: 101, Mesa: 6 },
      { Nome: "Bruno Borges", codCad: 102, Mesa: 8 },
	  { Nome: "Carlos Castro", codCad: 103, Mesa: 10 }
    ]
  },
  {
    data: "2021-10-26",
    dados: [
      { Nome: "André Alves", codCad: 101, Mesa: 14 },
      { Nome: "Daniela Dias", codCad: 104, Mesa: 5 },
	  { Nome: "Carlos Castro", codCad: 103, Mesa: 7 },
    ]
  },
  {
    data: "2021-10-27",
    dados: [
	  { Nome: "Daniela Dias", codCad: 104, Mesa: 1 },
	  { Nome: "André Alves", codCad: 101, Mesa: 5 },
	  { Nome: "Bruno Borges", codCad: 102, Mesa: 8 }
	 ]
  },
  {
    data: "2021-11-08",
    dados: [
      { Nome: "Bruno Borges", codCad: 102, Mesa: 3 },
      { Nome: "Daniela Dias", codCad: 104, Mesa: 6 },
	  { Nome: "Eduardo Esteves", codCad: 105, Mesa: 8 }
    ]
  },
  {
    data: "2022-04-15",
    dados: [
      { Nome: "Bruno Borges", codCad: 102, Mesa: 1 },
      { Nome: "André Alves", codCad: 101, Mesa: 2 },
      { Nome: "Eduardo Esteves", codCad: 105, Mesa: 7 }
    ]
  }
];

// Agendamentos do escritório de Santos
var escritorio_Santos = [
  {
    data: "2021-10-26",
    dados: [
      { Nome: "Fernanda Freitas", codCad: 106, Mesa: 6 },
      { Nome: "Bruno Borges", codCad: 102, Mesa: 8 },
	  { Nome: "Eduardo Esteves", codCad: 105, Mesa: 9 }
    ]
  },
  {
    data: "2021-11-04",
    dados: [
      { Nome: "Gustavo Gomes", codCad: 107, Mesa: 2 },
      { Nome: "Carlos Castro", codCad: 103, Mesa: 3 },
      { Nome: "Daniela Dias", codCad: 104, Mesa: 5 },
	  { Nome: "Bruno Borges", codCad: 102, Mesa: 7 },
    ]
  }
];

// Banco de cadastros
var banco_codCad = [
  { codCad: 101, Nome: "André Alves" },
  { codCad: 111, Nome: "André Alves" },
  { codCad: 102, Nome: "Bruno Borges" },
  { codCad: 103, Nome: "Carlos Castro" },
  { codCad: 104, Nome: "Daniela Dias" },
  { codCad: 105, Nome: "Eduardo Esteves" },
  { codCad: 106, Nome: "Fernanda Freitas" },
  { codCad: 107, Nome: "Gustavo Gomes" },
  { codCad: 108, Nome: "Henrique Honório" },
  { codCad: 109, Nome: "Isabel Inácio" },
  { codCad: 110, Nome: "João Jorge" },
];

var tamCodCad = 3; // Núm. de dígitos no cód. cadastro
var tipoCodCad = "Cód. Cadastro";
var lotacao = 0.4; // Lotação percentual máxima permitida (1=100%)
var numMesas_SaoPaulo = 20;
var numMesas_Santos = 12;
var entraDia = "no";

geraCampoData(); // Gera campo de data com restrição de dia


//////////////////////////////////////////////////////////////////
////----------------- FUNÇÕES DO AGENDAMENTO------------------////
//////////////////////////////////////////////////////////////////


// Gera campo de data com restrição de dias anteriores ao dia atual
function geraCampoData() {
  var dia_hoje = new Date().toISOString().split("T")[0];
  document.getElementsByClassName("campoData")[0].setAttribute("min", dia_hoje);
}

// Habilita campo de Cód de Cadastro
function liberaCodCad() {
  document.getElementById("codCad").disabled = false;

  // Caso já haja uma data selecionada, refaz a função de verificação de disponibilidade
  if (entraDia == "yes") {
    selecionaDia();
    document.getElementById("btnAgendar").disabled = true;
  }
}


//  Verifica cód. cadastro preenchido e apresenta mensagem de erro para codCad inválido ou não cadastado
// 'Libera' resto do formulário depois de preenchido e validado o cód.Cad
function verificaCodCad(opcao) {
  if (opcao == "agend") {
    var codCad = parseInt(document.getElementById("codCad").value);
    var aviso_codCad = "aviso-codCad";
    var nome = "nome";
    var botao = "btnAgendar";
  } else if (opcao == "cancel") {
    var codCad = parseInt(document.getElementById("codCad-cancel").value);
    var aviso_codCad = "aviso-codCad-cancel";
    var nome = "nome-cancel";
    var botao = "btnCancelar";
  } else if (opcao == "consult") {
    var codCad = parseInt(document.getElementById("codCad-consult").value);
    var aviso_codCad = "aviso-codCad-consult";
    var nome = "nome-consult";
    var botao = "btnConsultar";
  }

  document.getElementById(botao).disabled = true;

  if (codCad.toString().length == tamCodCad) {
    // Verifica elegibilidade do cód.Cad digitado (tem o tamanho exigido)
    var j = banco_codCad.findIndex((i) => i.codCad == codCad); // Procura Cód.Cad no banco

    if (j >= 0) {
      // Encontrou cód.Cad no banco
      // Liberar resto do formulário:
      document.getElementById(aviso_codCad).innerHTML = ""; // Apaga avisos

      // Preenche nome pelo cód. cadastro
      document.getElementById(nome).value = banco_codCad[j].Nome;

      if (opcao == "agend") {
        // Libera campo de data
        document.getElementById("dia").disabled = false;
      } else {
        document.getElementById(botao).disabled = false;
      }
    } else {
      // Não encontrou cód.Cad no banco
      // Aviso de erro
      document.getElementById(
        aviso_codCad
      ).innerHTML = `${tipoCodCad} não cadastrado`;
      entraDia = "no";
      document.getElementById(nome).value = "";
      document.getElementById("dia").value = "";
      document.getElementById("dia").disabled = true;
      document.getElementById("mesas-disp").innerHTML = "";
      document.getElementById("btnAgendar").disabled = true;
    }
  } else {
    // cód.Cad digitado não elegível (menor ou maior que o tamanho exigido)
    // Aviso de erro
    document.getElementById(
      aviso_codCad
    ).innerHTML = `${tipoCodCad} deve ter ${tamCodCad} dígitos`;
    entraDia = "no";
    document.getElementById(nome).value = "";
    document.getElementById("dia").value = "";
    document.getElementById("dia").disabled = true;
    document.getElementById("mesas-disp").innerHTML = "";
    document.getElementById("btnAgendar").disabled = true;
  }
} // fim da function verificaCodCad(opcao)


// Ao selecionar o dia, apresenta disponibilidade das mesas de trabalho para seleção
function selecionaDia() {
  entraDia = "yes"; // controle de entrada na função (verificada quando seleciona escritório)
  var dia = document.getElementById("dia").value;
  var codCad = document.getElementById("codCad").value;
  console.log(dia);

  // Fazer verificação da elegibilidade do dia (se não é fim de semana ou dia anterior ao dia atual)
  if (diasRestritos(dia)) {
    return;
  }

  // Seleção do escritório
  if (document.getElementById("saopaulo").checked == true) {
    var escritorio = escritorio_SaoPaulo;
    var numMesas = numMesas_SaoPaulo;
  } else if (document.getElementById("santos").checked == true) {
    var escritorio = escritorio_Santos;
    var numMesas = numMesas_Santos;
  }

  // Verificar se o consultor já está agendado nessa data
  var k1 = escritorio_SaoPaulo.findIndex((i) => i.data == dia);
  var k2 = escritorio_Santos.findIndex((i) => i.data == dia);

  if (k1 >= 0) {
    if (
      escritorio_SaoPaulo[k1].dados.findIndex((i) => i.codCad == codCad) >= 0
    ) {
      var divMesas = document.getElementById("mesas-disp");
      divMesas.innerHTML =
        "Consultor já agendado nessa data no escritório de São Paulo";
      return;
    }
  } else if (k2 >= 0) {
    if (escritorio_Santos[k2].dados.findIndex((i) => i.codCad == codCad) >= 0) {
      var divMesas = document.getElementById("mesas-disp");
      divMesas.innerHTML =
        "Consultor já agendado nessa data no escritório de Santos";
      return;
    }
  }
  //
  
  var w = window.innerWidth;
		if (w > 970) {
			var n = 4;
		} else {
			var n = 5;
		} // organiza disposição dos radio-button

  // Exibir as mesas disponíveis
  // Verifica se já há agendamentos na data (se a data já está no banco)
  // Se houver, retorna o índice da data. Se não, retorna -1
  var j = escritorio.findIndex((i) => i.data == dia);
  if (j >= 0) {
    // Há agendamentos nessa data
    console.log(escritorio[j]);

    if (escritorio[j].dados.length == lotacao * numMesas) {
      // Lotação atingida, não aparecem opções p/ seleção
      var divMesas = document.getElementById("mesas-disp");
      divMesas.innerHTML = "Não há mais vagas.<br> Lotação máxima atingida";
    } else if (escritorio[j].dados.length < lotacao * numMesas) {
      // Apresenta mapa de seleção verificando disponibilidade
      var divMesas = document.getElementById("mesas-disp");
      var opcoesMesas = "Selecione a estação de trabalho desejada:<br>";

      var ni;
	  	  
      for (var i = 1; i <= numMesas; i++) {
        if (i < 10) {
          ni = "0" + i;
        } else {
          ni = i;
        }

        if (escritorio[j].dados.some((e) => e.Mesa == i)) {
          // botão da mesa desabilitado
          opcoesMesas += `<input type='radio' onclick='habilitaAgendar()' name='mesa' id='mesa${i}' value='${i}' disabled>
        <label style='color:#969696;' for='mesa${i}'>${ni}</label>`;
        } else {
          // botão da mesa habilitado
          opcoesMesas += `<input type='radio' onclick='habilitaAgendar()' name='mesa' id='mesa${i}' value='${i}'>
        <label for='mesa${i}'>${ni}</label>`;
        }

        if (i % n == 0) { opcoesMesas += "<br>"; }
      }

      // Imprime o mapa de mesas na tela
      divMesas.innerHTML = opcoesMesas;
    }
  } else {
    // Se não houver agendamento ainda, j = -1
    console.log("Sem agendamentos nesse dia");
    // Criar um objeto com a nova data <- pendente

    var divMesas = document.getElementById("mesas-disp");
    var opcoesMesas = "Selecione a estação de trabalho desejada:<br>";
    var ni;
    for (var i = 1; i <= numMesas; i++) {
      if (i < 10) {
        ni = "0" + i;
      } else {
        ni = i;
      }
      opcoesMesas += `<input type='radio' onclick='habilitaAgendar()' name='mesa' id='mesa${i}' value='${i}'>
        <label for='mesa${i}'>${ni}</label>`;

      if (i % n == 0) {
        opcoesMesas += "<br>";
      }
    }
    divMesas.innerHTML = opcoesMesas;
  }
} // Fecha a function selecionaDia()


// Função que grava agendamento
// Grava dados no array, apresenta mensagem de conclusão
function agendamento() {
  // Seleção do escritório
  if (document.getElementById("saopaulo").checked == true) {
    var escritorio = escritorio_SaoPaulo;
    var escritorioSelect = "São Paulo";
  } else if (document.getElementById("santos").checked == true) {
    var escritorio = escritorio_Santos;
    var escritorioSelect = "Santos";
  }

  var codCad = parseInt(document.getElementById("codCad").value);
  var nome = document.getElementById("nome").value;
  var dia = document.getElementById("dia").value;

  var radioMesas = document.getElementsByName("mesa");
  for (var i = 0; i < radioMesas.length; i++) {
    if (radioMesas[i].checked == true) {
      var mesa = parseInt(radioMesas[i].value);
      break;
    }
  }

  // Grava agendamento no array
  var j = escritorio.findIndex((i) => i.data == dia);
  if (j >= 0) {
    // Caso já exista agendamentos no dia <- data já existe no array
    var k = escritorio[j].dados.length;
    escritorio[j].dados[k] = { Nome: nome };
    escritorio[j].dados[k].codCad = codCad;
    escritorio[j].dados[k].Mesa = mesa;

    ordenarMesas(escritorio[j].dados);
  } else {
    // Caso seja primeiro agendamento no dia <- data não existe no array
    var k = escritorio.length;
    escritorio[k] = { data: dia };
    escritorio[k].dados = [{ Nome: nome }];
    escritorio[k].dados[0].codCad = codCad;
    escritorio[k].dados[0].Mesa = mesa;

    ordenarDatas(escritorio);
  }

  var y = dia.slice(0, 4);
  var m = dia.slice(5, 7);
  var d = dia.slice(8, 10);

  // Mensagem confirmando agendamento
  var mensagem = document.getElementById("confirm-agend");
  var textoMensagem = `<p>${d} de ${retornaMes(m)} de ${y}</p>`;
  textoMensagem += `<p>Consultor: ${nome}</p>`;
  textoMensagem += `<p>Escritório de ${escritorioSelect} &mdash; Estação de trabalho: ${mesa}</p>`;

  mensagem.innerHTML = textoMensagem;

  showPopup("mensagem-confirm");

  zerarForm(1);
} // Fecha a function agendamento()

// Habilita o botão agendar
function habilitaAgendar() {
  document.getElementById("btnAgendar").disabled = false;
}

// Restringe dias que não se pode agendar (ex: dias passados e fins de semana)
function diasRestritos(dia) {
  var dia_hoje = new Date().toISOString();
  var divMesas = document.getElementById("mesas-disp");

  if (dia == "") {
    divMesas.innerHTML = "Data inválida!";
    return true;
  }

  dia_hoje = parseInt(
    dia_hoje.slice(0, 4) + dia_hoje.slice(5, 7) + dia_hoje.slice(8, 10)
  );
  var dia_select = parseInt(
    dia.slice(0, 4) + dia.slice(5, 7) + dia.slice(8, 10)
  );

  if (dia_hoje > dia_select) {
    divMesas.innerHTML = "Não é possível agendar em uma data anterior à atual.";
    return true;
  }

  var y = parseInt(dia.slice(0, 4));
  var m = parseInt(dia.slice(5, 7));
  var d = parseInt(dia.slice(8, 10));

  var dia_semana = new Date(y, m - 1, d).getDay();
  if (dia_semana == 0 || dia_semana == 6) {
    divMesas.innerHTML = "Não é possível agendar no fim de semana.";
    return true;
  }

  return false;
}

// Botão de zerar (resetar o formulário)
function zerarForm(id) {
  entraDia = "no";

  if (id != 1) {
    document.getElementById("saopaulo").checked = false;
    document.getElementById("santos").checked = false;
    document.getElementById("codCad").value = "";
    document.getElementById("codCad").disabled = true;
    document.getElementById("aviso-codCad").innerHTML = "";
    document.getElementById("nome").value = "";
    document.getElementById("dia").disabled = true;
  }
  
  document.getElementById("dia").value = "";
  document.getElementById("mesas-disp").innerHTML = "";
  document.getElementById("btnAgendar").disabled = true;
}

// Função para retornar mês por extenso (ex: 10 = Outubro)
function retornaMes(numMes) {
  var nomeMes;
  var arrayMeses = [
    "!Erro!",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];

  if (arrayMeses[parseInt(numMes)] == undefined) {
    return "!Erro!";
  } else {
    return arrayMeses[parseInt(numMes)];
  }
} // Fecha a function retornaMes(numMes)


// Função para ordenar arrays por data
function ordenarDatas(array) {
  array.sort(function (a, b) {
    if (a.data > b.data) {
      return 1;
    }
    if (a.data < b.data) {
      return -1;
    }
    if (a.data == b.data) {
      return 0;
    }
  });
}

// Função para ordenar cada data por nº da mesa
function ordenarMesas(array) {
  array.sort(function (a, b) {
    if (a.Mesa > b.Mesa) {
      return 1;
    }
    if (a.Mesa < b.Mesa) {
      return -1;
    }
    if (a.Mesa == b.Mesa) {
      return 0;
    }
  });
}


//////////////////////////////////////////////////////////////////
////---------------- FUNÇÕES DE CANCELAMENTO------------------////
//////////////////////////////////////////////////////////////////


// Consulta agendamentos por cód.Cadastro
function consultaCodCad(opcao) {
  if (opcao == "cancel") {
    var codCad = parseInt(document.getElementById("codCad-cancel").value);
    var nome = document.getElementById("nome-cancel").value;
    var saopaulo = "saopaulo-cancel";
    var santos = "santos-cancel";
    var aviso = document.getElementById("consulta-cancel");
  } else if (opcao == "consult") {
    var codCad = parseInt(document.getElementById("codCad-consult").value);
    var nome = document.getElementById("nome-consult").value;
    var saopaulo = "saopaulo-consult";
    var santos = "santos-consult";
    var aviso = document.getElementById("consulta-consult");
  }

  // Seleção do escritório
  if (document.getElementById(saopaulo).checked == true) {
    var escritorio = escritorio_SaoPaulo;
    var escritorioSelect = "São Paulo";
  } else if (document.getElementById(santos).checked == true) {
    var escritorio = escritorio_Santos;
    var escritorioSelect = "Santos";
  } else {
    aviso.innerHTML = "Selecione um escritório";
    return;
  }

  var texto = `<p>Agendamentos de ${nome}</p>`;
  texto += `<p>Escritório de ${escritorioSelect}</p>`;
  var cont_zero = true;
  var qual_mes = 0;

  var dia_hoje = new Date().toISOString();
  var mes_hoje = dia_hoje.slice(0, 4) + dia_hoje.slice(5, 7);
  mes_hoje = parseInt(mes_hoje);

  texto += `<ul>`;

  for (var i = 0; i < escritorio.length; i++) {
    var y = escritorio[i].data.slice(0, 4);
    var m = escritorio[i].data.slice(5, 7);

    if (parseInt(y + m) >= mes_hoje) {
      var j = escritorio[i].dados.findIndex((i) => i.codCad == codCad);
    } else {
      var j = -1;
    }

    if (j >= 0) {
      cont_zero = false;
      var d = escritorio[i].data.slice(8, 10);
      var mesa = escritorio[i].dados[j].Mesa;

      if (qual_mes != y + m) {
        texto += `</ul><ul><b>${retornaMes(m)}/${y}:</b>`;
        qual_mes = y + m;
      }

      if (mesa < 10) {
        var nmesa = "0" + mesa;
      } else {
        var nmesa = mesa;
      }

      texto += `<li>${d}/${m}/${y} &mdash; Estação de trabalho: ${nmesa}`;

      if (opcao == "cancel") {
        texto += ` <a onclick='cancelaAgend(${i},${j},"${escritorioSelect}")'>(Excluir)</a>`;
      }

      texto += `</li>`;
    }
  }

  texto += `</ul>`;

  if (cont_zero) {
    texto += `<p>Não há agendamentos do consultor nesse escritório.</p>`;
  }

  aviso.innerHTML = texto;
} // fim function consultaCodCad(opcao)


// Exclui agendamento do array
function cancelaAgend(i, j, escritorioSelect) {
  console.log(i, j, escritorioSelect);

  // Seleção do escritório
  if (escritorioSelect == "São Paulo") {
    var escritorio = escritorio_SaoPaulo;
  } else if ((escritorioSelect = "Santos")) {
    var escritorio = escritorio_Santos;
  }

  escritorio[i].dados.splice(j, 1);

  if (escritorio[i].dados.length == 0) {
    escritorio.splice(i, 1);
  }

  consultaCodCad("cancel");
} // fim da function cancelaAgend(i, j, escritorioSelect)


//////////////////////////////////////////////////////////////////
////------------------- FUNÇÕES DE CONSULTA-------------------////
//////////////////////////////////////////////////////////////////

// Cria menu de seleção p/ consulta a partir do escritório selecionado
function menuConsultaAgend(local) {
  if (local == "saopaulo") {
    var escritorio = escritorio_SaoPaulo;
  } else if (local == "santos") {
    var escritorio = escritorio_Santos;
  }

  document.getElementById("imprimir-agend").innerHTML = "";

  var cont_zero = true;
  var dia_hoje = new Date().toISOString();
  var mes_hoje = dia_hoje.slice(0, 4) + dia_hoje.slice(5, 7);
  mes_hoje = parseInt(mes_hoje);

  var menuConsulta = document.getElementById("consulta-menu");
  // Cria um dropdown menu com os meses com agendamentos
  var codigoMenu =
    '<option selected disabled value="">Selecione um mês para consulta</option>';
  var j = "0";
  var k = "0";

  for (var i = 0; i < escritorio.length; i++) {
    var y = escritorio[i].data.slice(0, 4);
    var m = escritorio[i].data.slice(5, 7);

    if (parseInt(y + m) < mes_hoje) {
      j = escritorio[i].data.slice(0, 7);
    }

    if (escritorio[i].data.slice(0, 7) != j) {
      cont_zero = false;
      j = escritorio[i].data.slice(0, 7);

      if (k != y) {
        if (k != "0") {
          codigoMenu += `</optgroup>`;
        }
        codigoMenu += `<optgroup label="${y}">`;
        k = y;
      }

      codigoMenu += `<option value="${j}">${retornaMes(m)} de ${y}</option>`;
    }
  }

  if (k != "0") {
    codigoMenu += `</optgroup>`;
  }

  if (cont_zero) {
    document.getElementById(
      "imprimir-agend"
    ).innerHTML = `<p>Não há agendamentos futuros feitos nesse escritório.</p>`;
  }

  menuConsulta.innerHTML = codigoMenu;
} // fecha a function menuConsultaAgend(local)


// Imprime agendamentos do mês selecionado na tela
function imprimirAgend(ano_mes) {

  // Seleção do escritório
  if (document.getElementById("consulta-saopaulo").checked == true) {
    var escritorio = escritorio_SaoPaulo;
    var escritorioSelect = "São Paulo";
  } else if (document.getElementById("consulta-santos").checked == true) {
    var escritorio = escritorio_Santos;
    var escritorioSelect = "Santos";
  }

  var divImprimir = document.getElementById("imprimir-agend");

  var y = ano_mes.slice(0, 4);
  var m = ano_mes.slice(5, 7);
  var texto = `<p><b>${retornaMes(m)} de ${y}</b></p>`;

  var ano_mes_num = parseInt(y + m);

  for (var i = 0; i < escritorio.length; i++) {
    var data_y = escritorio[i].data.slice(0, 4);
    var data_m = escritorio[i].data.slice(5, 7);
    var data_num = parseInt(data_y + data_m);
    //
    if (data_num == ano_mes_num) {
      var d = escritorio[i].data.slice(8, 10);
      texto += `<ul><b>${d}/${m}:</b>`;
	  

      for (var j = 0; j < escritorio[i].dados.length; j++) {
		  
		  if (escritorio[i].dados[j].Mesa < 10) {
			  var nMesa = "0" + escritorio[i].dados[j].Mesa;
		  } else {
			  var nMesa = escritorio[i].dados[j].Mesa;
		  }
		  
        texto += `<li>Nome: ${escritorio[i].dados[j].Nome} &mdash; Estação: ${nMesa}</li>`;

        if (j == escritorio[i].dados.length - 1) {
          texto += `</ul>`;
        }
      }
      
    } else if (data_num > ano_mes_num) {
      // <- array já passou do mês selecionado
      break;
    }
  }

  divImprimir.innerHTML = texto;
} // fecha a function imprimirAgend(mes)