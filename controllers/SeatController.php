<?php

require_once(__DIR__."/BaseController.php");

class SeatController{
    public function GetAllSeats(){
        try{
            $seats = Seat::findAll();
            $seats_array = SeatService::seatsToArray($seats); 
            echo ResponseService::success_response($seats_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetSeat(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $seat=Seat::find($id)->toArray();
                echo ResponseService::success_response($seat);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateSeat(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['showtime_id', 'seat_label','status'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            Seat::create($data);
            echo ResponseService::success_response("Seat created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateSeat(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Seat ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Seat::update($id,$data);
            echo ResponseService::success_response("Seat updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteSeat(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Seat::delete($id);
                echo ResponseService::success_response("Seat Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Seat ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}