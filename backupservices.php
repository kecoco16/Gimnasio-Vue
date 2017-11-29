<?php 
  use \Psr\Http\Message\ServerRequestInterface as Request;
  use \Psr\Http\Message\ResponseInterface as Response;

  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
  header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
  header('Content-Type: text/html; charset=utf-8');
  header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

  require 'vendor/autoload.php';
  require 'Medoo/medoo.php';

  $app = new \Slim\App;

  $app->get('/', function (Request $request, Response $response) {
    include("view.html");
  });


  $app->get('/all', function (Request $request, Response $response) {

    require_once "general.php";

    $data = $database->select(
      "tb_clientes",[
      "[><]tb_mensualidades" => ["id_mensualidad" => "id_mensualidad"],
      ],
      [   
      "tb_clientes.id_clientes",
      "tb_clientes.cedula",
      "tb_clientes.ruta_imagen",
      "tb_clientes.nombre",
      "tb_clientes.id_mensualidad",
      "tb_clientes.sexo",
      "tb_clientes.telefono",
      "tb_clientes.fecha_inicio",
      "tb_clientes.fecha_pago",
      "tb_clientes.correo",
      "tb_mensualidades.mensualidad",
      "tb_mensualidades.tipo"
      ],[
      "ORDER" => "nombre"
      ]);

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
     $item = new stdClass;
     $item->id_clientes = $data[$key]["id_clientes"];
     $item->cedula = $data[$key]["cedula"];
     $item->ruta_imagen = $data[$key]["ruta_imagen"];
     $item->nombre = $data[$key]["nombre"];
     $item->id_mensualidad = $data[$key]["id_mensualidad"];
     $item->sexo = $data[$key]["sexo"];
     $item->telefono = $data[$key]["telefono"];
     $item->fecha_inicio = $data[$key]["fecha_inicio"];
     $item->fecha_pago = $data[$key]["fecha_pago"];
     $item->correo = $data[$key]["correo"];
     $item->mensualidad = $data[$key]["mensualidad"];
     $item->tipo = $data[$key]["tipo"];
     $items[] = $item;      
   }
   return $response->withJSON($items);
  });

  $app->get('/late', function (Request $request, Response $response) {

    require_once "general.php";
    $data = $database->select(
      "tb_clientes",[
      "[><]tb_mensualidades" => ["id_mensualidad" => "id_mensualidad"],
      ],
      [   
      "tb_clientes.id_clientes",
      "tb_clientes.cedula",
      "tb_clientes.ruta_imagen",
      "tb_clientes.nombre",
      "tb_clientes.id_mensualidad",
      "tb_clientes.sexo",
      "tb_clientes.telefono",
      "tb_clientes.fecha_inicio",
      "tb_clientes.fecha_pago",
      "tb_clientes.correo",
      "tb_mensualidades.mensualidad",
      "tb_mensualidades.tipo"
      ],[
      "fecha_pago[<]" => $fechaactual,
      "ORDER" => "nombre"
      ]);

    $items = array();
    $response->getBody()->rewind();

    foreach ($data as $key => $val) {
      $item = new stdClass;
      $item->id_clientes = $data[$key]["id_clientes"];
      $item->cedula = $data[$key]["cedula"];
      $item->ruta_imagen = $data[$key]["ruta_imagen"];
      $item->nombre = $data[$key]["nombre"];
      $item->id_mensualidad = $data[$key]["id_mensualidad"];
      $item->sexo = $data[$key]["sexo"];
      $item->telefono = $data[$key]["telefono"];
      $item->fecha_inicio = $data[$key]["fecha_inicio"];
      $item->fecha_pago = $data[$key]["fecha_pago"];
      $item->correo = $data[$key]["correo"];
      $item->mensualidad = $data[$key]["mensualidad"];
      $item->tipo = $data[$key]["tipo"];
      $items[] = $item;      
    }
    return $response->withJSON($items);
  });

  $app->get('/today', function (Request $request, Response $response) {

    require_once "general.php";
    $data = $database->select(
      "tb_clientes",[
      "[><]tb_mensualidades" => ["id_mensualidad" => "id_mensualidad"],
      ],
      [   
      "tb_clientes.id_clientes",
      "tb_clientes.cedula",
      "tb_clientes.ruta_imagen",
      "tb_clientes.nombre",
      "tb_clientes.id_mensualidad",
      "tb_clientes.sexo",
      "tb_clientes.telefono",
      "tb_clientes.fecha_inicio",
      "tb_clientes.fecha_pago",
      "tb_clientes.correo",
      "tb_mensualidades.mensualidad",
      "tb_mensualidades.tipo"
      ],[
      "fecha_pago" => $fechaactual,
      "ORDER" => "nombre"
      ]);

    $items = array();
    $response->getBody()->rewind();

    foreach ($data as $key => $val) {
      $item = new stdClass;
      $item->id_clientes = $data[$key]["id_clientes"];
      $item->cedula = $data[$key]["cedula"];
      $item->ruta_imagen = $data[$key]["ruta_imagen"];
      $item->nombre = $data[$key]["nombre"];
      $item->id_mensualidad = $data[$key]["id_mensualidad"];
      $item->sexo = $data[$key]["sexo"];
      $item->telefono = $data[$key]["telefono"];
      $item->fecha_inicio = $data[$key]["fecha_inicio"];
      $item->fecha_pago = $data[$key]["fecha_pago"];
      $item->correo = $data[$key]["correo"];
      $item->mensualidad = $data[$key]["mensualidad"];
      $item->tipo = $data[$key]["tipo"];
      $items[] = $item;      
    }
    return $response->withJSON($items);
  });

  $app->get('/clients/{name}', function (Request $request, Response $response) {

    $name = $request->getAttribute('name');

    require_once "general.php";

    $data = $database->select(
      "tb_clientes",[
      "[><]tb_mensualidades" => ["id_mensualidad" => "id_mensualidad"],
      ],
      [   
      "tb_clientes.id_clientes",
      "tb_clientes.cedula",
      "tb_clientes.ruta_imagen",
      "tb_clientes.nombre",
      "tb_clientes.id_mensualidad",
      "tb_clientes.sexo",
      "tb_clientes.telefono",
      "tb_clientes.fecha_inicio",
      "tb_clientes.fecha_pago",
      "tb_clientes.correo",
      "tb_mensualidades.mensualidad",
      "tb_mensualidades.tipo"
      ],[
      "nombre[~]" => $name,
      "ORDER" => "nombre"
      ]);
    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
      $item = new stdClass;
      $item->id_clientes = $data[$key]["id_clientes"];
      $item->cedula = $data[$key]["cedula"];
      $item->ruta_imagen = $data[$key]["ruta_imagen"];
      $item->nombre = $data[$key]["nombre"];
      $item->id_mensualidad = $data[$key]["id_mensualidad"];
      $item->sexo = $data[$key]["sexo"];
      $item->telefono = $data[$key]["telefono"];
      $item->fecha_inicio = $data[$key]["fecha_inicio"];
      $item->fecha_pago = $data[$key]["fecha_pago"];
      $item->correo = $data[$key]["correo"];
      $item->mensualidad = $data[$key]["mensualidad"];
      $item->tipo = $data[$key]["tipo"];
      $items[] = $item;      
    }
    return $response->withJSON($items);
  });

  $app->get('/client/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id');

    require_once "general.php";

    $data = $database->select(
      "tb_clientes",[
      "[><]tb_mensualidades" => ["id_mensualidad" => "id_mensualidad"],
      ],
      [   
      "tb_clientes.id_clientes",
      "tb_clientes.cedula",
      "tb_clientes.ruta_imagen",
      "tb_clientes.nombre",
      "tb_clientes.id_mensualidad",
      "tb_clientes.sexo",
      "tb_clientes.telefono",
      "tb_clientes.fecha_inicio",
      "tb_clientes.fecha_pago",
      "tb_clientes.correo",
      "tb_mensualidades.mensualidad",
      "tb_mensualidades.tipo"
      ],[
      "id_clientes" => "$id"
      ]);

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
      $item = new stdClass;
      $item->id_clientes = $data[$key]["id_clientes"];
      $item->cedula = $data[$key]["cedula"];
      $item->ruta_imagen = $data[$key]["ruta_imagen"];
      $item->nombre = $data[$key]["nombre"];
      $item->id_mensualidad = $data[$key]["id_mensualidad"];
      $item->sexo = $data[$key]["sexo"];
      $item->telefono = $data[$key]["telefono"];
      $item->fecha_inicio = $data[$key]["fecha_inicio"];
      $item->fecha_pago = $data[$key]["fecha_pago"];
      $item->correo = $data[$key]["correo"];
      $item->mensualidad = $data[$key]["mensualidad"];
      $item->tipo = $data[$key]["tipo"];
      $items[] = $item;      
    }
    return $response->withJSON($items);
  });

  $app->get('/mensualidades', function (Request $request, Response $response) {

  require_once "general.php";

  $data = $database->select("tb_mensualidades", "*");

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
     $item = new stdClass;
     $item->id_mensualidad = $data[$key]["id_mensualidad"];
     $item->mensualidad = $data[$key]["mensualidad"];
     $item->tipo = $data[$key]["tipo"];
     $item->total_clientes = $data[$key]["total_clientes"];
     $items[] = $item;      
   }
   return $response->withJSON($items);
  });
  $app->get('/payments', function (Request $request, Response $response) {

  require_once "general.php";

  $data = $database->select("tb_pagos", "*");

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
     $item = new stdClass;
     $item->id_pago = $data[$key]["id_pago"];
     $item->id_clientes = $data[$key]["id_clientes"];
     $item->fecha = $data[$key]["fecha"];
     $item->pago = $data[$key]["pago"];
     $item->nombre = $data[$key]["nombre"];
     $items[] = $item;      
   }
   return $response->withJSON($items);
  });
  
  $app->get('/todayPayments', function (Request $request, Response $response) {

    require_once "general.php";

    $items = array();

    $data = $database->select("tb_pagos", "*",[
      "fecha" => $fechaactual,
      ]);

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
     $item = new stdClass;
     $item->id_pago = $data[$key]["id_pago"];
     $item->id_clientes = $data[$key]["id_clientes"];
     $item->fecha = $data[$key]["fecha"];
     $item->pago = $data[$key]["pago"];
     $item->nombre = $data[$key]["nombre"];
     $items[] = $item;   
    }
    return $response->withJSON($items);
  });

  $app->get('/PaymentByDate/{old}/{new}', function (Request $request, Response $response) {

    $old = $request->getAttribute('old');
    $new = $request->getAttribute('new');

    require_once "general.php";

    $items = array();

    $data = $database->select("tb_pagos", "*",[
      "fecha[<>]" => [$old, $new],
      "ORDER" => "fecha"
      ]); 

    $items = array();
    $response->getBody()->rewind();
    foreach ($data as $key => $val) {
     $item = new stdClass;
     $item->id_pago = $data[$key]["id_pago"];
     $item->id_clientes = $data[$key]["id_clientes"];
     $item->fecha = $data[$key]["fecha"];
     $item->pago = $data[$key]["pago"];
     $item->nombre = $data[$key]["nombre"];
     $items[] = $item;   
    }
    return $response->withJSON($items);
  });

  $app->post('/pago/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id');
    $fecha_pago = $request->getParam('fecha_pago');
    $fecha = $request->getParam('fecha');
    $mensualidad = $request->getParam('mensualidad');
    $nombre = $request->getParam('nombre');
    require_once "general.php";

    $database->update("tb_clientes", [
      "fecha_pago" => "$fecha_pago"
      ],
      ["id_clientes" => "$id"]);

    $database->insert("tb_pagos", [
      "id_clientes" => "$id",
      "pago" => "$mensualidad",
      "fecha" => "$fecha",
      "nombre" => "$nombre"
    ]);
    $response->getBody()->rewind();
    return $response->withJSON('Pago realizado');

  });
  $app->post('/newClient', function (Request $request, Response $response) {

    $nombre = $request->getParam('nombre');
    $cedula = $request->getParam('cedula');
    $telefono = $request->getParam('telefono');
    $mensualidad = $request->getParam('mensualidad');
    $correo = $request->getParam('correo');
    $sexo = $request->getParam('sexo');
    $imagen = $request->getParam('imagen');
    $fecha_inicio = $request->getParam('hoy');
    $fecha_pago = $request->getParam('pago');

    if ($imagen == '' && $sexo =='h') {
      $ruta_imagen = 'http://ccdrorotina.com/ApiGimnasio/imagenes/default_hombre.jpg'; 
    }else if ($imagen == '' && $sexo =='m'){
      $ruta_imagen = 'http://ccdrorotina.com/ApiGimnasio/imagenes/default_mujer.jpg';  
    }else{
      $testimagen = $imagen;
      list(, $testimagen) = explode(';', $testimagen);
      list(, $testimagen) = explode(',', $testimagen);
      $imag = base64_decode($testimagen); 
      $ruta = './imagenes/'.$cedula.'.png';
      file_put_contents($ruta, $imag);
      $ruta_imagen = 'http://ccdrorotina.com/ApiGimnasio/imagenes/'.$cedula.'.png'; 
    }

    require_once "general.php";

     $database->insert("tb_clientes", [
      "nombre" => "$nombre",
      "cedula" => "$cedula",
      "sexo" => "$sexo",
      "fecha_inicio" => "$fecha_inicio",
      "fecha_pago" => "$fecha_pago",
      "id_mensualidad" => "$mensualidad",
      "telefono" => "$telefono",
      "correo" => "$correo",
      "ruta_imagen" => "$ruta_imagen",
      ]);

    $response->getBody()->rewind();
    return $response->withJSON('Cliente Agregado');

});

$app->post('/newMensualidad', function (Request $request, Response $response) {

    $nombre = $request->getParam('nombre');
    $mensualidad = $request->getParam('mensualidad');

    require_once "general.php";

    $database->insert("tb_mensualidades", [
      "tipo" => "$nombre",
      "mensualidad" => "$mensualidad"
    ]);

    $response->getBody()->rewind();
    return $response->withJSON('Mensualidad Agregada');

});
  
  $app->put('/update/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id');
    $nombre = $request->getParam('nombre');
    $cedula = $request->getParam('cedula');
    $telefono = $request->getParam('telefono');
    $mensualidad = $request->getParam('mensualidad');
    $correo = $request->getParam('correo');
    $imagen = $request->getParam('imagen');
    
    if ($imagen == '') {
      require_once "general.php";

      $database->update("tb_clientes", [
        "nombre" => "$nombre",
        "telefono" => "$telefono",
        "correo" => "$correo",
        "id_mensualidad" => "$mensualidad",
        ],
        ["id_clientes" => "$id"]);
      
      $response->getBody()->rewind();
      return $response->withJSON('Cliente actualizado');
    }else{ 
      $testimagen = $imagen;
      list(, $testimagen) = explode(';', $testimagen);
      list(, $testimagen) = explode(',', $testimagen);
      $imag = base64_decode($testimagen); 
      $ruta = './imagenes/'.$cedula.'.png';
      file_put_contents($ruta, $imag);
      $ruta_imagen = 'http://ccdrorotina.com/ApiGimnasio/imagenes/'.$cedula.'.png';
      require_once "general.php";

      $database->update("tb_clientes", [
        "nombre" => "$nombre",
        "telefono" => "$telefono",
        "correo" => "$correo",
        "id_mensualidad" => "$mensualidad",
        "ruta_imagen" => "$ruta_imagen",
        ],
        ["id_clientes" => "$id"]);
      $response->getBody()->rewind();
      return $response->withJSON('Cliente actualizado');
    }
  });

  $app->delete('/deleteClient/{id}', function (Request $request, Response $response) {

    $id = $request->getAttribute('id');

    require_once "general.php";

    $database->delete("tb_clientes",
      ["id_clientes" => "$id"]);
    $response->getBody()->rewind();
    return $response->withJSON('Cliente eliminado');
  });

  $app->run();

  ?>