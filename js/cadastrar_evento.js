//Receber o SELETOR do formulário cadastrar evento
const formCadEvento = document.getElementById("formCadEvento");

//Receber SELETOR da mensagem genérica
const msg = document.getElementById("msg");

//Receber SELETOR da mensagem Cadastrar Evento
const msgCadEvento = document.getElementById("msgCadEvento");

//Receber SELETOR do botão da janela modal cadastrar evento 
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

            //Receber o ID do cliente do campo pesquisar cliente
            const inputClienteId = document.getElementById('client_id');

            //Recupere o valor do atributo data-target-pesq-client-id
            const client_id = inputClienteId.getAttribute
                ('data-target-pesq-client-id');

            //Verificar se existe a pesquisa pelo usuário, se o cadastro for para o mesmo usuário pesquisado, acrescente ao Fullcalendar
            if ((user_id == "" || resposta['user_id'] == user_id) &&
                (client_id == "" || resposta['client_id'] == client_id)) {

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