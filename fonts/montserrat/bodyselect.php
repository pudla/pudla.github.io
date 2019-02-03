<?php 

   $status = "";
   
   $resultado = $db->prepare($query);
   $resultado->execute();

   //$message = array('result'=>$resultado->fetchAll(PDO::FETCH_ASSOC));
   $message = $resultado->fetchAll(PDO::FETCH_ASSOC);
   $data = array();

   array_push($data,$message);

   echo json_encode($data, JSON_UNESCAPED_UNICODE);
   
   $db = null;

   unset($db);

?>