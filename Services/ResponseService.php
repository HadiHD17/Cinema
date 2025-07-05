<?php

class ResponseService {

    public static function success_response($payload){
        $response = [];
        $response["status"] = http_response_code();
        $response["payload"] = $payload;
        return json_encode($response);
    }
    public static function error_response($message="An error has occured"){
        $response=[];
        $response["status"]=http_response_code();
        $response["message"]=$message;
        return json_encode($response);
    }


}