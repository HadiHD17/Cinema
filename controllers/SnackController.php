<?php

require_once(__DIR__."/BaseController.php");

class SnackController{
    public function GetAllSnacks(){
        try{
            $snacks = Snack::findAll();
            $snacks_array = SnackService::snacksToArray($snacks); 
            echo ResponseService::success_response($snacks_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetSnack(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $snack=Snack::find($id)->toArray();
                echo ResponseService::success_response($snack);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateSnack(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['name', 'price','image'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            Snack::create($data);
            echo ResponseService::success_response("Snack created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateSnack(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Snack ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Snack::update($id,$data);
            echo ResponseService::success_response("Snack updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteSnack(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Snack::delete($id);
                echo ResponseService::success_response("Snack Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Snack ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}