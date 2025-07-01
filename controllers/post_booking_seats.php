<?php
require_once("../connection/connection.php");

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 405, 'message' => 'Only POST allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$booking_id = $input['booking_id'] ?? null;
$seat_id = $input['seat_id'] ?? null;

if (!$booking_id || !$seat_id) {
    http_response_code(400);
    echo json_encode(['status' => 400, 'message' => 'Missing booking_id or seat_id']);
    exit;
}

try {
    
    $stmt = $mysqli->prepare("INSERT INTO booking_seats (booking_id, seat_id) VALUES (?, ?)");
    if (!$stmt) throw new Exception($mysqli->error);

    $stmt->bind_param("ii", $booking_id, $seat_id);
    $stmt->execute();
    $stmt->close();

    
    $stmt2 = $mysqli->prepare("UPDATE seats SET status = 'booked' WHERE id = ?");
    if (!$stmt2) throw new Exception($mysqli->error);

    $stmt2->bind_param("i", $seat_id);
    $stmt2->execute();
    $stmt2->close();

    echo json_encode(['status' => 200, 'message' => 'Seat booked successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 500, 'message' => $e->getMessage()]);
}
