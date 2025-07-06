<?php

require_once(__DIR__."/BaseController.php");

class PaymentController{
    public function GetAllPayments(){
        try{
            $payments = Payment::findAll();
            $payments_array = PaymentService::paymentsToArray($payments); 
            echo ResponseService::success_response($payments_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetPayment(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $payment=Payment::find($id)->toArray();
                echo ResponseService::success_response($payment);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreatePayment(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['booking_id', 'amount','payment_method', 'payer_user_id'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            Payment::create($data);
            echo ResponseService::success_response("Payment created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdatePayment(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Payment ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Payment::update($id,$data);
            echo ResponseService::success_response("Payment updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeletePayment(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Payment::delete($id);
                echo ResponseService::success_response("Payment Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Payment ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}