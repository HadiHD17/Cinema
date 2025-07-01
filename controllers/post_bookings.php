<?php
require("../models/Booking.php");
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
    $required = ['user_id', 'showtime_id', 'total_price', 'status'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new InvalidArgumentException("Missing required field: $field");
        }
    }

    // Create booking and get inserted ID
    $booking_id = Booking::create($data);

    // Return only booking ID for now (simpler for frontend)
    $response['message'] = 'Booking created successfully';
    $response['data'] = ['id' => $booking_id];
    break;

        case 'update':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("Booking ID is required for update");
            }

            $id = $data['id'];
            unset($data['id']);
            Booking::update($id, $data);
            $response['message'] = 'Booking updated successfully';

            $updatedBooking = Booking::find($id);
            $response['data'] = $updatedBooking ? $updatedBooking->toArray() : null;
            break;

        case 'delete':
            if (empty($data['id'])) {
                throw new InvalidArgumentException("Booking ID is required for deletion");
            }

            Booking::delete($data['id']);
            $response['message'] = 'Booking deleted successfully';
            $response['data'] = null;
            break;
    }

} catch (InvalidArgumentException $e) {
    $response = ['status' => 400, 'message' => $e->getMessage(), 'data' => null];
} catch (Exception $e) {
    $response = ['status' => 500, 'message' => 'Server error: ' . $e->getMessage(), 'data' => null];
}

echo json_encode($response);
