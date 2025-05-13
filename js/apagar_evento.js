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