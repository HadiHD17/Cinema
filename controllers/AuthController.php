<?php
require_once(__DIR__."/BaseController.php");

class AuthController{

    public static function checkAdmin(){
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $admin = Admin::findByColumn('email', $email);
        if ($admin && password_verify($password, $admin->getPassword())) {
            return $admin;
        }
    }

    public static function checkUser(){
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $user = User::findByColumn('email', $email);
        if ($user && password_verify($password, $user->getPassword())) {
            return $user;
        }
    }

    public function login(){
        try{
            $admin=AuthController::checkAdmin();
            $user=AuthController::checkUser();
            if($admin){
                echo json_encode([
                    'status' => 'success',
                    'role' => 'admin',
                    'id' => $admin->getId()
                ]);
                exit;
            }
            if($user){
                echo json_encode([
                    'status' => 'success',
                    'role' => 'user',
                    'id' => $user->getId()
                ]);
                exit;
            }
        }catch(Throwable $e){
            http_response_code(401);
            echo ResponseService::error_response("unathorized ".$e->getMessage());
        }
    }
}