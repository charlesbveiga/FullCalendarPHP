<?php

//Incluir o arquivo com a conexão com o banco de dados
include_once './conexao.php';

//Receber os dados enviados pelo JavaScript
$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

//Recuperar dados do Profissional do banco de dados
$query_user = "SELECT id, name, email FROM users WHERE id =:id LIMIT 1";

//Prepara a query
$result_user = $conn->prepare($query_user);

//Substitui o link pelo valor
$result_user->bindParam(':id', $dados['edit_user_id']);

//Executa a query
$result_user->execute();

//Ler os dados do usuário
$row_user = $result_user->fetch(PDO::FETCH_ASSOC);

//Recuperar dados do cliente do banco de dados
$query_client = "SELECT id, name, email FROM users WHERE id =:id LIMIT 1";

//Prepara a query
$result_client = $conn->prepare($query_client);

//Substitui o link pelo valor
$result_client->bindParam(':id', $dados['edit_client_id']);

//Executa a query
$result_client->execute();

//Ler os dados do cliente
$row_client = $result_client->fetch(PDO::FETCH_ASSOC);

//Criar a Query editar evento no banco de dados
$query_edit_event = "UPDATE events SET title=:title, color=:color, start=:start, end=:end, obs=:obs,
user_id=:user_id, client_id=:client_id WHERE id=:id";

//Prepara Query
$edit_event = $conn->prepare($query_edit_event);
$edit_event->bindParam(':title', $dados['edit_title']);
$edit_event->bindParam(':color', $dados['edit_color']);
$edit_event->bindParam(':start', $dados['edit_start']);
$edit_event->bindParam(':end', $dados['edit_end']);
$edit_event->bindParam(':obs', $dados['edit_obs']);
$edit_event->bindParam(':user_id', $dados['edit_user_id']);
$edit_event->bindParam(':client_id', $dados['edit_client_id']);
$edit_event->bindParam(':id', $dados['edit_id']);

//Verifica se consegui editar corretamente
if ($edit_event->execute()) {
    $retorna = [
        'status' => true,
        'msg' => 'Tarefa editada com sucesso!',
        'id' => $dados['edit_id'],
        'title' => $dados['edit_title'],
        'color' => $dados['edit_color'],
        'start' => $dados['edit_start'],
        'end' => $dados['edit_end'],
        'obs' => $dados['edit_obs'],
        'user_id' => $row_user['id'],
        'name' => $row_user['name'],
        'email' => $row_user['email'],
        'client_id' => $row_client['id'],
        'client_name' => $row_client['name'],
        'client_email' => $row_client['email']
    ];
} else {
    $retorna = ['status' => false, 'msg' => 'Erro! Tarefa não Editada!'];
}
echo json_encode($retorna);
