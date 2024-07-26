<?php
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data = json_decode(file_get_contents('php://input'), true);
    $fullName = $data['fullName'] ?? '';
    $contactInfo = $data['contactInfo'] ?? '';
    $loanId = $data['loanId'] ?? '';

  
    if (!empty($fullName) && !empty($contactInfo) && !empty($loanId)) {
     
        $file = 'applications.txt';
        $entry = "Loan ID: $loanId, Full Name: $fullName, Contact Info: $contactInfo\n";

        if (file_put_contents($file, $entry, FILE_APPEND | LOCK_EX)) {
            $response = ['message' => 'Application submitted successfully.'];
        } else {
            http_response_code(500);
            $response = ['error' => 'Failed to save application.'];
        }
    } else {
        http_response_code(400);
        $response = ['error' => 'Invalid input.'];
    }
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
