<?php
require_once(__DIR__."/BaseController.php");

class AuthController{

    public static function checkAdmin(){
        $json = file_get_contents('php://input');
        $input = json_decode($json, true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $admin = Admin::findByColumn('email', $email);
        if ($admin && password_verify($password, $admin->getPassword())) {
            return $admin;
        }
    }

    public static function checkUser(){
        $json = file_get_contents('php://input');
        $input = json_decode($json, true);
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $user = User::findByColumn('email', $email);
        if ($user && password_verify($password, $user->getPassword())) {
            return $user;
        }
    }

    public function login(){
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
            http_response_code(401);
            echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ]);
        exit;
    }

    public function register(){
        try{
        $json = file_get_contents('php://input');
        $input = json_decode($json, true);
        $required = ['full_name', 'email', 'phone', 'BDay', 'password','comm_pref'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
                exit;
            }
        }
        $existingUser=AuthController::checkUser();
        if ($existingUser) {
            echo json_encode(['status' => 'error', 'message' => 'Email already registered']);
            exit;
        }
        $input['password']=password_hash($input['password'], PASSWORD_DEFAULT);
        User::create($input);
        echo json_encode(['status' => 'success', 'message' => 'User registered successfully']);
        }catch(Throwable $e){
            http_response_code(401);
            echo json_encode("unathorized ".$e->getMessage()); 
        }
    }
}