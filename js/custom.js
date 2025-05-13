//Executar quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    //Chamar a função carregar eventos
    var calendar = carregarEventos();

    //Renderizar o calendário
    calendar.render();
});

//Função para remover a mensagem após 3 segundos
function removerMsg() {
    setTimeout(() => {
        document.getElementById('msg').innerHTML = "";
    }, 3000)
}