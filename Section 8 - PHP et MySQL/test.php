<?php

    
    try
    {
        $database = new PDO('mysql:host=localhost;dbname=store','root','', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    }    
    catch(Exception $e)
    {
        die('ERROR:'.$e->getMessage());
    }

    $sql = $database->prepare('INSERT INTO customers(first_name,last_name) VALUES (?,?)');

    $firstName = "JOHNY";
    $lastName = "HALLIDAY";

    $sql->execute(array($firstName,$lastName));
    
    // $results = $database->query('SELECT first_name, last_name FROM customers');
    // // $variable = $results->fetchAll(PDO::FETCH_ASSOC);
    // // var_dump($variable);
    // $database->query('DELETE FROM customers WHERE first_name="Clark"');
    // while($row = $results->fetch())
    // {
    //     echo $row['first_name'].'<br>';
    // }



?>