<?php

//Incluir o arquivo com a conexão com o banco de dados
include_once './conexao.php';

//Recebe o valor enviado pela URL
$name = filter_input(INPUT_GET, 'name', FILTER_DEFAULT);

//Verificar se o parâmetro name foi enviado
if (!empty($name)) {

    //Criar a variável para usar no LIKE
    $name = "%$name%";

    //Query para recuperar os usuários
    $query_users = "SELECT id, name 
                FROM users 
                WHERE name LIKE :name
                ORDER BY name ASC
                LIMIT 20";
    //$query_users = "SELECT id, name FROM users WHERE id = 100 ORDER BY name ASC";

    //Prepara a Query
    $result_users = $conn->prepare($query_users);

    // Atribuir o valor do parâmetro
    $result_users->bindParam(':name', $name);
} else {
    //Query para recuperar os usuários
    $query_users = "SELECT id, name FROM users ORDER BY name ASC LIMIT 10";
    //$query_users = "SELECT id, name FROM users WHERE id = 100 ORDER BY name ASC";

    //Prepara a Query
    $result_users = $conn->prepare($query_users);
}

//Executa a Query
$result_users->execute();

//Acessar o IF quando encontra os usuário no banco de dados
if (($result_users) and ($result_users->rowCount() != 0)) {
    //Ler os registros recuperados do banco de dados
    $dados = $result_users->fetchAll((PDO::FETCH_ASSOC));

    //Criar o array com o status e os dados
    $retorna = ['status' => true, 'dados' => $dados];
} else {
    //Criar o array com o status e os dados
    $retorna = ['status' => false, 'msg' => "Nenhum usuário encontrado!"];
}


header('Content-Type: application/json');

//Converter o array em objeto e retornar para o JavaScript
echo json_encode($retorna);
