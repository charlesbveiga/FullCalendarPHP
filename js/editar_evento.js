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

            //Receber o id do cliente do campo pesquisar cliente
            const inputClienteId = document.getElementById('client_id');

            //Recupere o valor do atributo data-target-pesq-client-id
            const client_id = inputClienteId.getAttribute
                ('data-target-pesq-client-id');

            //Verificar se existe a pesquisa pelo usuário, se o cadastro for para o mesmo usuário pesquisado, acrescente ao Fullcalendar
            if ((user_id == "" || resposta['user_id'] == user_id) &&
                (client_id == "" || resposta['client_id'] == client_id)) {

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