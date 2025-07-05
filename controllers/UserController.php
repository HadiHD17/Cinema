<?php
require_once(__DIR__."/BaseController.php");

class UserController{
    public function GetAllUsers(){
        try{
            $users = User::findAll();
            $users_array = UserService::usersToArray($users); 
            echo ResponseService::success_response($users_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetUser(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $user=User::find($id)->toArray();
                echo ResponseService::success_response($user);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateUser(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['full_name', 'email', 'phone', 'BDay', 'password','comm_pref'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            User::create($data);
            echo ResponseService::success_response("user created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateUser(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("User ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            User::update($id,$data);
            echo ResponseService::success_response("User updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteUser(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                User::delete($id);
                echo ResponseService::success_response("User Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("User ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}