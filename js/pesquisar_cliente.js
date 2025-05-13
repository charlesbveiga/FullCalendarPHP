//Executar somente quando o documento HTML for completamente carregado
document.addEventListener('DOMContentLoaded', function () {

    //Receber o Seletor do HTML 
    const inputNomeCliente = document.getElementById('client_id');
    const resultadoPesquisa = document.getElementById('resultado_pesquisa');

    //Somente acessa o IF quando existir o Seletor "inputNomeCliente"
    if (inputNomeCliente) {

        //Aguardar o usuário clicar no botão campo Pesquisar
        inputNomeCliente.addEventListener("input", async () => {

            //Acessa o IF quando o usuário digitar mais de 3 caracteres
            if (inputNomeCliente.value.length >= 3) {

                //Chama o arquivo PHP para recuperar clientes
                const dados = await fetch('pesquisar_clientes.php?name=' + inputNomeCliente.value);

                //ler os dados retornados do PHP
                const resposta = await dados.json();

                //Criar a variável com a lista
                var opcoes = "<ul class='list-group position-fixed'>";

                //Verificar se o status é TRUE e acessa o IF, se não, acessa o ELSE e retorna a mensagem de erro
                if (resposta['status']) {
                    for (var i = 0; i < resposta.dados.length; i++) {
                        opcoes += `<li class='list-group-item list-group-item-action' data-target-client-id='${resposta.dados[i]['id']}' style='cursor: pointer;'>${resposta.dados[i]['name']}</li>`;
                    }
                } else {
                    opcoes += `<li class='list-group-item disable'>${resposta['msg']}</li>`;
                }

                //Finalizar a lista
                opcoes += "</ul>";

                //Enviar para o HTML as opções para o campo SELECT
                resultadoPesquisa.innerHTML = opcoes;
            }

            // Carregar o JS responsável em receber o id do cliente
            receberClienteParaPesquisar();
        });
    }

    //Aguardar o click do usuário fora do dropdown para fechar o dropdown
    document.addEventListener('click', function (event) {
        const validar_clique = inputNomeCliente.contains(event.target);
        if (!validar_clique) {
            document.getElementById('resultado_pesquisa').innerHTML = '';
        }
    });

    //Limpar o formulário pesquisar Cliente
    //Receber o SELETOR do botão limpar o formulário Pesquisar cliente
    const limparPesquisaUsuarioCliente = document.getElementById("limparPesquisaUsuarioCliente");

    //Somente acessa o IF  quando existir o SELETOR "limparPesquisaUsuarioCliente"
    if (limparPesquisaUsuarioCliente) {
        //Aguardar o usuário clicar no botão limpar o formulário pesquisar cliente
        limparPesquisaUsuarioCliente.addEventListener("click", async (e) => {
            //Enviar o nome do cliente para o campo pesquisar cliente
            document.getElementById('client_id').value = "";
            //Enviar o valor para o atributo 'data-target-pesq-client-id' do campo pesquisar cliente
            document.getElementById('client_id').setAttribute
                ('data-target-pesq-client-id', "");

            //Chamar a função carregar eventos
            calendar = carregarEventos();

            //Renderizar o calendário 
            calendar.render();
        });
    }
});