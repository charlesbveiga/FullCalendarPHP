<?php

//Incluir o arquivo com a conexão com o banco de dados
include_once './conexao.php';

//Recebe ID do usuário
$user_id = filter_input(INPUT_GET, 'user_id', FILTER_SANITIZE_NUMBER_INT);

//Recebe ID do cliente
$client_id = filter_input(INPUT_GET, 'client_id', FILTER_SANITIZE_NUMBER_INT);

//Verifica se o parametro user_id tem valor e se client_id está vazio
if (!empty($user_id) and empty($client_id)) {
    //Query para recuperar os eventos
    $query_events = "SELECT evt.id, evt.title, evt.color, evt.start, evt.end, evt.obs, evt.user_id, 
    evt.client_id, 
        usr.name, usr.email,
        cli.name AS name_cli, cli.email AS email_cli
        FROM events AS evt
        INNER JOIN users as usr ON usr.id = evt.user_id
        INNER JOIN users as cli ON cli.id = evt.client_id
        WHERE evt.user_id = :user_id";

    //Prepara a query
    $result_events = $conn->prepare($query_events);

    //Atribuir o valor do parâmetro ao link
    $result_events->bindParam(':user_id', $user_id, PDO::PARAM_INT);

    //Verifica se o parametro user_id está vazio e se client_id tem valor
} elseif (empty($user_id) and !empty($client_id)) {
    //Query para recuperar os eventos
    $query_events = "SELECT evt.id, evt.title, evt.color, evt.start, evt.end, evt.obs, evt.user_id, 
    evt.client_id, 
        usr.name, usr.email,
        cli.name AS name_cli, cli.email AS email_cli
        FROM events AS evt
        INNER JOIN users as usr ON usr.id = evt.user_id
        INNER JOIN users as cli ON cli.id = evt.client_id
        WHERE evt.client_id = :client_id";

    //Prepara a query
    $result_events = $conn->prepare($query_events);

    //Atribuir o valor do parâmetro ao link
    $result_events->bindParam(':client_id', $client_id, PDO::PARAM_INT);

    //Verifica se o parametro user_id tem valor e se client_id tem valor
} elseif (!empty($user_id) and !empty($client_id)) {
    //Query para recuperar os eventos
    $query_events = "SELECT evt.id, evt.title, evt.color, evt.start, evt.end, evt.obs, evt.user_id, 
    evt.client_id, 
        usr.name, usr.email,
        cli.name AS name_cli, cli.email AS email_cli
        FROM events AS evt
        INNER JOIN users as usr ON usr.id = evt.user_id
        INNER JOIN users as cli ON cli.id = evt.client_id
        WHERE evt.user_id = :user_id
        AND evt.client_id = :client_id";

    //Prepara a query
    $result_events = $conn->prepare($query_events);

    //Atribuir o valor do parâmetro ao link
    $result_events->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $result_events->bindParam(':client_id', $client_id, PDO::PARAM_INT);
} else {
    //Query para recuperar os eventos
    $query_events = "SELECT evt.id, evt.title, evt.color, evt.start, evt.end, evt.obs, evt.user_id, 
    evt.client_id, 
        usr.name, usr.email,
        cli.name AS name_cli, cli.email AS email_cli
        FROM events AS evt
        INNER JOIN users as usr ON usr.id = evt.user_id
        INNER JOIN users as cli ON cli.id = evt.client_id";
    //Prepara a query
    $result_events = $conn->prepare($query_events);
}
//Executa a query
$result_events->execute();

//Cria o array que recebe os eventos
$eventos = [];

//Percorrer a lista de registros retornando do banco de dados
while ($row_events = $result_events->fetch(PDO::FETCH_ASSOC)) {
    //Extrair o array
    extract($row_events);

    $eventos[] = [
        'id' => $id,
        'title' => $title,
        'start' => $start,
        'end' => $end,
        'backgroundColor' => $color,
        'textColor' => '#F2F2F2',
        'obs' => $obs,
        'user_id' => $user_id,
        'name' => $name,
        'email' => $email,
        'client_id' => $client_id,
        'client_name' => $name_cli,
        'client_email' => $email_cli,

    ];
}

echo json_encode($eventos);
