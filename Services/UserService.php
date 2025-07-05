<?php 

class UserService {

    public static function usersToArray($users_db){
        $results = [];
        foreach($users_db as $u){
            $results[] = $u->toArray();
        }
        return $results;
    }
}