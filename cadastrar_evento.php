<?php

//Incluir o arquivo com a conexão com o banco de dados
include_once './conexao.php';

//Receber os dados enviados pelo JavaScript
$dados = filter_input_array(INPUT_POST, FILTER_DEFAULT);

//Recuperar dados do usuário do banco de dados
$query_user = "SELECT id, name, email FROM users WHERE id =:id LIMIT 1";

//Prepara a query
$result_user = $conn->prepare($query_user);

//Substitui o link pelo valor
$result_user->bindParam(':id', $dados['cad_user_id']);

//Executa a query
$result_user->execute();


//Recuperar dados do cliente do banco de dados
$query_client = "SELECT id, name, email FROM users WHERE id =:id LIMIT 1";

//Prepara a query
$result_client = $conn->prepare($query_client);

//Substitui o link pelo valor
$result_client->bindParam(':id', $dados['cad_client_id']);

//Executa a query
$result_client->execute();

//Ler os dados do cliente
$row_client = $result_client->fetch(PDO::FETCH_ASSOC);

//Criar a query cadastrar evento no banco de dados
$query_cad_event = "INSERT INTO events (title, color, start, end, obs, user_id, client_id) 
VALUES (:title, :color, :start, :end, :obs, :user_id, :client_id)";

//Prepara a query
$cad_event = $conn->prepare($query_cad_event);

$cad_event->bindParam(':title', $dados['cad_title']);
$cad_event->bindParam(':color', $dados['cad_color']);
$cad_event->bindParam(':start', $dados['cad_start']);
$cad_event->bindParam(':end', $dados['cad_end']);
$cad_event->bindParam(':obs', $dados['cad_obs']);
$cad_event->bindParam(':user_id', $dados['cad_user_id']);
$cad_event->bindParam(':client_id', $dados['cad_client_id']);

if ($cad_event->execute()) {
    $retorna = [
        'status' => true,
        'msg' => 'Tarefa cadastrada com sucesso!',
        'id' => $conn->lastInsertId(),
        'title' => $dados['cad_title'],
        'color' => $dados['cad_color'],
        'start' => $dados['cad_start'],
        'end' => $dados['cad_end'],
        'obs' => $dados['cad_obs'],
        'user_id' => $row_user['id'],
        'name' => $row_user['name'],
        'email' => $row_user['email'],
        'client_id' => $row_client['id'],
        'client_name' => $row_client['name'],
        'client_email' => $row_client['email']
    ];
} else {
    $retorna = ['status' => false, 'msg' => 'Erro! Tarefa não cadastrada!'];
}
echo json_encode($retorna);
