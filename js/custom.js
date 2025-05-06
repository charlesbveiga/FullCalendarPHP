// Executar quando o documento html for completamente carregado
document.addEventListener('DOMContentLoaded', function () {



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
            events: 'listar_evento.php?user_id=' + user_id,
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

                //Chamar o arquivo PHP responsável por recuperar  os usuários do Banco de dados
                const dados = await fetch('listar_usuarios.php?profissional=S');

                //Ler os dados
                const resposta = await dados.json();
                //console.log(resposta);

                if (resposta['status']) {
                    //Criar a opção selecione para o campo select usuários
                    var opcoes = '<option value="">Selecione</option>';

                    //Percorrer a lista de usuários
                    for (var i = 0; i < resposta.dados.length; i++) {

                        //Criar a lista de opções para o select usuários
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

    //Converter data
    function converterData(data) {

        //Converter a string em um objeto date
        const dataObj = new Date(data);

        //Extrair o ano da data
        const ano = dataObj.getFullYear();

        //Obter o mês, Mês começa de 0, padStart adiciona zeros a esquerda para garantir que o mês tenha digitos
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');

        // Obter dia do mês, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
        const dia = String(dataObj.getDate()).padStart(2, '0');

        // Obter a hora, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
        const hora = String(dataObj.getHours()).padStart(2, '0');

        // Obter minuto, padStart adiciona zeros a esquerda para garantir que o dia tenha dois digitos
        const minuto = String(dataObj.getMinutes()).padStart(2, '0');

        // Retornar a data
        return `${ano}-${mes}-${dia} ${hora}:${minuto}`;
    }
    //Receber o SELETOR do formulário cadastrar evento
    const formCadEvento = document.getElementById("formCadEvento");

    //Receber SELETOR da mensagem genérica
    const msg = document.getElementById("msg");

    //Receber SELETOR da mensagem Cadastrar Evento
    const msgCadEvento = document.getElementById("msgCadEvento");

    //Receber SELETOR do botão da janela modal cadsatrar evento 
    const btnCadEvento = document.getElementById("btnCadEvento");

    //Somente acessa o IF quando existir o SELETOR "formCadEvento"
    if (formCadEvento) {
        //Aguardar o usuário clicar no botão cadastrar
        formCadEvento.addEventListener("submit", async (e) => {

            //Não permitir a atualização da página
            e.preventDefault();

            //Apresentar no botão o texto salvando
            btnCadEvento.value = "Salvando...";

            //Receber os dados do formulário
            const dadosForm = new FormData(formCadEvento);

            //Chamar o arquivo PHP responsável em salvar a marca
            const dados = await fetch("cadastrar_evento.php", {
                method: "POST",
                body: dadosForm
            });

            // Realizar a leitura dos dados retornados pelo PHP
            const resposta = await dados.json();

            //Acessa IF quando não cadastrar com sucesso
            if (!resposta['status']) {
                // Enviar mensagem para o HTML
                msgCadEvento.innerHTML =
                    `<div class="alert alert-danger" role="alert"> ${resposta['msg']}</div>`;
            } else {
                // Enviar mensagem para o HTML
                msg.innerHTML =
                    `<div class="alert alert-success" role="alert"> ${resposta['msg']}</div>`;

                msgCadEvento.innerHTML = "";

                // Limpar o formulário
                formCadEvento.reset();

                //Receber o Id do Usuário do campo Select
                var user_id = document.getElementById('user_id').value;

                //Verificar se existe a pesquisa pelo usuário, se o cadastro for para o mesmo usuário pesquisado, acrescente ao Fullcalendar
                if (user_id == "" || resposta['user_id'] == user_id) {

                    //Criar um objeto com os dados do evento
                    const novoEvento = {
                        id: resposta['id'],
                        title: resposta['title'],
                        color: resposta['color'],
                        start: resposta['start'],
                        end: resposta['end'],
                        obs: resposta['obs'],
                        user_id: resposta['user_id'],
                        name: resposta['name'],
                        email: resposta['email'],
                        client_id: resposta['client_id'],
                        client_name: resposta['client_name'],
                        client_email: resposta['client_email'],
                    }

                    //Adicionar o evento ao calendário
                    calendar.addEvent(novoEvento);

                }

                //Chamar a função para remover a mensagem após 3 segundos
                removerMsg();

                //Fechar a janela Modal
                cadastrarModal.hide();
            }

            //Apresentar no botão o texto cadastrar
            btnCadEvento.value = "Cadastrar";
        });
    }
    //Função para remover a mensagem após 3 segundos
    function removerMsg() {
        setTimeout(() => {
            document.getElementById('msg').innerHTML = "";
        }, 3000)
    }

    //Receber o SELETOR ocultar formulário editar evento e apresentar o detalhes da tarefa
    const btnViewEditEvento = document.getElementById("btnViewEditEvento");

    // Somente acessa o IF quando existir o SELETOR "btnViewEditEvento"
    if (btnViewEditEvento) {

        //Aguardar o usuário clicar no botão editar
        btnViewEditEvento.addEventListener("click", async () => {
            //Ocultar detalhes do evento
            document.getElementById("visualizarEvento").style.display = "none";
            document.getElementById("visualizarModalLabel").style.display = "none";
            //Apresentar o formulário editar da tarefa
            document.getElementById("editarEvento").style.display = "block";
            document.getElementById("editarModalLabel").style.display = "block";

            //Receber o id do usuário responsável pelo evento
            var userId = document.getElementById('visualizar_user_id').innerText;

            //Receber o SELETOR do campo usuário do formulário editar
            var editUserId = document.getElementById('edit_user_id');

            //Chamar o arquivo PHP responsável por recuperar  os usuários do Banco de dados
            const dados = await fetch('listar_usuarios.php?profissional=S');

            //Ler os dados
            const resposta = await dados.json();
            //console.log(resposta);

            if (resposta['status']) {
                //Criar a opção selecione para o campo select usuários
                var opcoes = '<option value="">Selecione</option>';

                //Percorrer a lista de usuários
                for (var i = 0; i < resposta.dados.length; i++) {

                    //Criar a lista de opções para o select usuários
                    opcoes += `<option value="${resposta.dados[i]['id']}" 
                                              ${userId == resposta.dados[i]['id'] ? 'selected' : ""}>
                                              ${resposta.dados[i]['name']}</option>`;
                }

                //Enviar as opções para o campo select no html 
                editUserId.innerHTML = opcoes;

            } else {
                //Enviar a opção vazia para  o camo select no html
                editUserId.innerHTML = `<option value=''>${resposta['msg']}</option>`;
            }

            //Receber o id do cliente responsável pelo evento
            var clientId = document.getElementById('visualizar_client_id').innerText;

            //Receber o SELETOR do campo cliente do formulário editar
            var editClientId = document.getElementById('edit_client_id');

            //Chamar o arquivo PHP responsável por recuperar  os clientes do Banco de dados
            const dadosClient = await fetch('listar_usuarios.php?profissional=N');

            //Ler os dados
            const respostaClient = await dadosClient.json();
            //console.log(respostaClient);

            if (respostaClient['status']) {
                //Criar a opção selecione para o campo select clientes
                var opcoes = '<option value="">Selecione</option>';

                //Percorrer a lista de clientes
                for (var i = 0; i < respostaClient.dados.length; i++) {

                    //Criar a lista de opções para o select clientes
                    opcoes += `<option value="${respostaClient.dados[i]['id']}" 
                                              ${clientId == respostaClient.dados[i]['id'] ? 'selected' : ""}>
                                              ${respostaClient.dados[i]['name']}</option>`;
                }

                //Enviar as opções para o campo select no html 
                editClientId.innerHTML = opcoes;

            } else {
                //Enviar a opção vazia para  o camo select no html
                editClientId.innerHTML = `<option value=''>${respostaClient['msg']}</option>`;
            }
        });
    }

    //Receber o SELETOR ocultar formulário editar evento e apresentar o detalhes da tarefa
    const btnViewEvento = document.getElementById("btnViewEvento");

    // Somente acessa o IF quando existir o SELETOR "btnViewEvento"
    if (btnViewEvento) {

        //Agaurdar o usuário clicar no botão editar
        btnViewEvento.addEventListener("click", () => {

            //Apresentar detalhes do evento
            document.getElementById("visualizarEvento").style.display = "block";
            document.getElementById("visualizarModalLabel").style.display = "block";

            //Ocultar o formulário editar da tarefa
            document.getElementById("editarEvento").style.display = "none";
            document.getElementById("editarModalLabel").style.display = "none";
        });
    }

    // Recebe o SELETOR  do formlário editar evento
    const formEditEvento = document.getElementById('formEditEvento');

    //Receber o SELETOR da mensaghem editar evento msgEditEvento
    const msgEditEvento = document.getElementById('msgEditEvento');

    //Receber o SELETOR do botão editar evento btnEditEvento
    const btnEditEvento = document.getElementById('btnEditEvento');

    // Somente acessa o IF quando existir o SELETOR "formEditEvento"
    if (formEditEvento) {
        // Aguardar o usuário clicar no botão editar
        formEditEvento.addEventListener("submit", async (e) => {
            //Não permitir a atulização da pagina
            e.preventDefault();
            //Apresentar no botão o texto salvando
            btnEditEvento.value = "Salvando...";
            //Receber os dados do formulário
            const dadosForm = new FormData(formEditEvento);
            //Chamar o arquivo php responsável em editar o evento
            const dados = await fetch("editar_evento.php", {
                method: "POST",
                body: dadosForm
            });

            //Realiza a leitura dos dados retornados pelo PHP
            const resposta = await dados.json();

            //Acessa o IF quando não editar com sucesso
            if (!resposta['status']) {
                //Enviar mensagem para o HTML
                msgEditEvento.innerHTML = `<div class="alert alert-danger" role="alert"> ${resposta['msg']}</div>`;
            } else {
                //Enviar mensagem para o HTML
                msg.innerHTML = `<div class="alert alert-success" role="alert"> ${resposta['msg']}</div>`;

                //Enviar mensagem para o HTML
                msgEditEvento.innerHTML = "";

                //Limpar o formulário
                formEditEvento.reset();

                //Recuperar o evendo no fullCalendar pelo id
                const eventoExiste = calendar.getEventById(resposta['id']);

                //Receber o id do usuário do campo select
                var user_id = document.getElementById('user_id').value;

                //Verificar se existe a pesquisa  pelo usuário, se o editar for para o mesmo usuário pesquisando, mantém no fullcalendar
                if (user_id == "" || resposta['user_id'] == user_id) {

                    //Verificar se encontrou o evento no Fullcalendar pelo id
                    if (eventoExiste) {

                        //Atualiza os atributos do evento com os novos valores do banco de dados
                        eventoExiste.setProp('title', resposta['title']);
                        eventoExiste.setProp('color', resposta['color']);
                        eventoExiste.setStart(resposta['start']);
                        eventoExiste.setEnd(resposta['end']);
                        eventoExiste.setExtendedProp('obs', resposta['obs']);
                        eventoExiste.setExtendedProp('user_id', resposta['user_id']);
                        eventoExiste.setExtendedProp('name', resposta['name']);
                        eventoExiste.setExtendedProp('email', resposta['email']);
                        eventoExiste.setExtendedProp('client_id', resposta['client_id']);
                        eventoExiste.setExtendedProp('client_name', resposta['client_name']);
                        eventoExiste.setExtendedProp('client_email', resposta['client_email']);
                    }
                } else {
                    //Verificar se encontrou o evento no Fullcalendar pelo id
                    if (eventoExiste) {
                        //Remover o evento do calendario 
                        eventoExiste.remove();
                    }
                }

                //Chamar função para remover a mensagem após 3 segundos
                removerMsg();

                //Fechar a janela modal
                visualizarModal.hide();
            }

            //Apresentar no botão o texto salvar
            btnEditEvento.value = "Salvar";
        });
    }

    //Receber o SELETOR apagar evento
    const btnApagarEvento = document.getElementById("btnApagarEvento");

    //Somente acessa IF quando existir o SELETOR "formEditEvento"
    if (btnApagarEvento) {
        //Aguardar o usuário clicar no botão apagar
        btnApagarEvento.addEventListener("click", async () => {
            // Exibir uma caixa de diálogo de confirmação
            const confirmacao = window.confirm("Tem certeza que deseja Excluir o evento?");

            if (confirmacao) {
                // Receber id do evento
                var idEvento = document.getElementById("visualizar_id").textContent;

                //Chamar o arquivo PHP responsável por apagar o evento
                const dados = await fetch("apagar_evento.php?id=" + idEvento);

                //Realizar a leitura dos dados
                const resposta = await dados.json();

                if (!resposta['status']) {
                    //Enviar a mensagem para o HTML
                    msgViewEvento.innerHTML = `<div class="alert alert-danger" role="alert"> ${resposta['msg']}</div>`;
                } else {

                    //Enviar a mensagem para o HTML
                    msg.innerHTML = `<div class="alert alert-success" role="alert"> ${resposta['msg']}</div>`;

                    //Enviar a mensagem para o HTML
                    msgViewEvento.innerHTML = "";

                    //Recuperar envento do FullCalendar
                    const eventoExisteRemover = calendar.getEventById(idEvento);

                    //Verificar se encontrou o evento no FullCalendar
                    if (eventoExisteRemover) {
                        //Remover o evento do calendário
                        eventoExisteRemover.remove();
                    }
                    //Chamar a função para remover a mensagem após 3 segundos
                    removerMsg();
                    //Fechar a janela modal
                    visualizarModal.hide();
                }
            }
        });
    }
});
//Receber o seletor do campo listar usuários
const user = document.getElementById("user_id");

//Verificar se existe o seletor user_id no html
if (user) {
    //Chamar a função
    listarUsuarios();
}
async function listarUsuarios() {
    const dados = await fetch('listar_usuarios.php?profissional=S');

    const resposta = await dados.json();
    //console.log(resposta);

    if (resposta['status']) {
        var opcoes = `<option value="">Selecionar ou Limpar</option>`;

        for (var i = 0; i < resposta.dados.length; i++) {
            opcoes += `<option value="${resposta.dados[i]['id']}">${resposta.dados[i]['name']}</option>`;
        }
        user.innerHTML = opcoes;
    } else {
        user.innerHTML = `<option value="">${resposta['msg']}</option>`;
    }

}