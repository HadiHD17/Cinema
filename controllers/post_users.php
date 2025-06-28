<?php
require("../models/User.php");
require_once("../connection/connection.php");


$response = ['status' => 200, 'message' => '', 'data' => null];


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 405, 'message' => 'Only POST requests allowed']);
    exit;
}

try {
    
    $json = file_get_contents('php://input');
    $input = json_decode($json, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new InvalidArgumentException("Invalid JSON format");
    }

   
    $action = $input['action'] ?? null;
    $data = $input['data'] ?? [];

    
    if (!in_array($action, ['create', 'update', 'delete'])) {
        throw new InvalidArgumentException("Invalid action specified");
    }

    switch ($action) {
        case 'create':
            $required = ['full_name', 'email', 'phone', 'password', 'BDay', 'comm_pref'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    throw new InvalidArgumentException("Missing required field: $field");
                }
            }
            
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            User::create($data);
            $response['message'] = 'User created successfully';
            break;

        case 'update':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("User ID is required for update");
            }
            
            if (isset($data['password'])) {
                $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
            }
            
            $id = $data['id'];
            unset($data['id']); 
            User::update($id, $data);
            $response['message'] = 'User updated successfully';
            break;

        case 'delete':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("User ID is required for deletion");
            }
            
            User::delete($data['id']);
            $response['message'] = 'User deleted successfully';
            break;
    }

    
    if ($action !== 'delete' && !empty($id ?? $data['id'] ?? null)) {
        $response['data'] = User::find($id ?? $data['id'])->toArray();
    }

} catch (InvalidArgumentException $e) {
    $response = ['status' => 400, 'message' => $e->getMessage(), 'data' => null];
} catch (Exception $e) {
    $response = ['status' => 500, 'message' => 'Server error: ' . $e->getMessage(), 'data' => null];
}

echo json_encode($response);