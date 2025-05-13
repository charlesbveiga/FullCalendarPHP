//Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    //Receber o Seletor client_id do campo select
    var clientId = document.getElementById('client_id');

    //Aguardar o usuário selecionar valor no campo selecionar cliente
    clientId.addEventListener('change', function () {
        //console.log("Recuperar" + clientId.value);

        //Chamar a função carregar eventos do cliente
        calendar = carregarEventos();

        // Renderizar o calendário
        calendar.render();
    });
});