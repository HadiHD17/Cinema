<?php
require("../models/SnackOrder.php");
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
            $required = ['booking_id', 'snack_id','quantity'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    throw new InvalidArgumentException("Missing required field: $field");
                }
            }
            
            
            SnackOrder::create($data);
            $response['message'] = 'Order created successfully';
            break;

        case 'update':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("Order ID is required for update");
            }
            
            
            
            $id = $data['id'];
            unset($data['id']); 
            SnackOrder::update($id, $data);
            $response['message'] = 'Order updated successfully';
            break;

        case 'delete':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("Order ID is required for deletion");
            }
            
            SnackOrder::delete($data['id']);
            $response['message'] = 'Order deleted successfully';
            break;
    }

    
    if ($action !== 'delete' && !empty($id ?? $data['id'] ?? null)) {
        $response['data'] = SnackOrder::find($id ?? $data['id'])->toArray();
    }

} catch (InvalidArgumentException $e) {
    $response = ['status' => 400, 'message' => $e->getMessage(), 'data' => null];
} catch (Exception $e) {
    $response = ['status' => 500, 'message' => 'Server error: ' . $e->getMessage(), 'data' => null];
}

echo json_encode($response);