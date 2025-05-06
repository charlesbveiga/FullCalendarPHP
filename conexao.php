<?php

$host = "127.0.0.1";
$user = "root";
$pass = "cbv123";
$dbname = "agenda";
$port = 3306;

try {
    $conn = new PDO("mysql:host=$host;dbname=" . $dbname, $user, $pass);
    //echo "Conexão com o banco de dados realizado com sucesso!";
} catch (PDOException $err) {
    die("Erro: Conexão com o banco de dados não realizada com sucesso. Erro gerado
    " . $err->getMessage());
}
