<?php
header('Content-Type: application/json');

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем данные из POST-запроса
    $data = json_decode(file_get_contents('php://input'), true);
    
    $fullName = $data['fullName'] ?? '';
    $contactInfo = $data['contactInfo'] ?? '';
    $loanId = $data['loanId'] ?? '';

    // Проверяем, что данные заполнены
    if (!empty($fullName) && !empty($contactInfo) && !empty($loanId)) {
        // Путь к файлу, где будем сохранять данные
        $file = 'applications.txt';
        $entry = "Loan ID: $loanId, Full Name: $fullName, Contact Info: $contactInfo\n";

        // Записываем данные в файл
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

    // Возвращаем ответ в формате JSON
    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
