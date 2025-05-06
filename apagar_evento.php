<?php

//Incluir o arquivo com a conexão com o banco de dados
include_once './conexao.php';

//Receber o id enviado pelo JavaScript
$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);

//Acessa o IF  quando existe o id do evento
if (!empty($id)) {

    $query_apagar_event = "DELETE FROM events WHERE id=:id";

    $apagar_event = $conn->prepare($query_apagar_event);

    $apagar_event->bindParam(':id', $id);

    if ($apagar_event->execute()) {
        $retorna = ['status' => true, 'msg' => 'Tarefa apagada com sucesso!'];
    } else {
        $retorna = ['status' => false, 'msg' => 'Erro: Tarefa Não apagada!'];
    }
} else { //Somente acessa o ELSE quando o id estiver vazio
    $retorna = ['status' => false, 'msg' => 'Erro: Necessário enviar o id do evento!'];
}

//Converte o Array em um objeto e retorna para o JavaScript
echo json_encode($retorna);
