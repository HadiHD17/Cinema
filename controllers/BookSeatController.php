<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once(__DIR__."/BaseController.php");

class BookSeatController{
    

    public function CreateSeatBooking(){
    try {
        $json = file_get_contents('php://input');
        $input = json_decode($json, true);
        $data = $input['data'] ?? [];
        $required = ['booking_id', 'seat_id'];
        foreach($required as $r){
            if (empty($data[$r])) {
                http_response_code(400);
                echo ResponseService::error_response("Missing required fields");
                return;
            }
        }
        BookingSeat::create($data);
        Seat::updateStatus($data['seat_id']);
        echo ResponseService::success_response("Seat Booking created successfully");
    } catch(Throwable $e){
        http_response_code(500);
        echo ResponseService::error_response("server error: " . $e->getMessage());
    }
}

}