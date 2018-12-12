<?php

    require 'vendor/autoload.php';
    require 'vendor\app\Dao\Controllers/HomeController.php';
    

    $app = new \Slim\App([
        'settings' =>[
            'displayErrorDetails' => true
        ]
    ]);


    $container = $app->getContainer();

    $container['db'] = function($container){
        return $conexao;
    };
   
    $container['HomeController'] = function($container) use ($app){
        return new Dao\Controllers\HomeController($container);
    };



    $app->post('/login', 'HomeController:retornaUnicoUsuario');
    $app->get('/buscar-todos-usuarios', 'HomeController:buscarTodosUsuarios');

 




    $app->run();