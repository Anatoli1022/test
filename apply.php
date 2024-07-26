<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = $_POST['fullName'];
    $contactInfo = $_POST['contactInfo'];
    
   
    $file = 'applications.txt';
    $data = "Full Name: $fullName, Contact Info: $contactInfo\n";
    file_put_contents($file, $data, FILE_APPEND | LOCK_EX);
    

    header('Content-Type: application/json');
    echo json_encode(['message' => 'Application submitted successfully.']);
}
?>
