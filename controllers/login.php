<?php
require_once("../models/Admin.php");
require_once("../models/User.php");
require_once("../connection/connection.php");

User::setDb($mysqli);
Admin::setDb($mysqli);

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

// Read JSON body
$json = file_get_contents('php://input');
$input = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    exit;
}

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

// Check admin first
$admin = Admin::findByColumn('email', $email);
if ($admin && password_verify($password, $admin->getPassword())) {
    echo json_encode([
        'status' => 'success',
        'role' => 'admin',
        'id' => $admin->getId()
    ]);
    exit;
}

// Check user
$user = User::findByColumn('email', $email);
if ($user && password_verify($password, $user->getPassword())) {
    echo json_encode([
        'status' => 'success',
        'role' => 'user',
        'id' => $user->getId()
    ]);
    exit;
}

// Invalid credentials
http_response_code(401);
echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
