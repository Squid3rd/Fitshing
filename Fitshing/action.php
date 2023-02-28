<?php

    $connect = new PDO("mysql:host=localhost;dbname=fitshing", "root", "");
    $request_data = json_decode(file_get_contents("php://input"));
    $date = array();

    // if($request_data -> action == "insert"){
    //     // echo "pppp";
    //     $data = array(':fname' => $request_data -> fname, ':lname' => $request_data -> lname,
    //     ':u_pass' => $request_data -> password, ':phone' => $request_data -> phone,
    //     ':sex' => $request_data -> gender, ':weight_u' => $request_data -> weight1,
    //     ':age' => $request_data -> age, ':height_u' => $request_data -> height,
    //     ':email' => $request_data -> email, ':u_addr' => $request_data -> address,
    //     );
    //     $qurry = 'INSERT INTO user_f (fname, lname, sex, age, email, weight1, height, phone, u_addr, u_pass)
    //      VALUES(:fname, :lname, :sex, :age, :email, :weight_u, :height_u, :phone, :u_addr, :u_pass)';
    //      $statement = $connect -> prepare($qurry);
    //      $statement -> execute($data);
    //      $output = array('message' => 'Insert Complete');
    //      echo json_encode($output);
    // }

?>