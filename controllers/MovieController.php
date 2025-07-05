<?php

require_once(__DIR__."/BaseController.php");

class MovieController{
    public function GetAllMovies(){
        try{
            $movies = Movie::findAll();
            $movies_array = MovieService::moviesToArray($movies); 
            echo ResponseService::success_response($movies_array);
            return;
        } catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function GetMovie(){
        try{
            if(isset($_GET['id'])){
                $id=$_GET['id'];
                $movie=Movie::find($id)->toArray();
                echo ResponseService::success_response($movie);
                return;
            }  
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage());
        }
    }

    public function CreateMovie(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            $required=['title', 'description', 'genre', 'age_rating', 'trailer_url', 'cast', 'release_date', 'end_date', 'poster_image'];
            foreach($required as $r){
                if(empty($data[$r])){
                    http_response_code(400);
                    echo ResponseService::error_response("Missing required fields");
                    return;
                }
            }
            Movie::create($data);
            echo ResponseService::success_response("Movie created successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function UpdateMovie(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $data = $input['data'] ?? [];
            if(empty($data["id"])){
                http_response_code(400);
                echo ResponseService::error_response("Movie ID is missing");
                return;
            }
            $id=$data["id"];
            unset($data["id"]);
            Movie::update($id,$data);
            echo ResponseService::success_response("Movie updated successfully");
            return;
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }

    public function DeleteMovie(){
        try{
            $json = file_get_contents('php://input');
            $input = json_decode($json, true);
            $id = $input['id'] ?? null;
            if($id){
                Movie::delete($id);
                echo ResponseService::success_response("Movie Deleted Successfully");
                return;
            }
            http_response_code(400);
            echo ResponseService::error_response("Movie ID is missing");
        }catch(Throwable $e){
            http_response_code(500);
            echo ResponseService::error_response("server error: ".$e->getMessage()); 
        }
    }
}