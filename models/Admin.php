<?php
require_once("Model.php");
class Admin extends Model{
    private int $id;
    private string $username;
    private string $email;
    private string $password;

    protected static string $table="admins";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->username=$data["username"];
        $this->email=$data["email"];
        $this->password=$data["password"];
    }
     
    public function getid():int{
        return $this->id;
    }
    public function getusername():string{
        return $this->username;
    }
    public function getemail():string{
        return $this->email;
    }
    public function getpassword():string{
        return $this->password;
    }

    public function setusername(string $username){
        $this->username=$username;
    }

    public function setemail(string $email){
        $this->email=$email;
    }

    public function setpassword(string $password){
        $this->password=$password;
    }

    public function toArray(){
        return ["id"=>$this->id, "username"=>$this->username, "email"=>$this->email, "password"=>$this->password];
    }

}