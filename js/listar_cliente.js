//Receber o seletor do campo listar Cliente
const client = document.getElementById("client_id");

//Verificar se existe o seletor client_id no html
if (client) {
    //Chamar a função
    listarClientes();
}
async function listarClientes() {
    const dados = await fetch('listar_usuarios.php');

    const resposta = await dados.json();
    //console.log(resposta);

    if (resposta['status']) {
        var opcoes = `<option value="">Selecionar ou Limpar</option>`;

        for (var i = 0; i < resposta.dados.length; i++) {
            opcoes += `<option value="${resposta.dados[i]['id']}">${resposta.dados[i]['name']}</option>`;
        }
        client.innerHTML = opcoes;
    } else {
        client.innerHTML = `<option value="">${resposta['msg']}</option>`;
    }
}