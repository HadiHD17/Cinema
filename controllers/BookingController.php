<?php

require_once(__DIR__."/BaseController.php");

class BookingController{
    public function GetAllBookings(){
        try{
            $bookings = Booking::findAll();
            $bookings_array = BookingService::bookingsToArray($bookings); 
            echo ResponseService::success_response($bookings_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetBooking(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $booking=Booking::find($id)->toArray();
                echo ResponseService::success_response($booking);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateBooking(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['user_id', 'showtime_id', 'total_price', 'status'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            $insertedId = Booking::create($data);
            $bookingInfo = [
                'id' => $insertedId,
                'user_id' => $data['user_id'],
                'showtime_id' => $data['showtime_id'],
                'total_price' => $data['total_price'],
                'status' => $data['status']
            ];
            echo ResponseService::success_response($bookingInfo);

            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateBooking(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Booking ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Booking::update($id,$data);
            echo ResponseService::success_response("Booking updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteBooking(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Booking::delete($id);
                echo ResponseService::success_response("Booking Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Booking ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}