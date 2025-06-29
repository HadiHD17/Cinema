<?php
require_once("../connection/connection.php");
require_once("../models/User.php");

header('Content-Type: application/json');

User::setDb($mysqli);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
    exit;
}

// Basic validation
$required = ['full_name', 'email', 'phone', 'BDay', 'password','comm_pref'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
        exit;
    }
}

// Check if email already exists
$existingUser = User::findByColumn('email', $input['email']);
if ($existingUser) {
    echo json_encode(['status' => 'error', 'message' => 'Email already registered']);
    exit;
}

// Hash the password
$input['password'] = password_hash($input['password'], PASSWORD_DEFAULT);

// Create user
User::create($input);

echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
