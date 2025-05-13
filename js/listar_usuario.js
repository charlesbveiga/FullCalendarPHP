//Receber o seletor do campo listar Usuário
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