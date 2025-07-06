<?php

require_once(__DIR__."/BaseController.php");

class SnackOrderController{
    public function GetAllSnackOrders(){
        try{
            $snackorders = SnackOrder::findAll();
            $snackorders_array = SnackOrderService::snackordersToArray($snackorders); 
            echo ResponseService::success_response($snackorders_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetSnackOrder(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $snackorder=SnackOrder::find($id)->toArray();
                echo ResponseService::success_response($snackorder);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateSnackOrder(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['booking_id', 'snack_id','quantity'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            SnackOrder::create($data);
            echo ResponseService::success_response("SnackOrder created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateSnackOrder(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("SnackOrder ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            SnackOrder::update($id,$data);
            echo ResponseService::success_response("SnackOrder updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteSnackOrder(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                SnackOrder::delete($id);
                echo ResponseService::success_response("SnackOrder Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("SnackOrder ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}