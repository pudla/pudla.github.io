<?php
   
   $db = new PDO('sqlite:ServerStorage');
   
   $query = $_POST['query'];
      
   require_once('bodyselect.php');
  
?>