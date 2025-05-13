// Manter uma referência global ao calendario
var calendar;

// Receber o SELETOR da janela modal cadastrar
const cadastrarModal = new bootstrap.Modal(document.getElementById("cadastrarModal"));

// Receber o SELETOR da janela modal visualizar
const visualizarModal = new bootstrap.Modal(document.getElementById("visualizarModal"));

// Receber o SELETOR "msgViewEvento"
const msgViewEvento = document.getElementById('msgViewEvento');

function carregarEventos() {

    // Receber o SELETOR calendar do atributo id
    var calendarEl = document.getElementById('calendar');

    //Receber o ID do usuário do campo Select
    var user_id = document.getElementById('user_id').value;

    //Receber o atributo do campo Select
    var inputClienteId = document.getElementById('client_id');

    const client_id = inputClienteId.getAttribute('data-target-pesq-client-id');

    //Instanciar FullCalendar.Calendar e atribuir a variável calendar
    var calendar = new FullCalendar.Calendar(calendarEl, {

        //Inclui o Bootstrap 5
        themeSystem: 'bootstrap5',

        //Criar o cabeçalho do calendário
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        locale: 'pt-br', //Define o idioma usado no calendário
        //initialDate: '2023-01-12', //Define a data inicial de sua agenda
        navLinks: true, //Permite clicar nos nomes dos dias da semana
        selectable: true, //Permite clicar e arrastar o mouse sobre um ou vários dias no calendário
        selectMirror: true, //Indicar visualmente a área que será selecionada antes que o usuário solte o botão do mouse para confirmar a seleção

        editable: true, //Permite arrastar e redimensionar os eventos diretamente no calendário.
        dayMaxEvents: true, //Número de eventos em um determinado dia, se for true, o número de eventos será limitado à altura da célula do dia.

        //Chamar o arquivo PHP para recuperar os eventos
        events: 'listar_evento.php?user_id=' + user_id + '&client_id=' + client_id,

        // Identificar o clique do usuário sobre o evento
        eventClick: function (info) {

            //Apresentar detalhes do evento
            document.getElementById("visualizarEvento").style.display = "block";
            document.getElementById("visualizarModalLabel").style.display = "block";

            //Ocultar o formulário editar da tarefa
            document.getElementById("editarEvento").style.display = "none";
            document.getElementById("editarModalLabel").style.display = "none";

            //Enviar para a janela modal os dados do evento
            document.getElementById("visualizar_id").innerText = info.event.id;
            document.getElementById("visualizar_title").innerText = info.event.title;
            document.getElementById("visualizar_start").innerText = info.event.start.toLocaleString();
            document.getElementById("visualizar_end").innerText = info.event.end !== null ? info.event.end.toLocaleString() : info.event.start.toLocaleString();
            document.getElementById("visualizar_user_id").innerText = info.event.extendedProps.user_id;
            document.getElementById("visualizar_name").innerText = info.event.extendedProps.name;
            document.getElementById("visualizar_email").innerText = info.event.extendedProps.email;
            document.getElementById("visualizar_client_id").innerText = info.event.extendedProps.client_id;
            document.getElementById("visualizar_client_name").innerText = info.event.extendedProps.client_name;
            document.getElementById("visualizar_client_email").innerText = info.event.extendedProps.client_email;
            document.getElementById("visualizar_obs").innerText = info.event.extendedProps.obs;

            //Enviar os dados do evento para o formulário Editar
            document.getElementById("edit_id").value = info.event.id;
            document.getElementById("edit_title").value = info.event.title;
            document.getElementById("edit_start").value = converterData(info.event.start);
            document.getElementById("edit_end").value = info.event.end !== null ? converterData(info.event.end) : converterData(info.event.start);
            document.getElementById("edit_color").value = info.event.backgroundColor;
            document.getElementById("edit_obs").value = info.event.extendedProps.obs;

            // Abrir a janela modal visualizar
            visualizarModal.show();
        },
        //Abrir a janela modal cadastrar quando clicar sobre o dia no calensário
        select: async function (info) {

            //Receber o SELETOR do campo usuário do formulário cadastrar
            var cadUserId = document.getElementById('cad_user_id');

            //Chamar o arquivo PHP responsável por recuperar  os Cliente do Banco de dados
            const dados = await fetch('listar_usuarios.php?profissional=S');

            //Ler os dados
            const resposta = await dados.json();
            //console.log(resposta);

            if (resposta['status']) {
                //Criar a opção selecione para o campo select Cliente
                var opcoes = '<option value="">Selecione</option>';

                //Percorrer a lista de Cliente
                for (var i = 0; i < resposta.dados.length; i++) {

                    //Criar a lista de opções para o select Cliente
                    opcoes += `<option value="${resposta.dados[i]['id']}">${resposta.dados[i]['name']}</option>`;
                }

                //Enviar as opções para o campo select no html 
                cadUserId.innerHTML = opcoes;

            } else {
                //Enviar a opção vazia para  o camo select no html
                cadUserId.innerHTML = `<option value=''>${resposta['msg']}</option>`;
            }

            //Receber o SELETOR do campo cliente do formulário cadastrar
            var cadClientId = document.getElementById('cad_client_id');

            //Chamar o arquivo PHP responsável por recuperar  os cliente do Banco de dados
            const dadosClient = await fetch('listar_usuarios.php?profissional=N');

            //Ler os dados
            const respostaClient = await dadosClient.json();
            //console.log(respostaClient);

            if (respostaClient['status']) {
                //Criar a opção selecione para o campo select cliente
                var opcoes = '<option value="">Selecione</option>';

                //Percorrer a lista de cliente
                for (var i = 0; i < respostaClient.dados.length; i++) {

                    //Criar a lista de opções para o select cliente
                    opcoes += `<option value="${respostaClient.dados[i]['id']}">${respostaClient.dados[i]['name']}</option>`;
                }

                //Enviar as opções para o campo select no html 
                cadClientId.innerHTML = opcoes;

            } else {
                //Enviar a opção vazia para  o campo select no html
                cadClientId.innerHTML = `<option value=''>${respostaClient['msg']}</option>`;
            }

            // Chamar a função para converter a data selecionada para ISO8601 e enviar para o formulário
            document.getElementById("cad_start").value = converterData(info.start);
            document.getElementById("cad_end").value = converterData(info.start);

            //Abrir a janela modal cadastrar
            cadastrarModal.show();
        }
    });

    //Retornar os dados do calendário
    return calendar;
}

//Chamar a função carregar eventos
var calendar = carregarEventos();

// Renderizar o calendário
calendar.render();

//Receber o Seletor user_id do campo select
var userId = document.getElementById('user_id');

//Aguardar o usuário selecionar valor no campo selecionar usuário
userId.addEventListener('change', function () {
    //console.log("Recuperar" + userId.value);

    //Chamar a função carregar eventos
    calendar = carregarEventos();

    // Renderizar o calendário
    calendar.render();
});