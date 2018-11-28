<?php

$conexaoBaseTeste = mysqli_connect("localhost", "root", "", "sistemapendencias");
//$conexao = mysqli_connect("107.180.46.155", "guuhalk", "gu@20101998", "sistemapendencias");
 
//if (!$conexao) {
   // echo "Error: Falha ao conectar-se com o banco de dados MySQL." . PHP_EOL;
   // echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
   // echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
   // exit;
//}
 
//echo "Sucesso: Sucesso ao conectar-se com a base de dados MySQL." . PHP_EOL;
 
mysqli_close($conexao);


?>