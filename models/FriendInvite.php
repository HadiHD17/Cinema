<?php
require_once("Model.php");
class FriendInvite extends Model{
    private int $id;
    private int $bookingId;
    private int $userId;
    private string $status;
 
    protected static string $table="friendsinvites";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->bookingId=$data["bookingId"];
        $this->userId=$data["userId"];
        $this->status=$data["status"];
        
    }

    public function getId():int{
        return $this->id;
    }
    public function getbookingId():int{
        return $this->bookingId;
    }
    public function getuserId():int{
        return $this->userId;
    }
    public function getstatus():string{
        return $this->status;
    }
    

    public function setbookingId(int $bookingId){
        $this->bookingId=$bookingId;
    }
    public function setuserId(int $userId){
        $this->userId=$userId;
    }
    public function setstatus(string $status){
        $this->status=$status;
    }
    
    public function toArray(){
        return [$this->id, $this->bookingId,$this->userId, $this->status];
    }

}