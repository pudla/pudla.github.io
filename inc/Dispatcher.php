<?php

    $sci = '<script>';
    $scf = '</scrip>';

if($_POST) {

    // Replace this with your own email address
    $siteOwnersEmail = 'hanercamilo@gmail.com';
    $Who = 'Administador Pudla - Polla Mundialista Uniamazonia';
    
    // $name = trim(stripslashes($_POST['contactName']));
    // $email = trim(stripslashes($_POST['contactEmail']));
    // $subject = trim(stripslashes($_POST['contactSubject']));
    
    $V_Document = trim(stripslashes($_POST['document']));
    $V_Nombres = trim(stripslashes($_POST['firstname']));
    $V_Apellidos = trim(stripslashes($_POST['lastname']));
    $V_Email = trim(stripslashes($_POST['email']));
    $V_Telefono = trim(stripslashes($_POST['phone']));
    $V_Usuario = trim(stripslashes($_POST['username']));
    $V_Contrasena = trim(stripslashes($_POST['password']));
    $contact_message = `Su cuenta ha sido creada exitosamente, 
    solicite su activación con el administrador para participar y registrar tus votos por tus equipos favoritos.`;

    $error = null;

    // Check Document
    if (strlen($V_Document) < 9) {
        $error['document'] = "Por favor ingrese su(s) nombre(s).";
    }
    // Check Name
    if (strlen($V_Nombres) < 4) {
        $error['name'] = "Por favor ingrese su(s) nombre(s).";
    }
    // Check Lastname
    if (strlen($V_Apellidos) < 4) {
        $error['lastname'] = "Por favor ingrese su(s) apellido(s).";
    }
    // Check Email
    if (!preg_match('/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i', $V_Email)) {
        $error['email'] = "Por favor ingrese una dirección de coreo válida.";
    }
    // Check Phone
    if (strlen($V_Telefono) < 9) {
        $error['phone'] = "Por favor ingrese su(s) teléfono(s) de contacto.";
    }
    // Check Username
    if (strlen($V_Usuario) < 4) {
        $error['username'] = "Por favor ingrese su nombre de usuario.";
    }
    // Check Password
    if (strlen($V_Contrasena) < 7) {
        $error['password'] = "Por favor ingrese su contraseña.";
    }

    $message = "";

    // Set Message
    $message .= "Email from: " . $Who . "<br />";
    $message .= "Email address: " . $V_Email . "<br />";
    $message .= "Message: <br />";
    $message .= $contact_message;
    $message .= "<br /> ----- <br /> Por favor no conteste este correo. <br />";

    // Set From: header
    $from =  $Who . " <" . $siteOwnersEmail . ">";

    // Email Headers
    $headers = "From: " . $Who . "\r\n";
    $headers .= "Reply-To: ". $siteOwnersEmail . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    // http://localhost:8080/dispatcher/index?id=9&params=01%2Fmilacho%2Fhaner%2Fperea%2Fmilacho%2F3123534100%2Fhanercamilo%40gmail.com
    $geturl = "http://localhost:8080/dispatcher/index?id=9&params=" . $V_Document . "/" . $V_Usuario . "/" . $V_Nombres . "/" . $V_Apellidos . "/" . $V_Contrasena . "/" . $V_Telefono . "/" . $V_Email ;
    //$geturl = (string)"http://localhost:8080/dispatcher/index?id=9" . "&" ."params=01%2Fmilacho%2Fhaner%2Fperea%2Fmilacho%2F3123534100%2Fhanercamilo%40gmail.com";
    echo $geturl;

    $data = array();
    array_push($data, file_get_contents($geturl)); 
    echo $data[0];
    if( preg_match('/:"1"/',$data[0]) ) {
        echo 'Cuenta creada Exitosamente.';
    }else{
        echo 'La Cuenta ya existe, verifique sus datos nuevamente.';
    }
  
    echo '<script>
    result = '. $data[0] .';
    if(result.data[0].data == 1){
        sessionStorage.setItem("name", $("#contactUser").val() );
        $("#Crear").prop( "disabled", true );
        $(".message-warning")[0].style["color"] = "#39b54a";
        // $(".message-success")[0].style["display"] = "block";
        // $(".message-warning")[0].style["display"] = ""; 
        // $(".message-success")[0].style["padding"] = "0";
        // $(".message-success")[0].innerHTML = "Cuenta creada Exitosamente";
    }else{
        $(".message-warning")[0].style["color"] = "#ff6163";
        // $(".message-warning")[0].style["display"] = "block";
        // $(".message-success")[0].style["display"] = "";
        // $(".message-warning")[0].style["padding"] = "0";
        // $(".message-warning")[0].innerHTML = "Esta cuenta ya se encuentra registrada, no puede ser creada. Intente iniciar sesión.";
    }
    </script>';  


}

?>