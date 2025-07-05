<?php

require_once(__DIR__."/BaseController.php");

class ShowtimeController{
    public function GetAllShowtimes(){
        try{
            $showtimes = Showtime::findAll();
            $showtimes_array = ShowtimeService::showtimesToArray($showtimes); 
            echo ResponseService::success_response($showtimes_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetShowtime(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $showtime=Showtime::find($id)->toArray();
                echo ResponseService::success_response($showtime);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateShowtime(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['movie_id', 'auditorium','show_date', 'show_time'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            Showtime::create($data);
            echo ResponseService::success_response("Showtime created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateShowtime(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Showtime ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Showtime::update($id,$data);
            echo ResponseService::success_response("Showtime updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteShowtime(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Showtime::delete($id);
                echo ResponseService::success_response("Showtime Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Showtime ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}