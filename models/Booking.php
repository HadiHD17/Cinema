<?php
class Booking extends Model{
    private int $id;
    private int $userId;
    private int $showtimeId;
    private float $totalprice;
    private DateTime $bookingtime;
    private string $status;
    protected static string $table="bookings";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->userId=$data["userId"];
        $this->showtimeId=$data["showtimeId"];
        $this->totalprice=$data["totalprice"];
        $this->bookingtime=$data["bookingtime"];
        $this->status=$data["status"];
        
    }

    public function getId():int{
        return $this->id;
    }
     public function getuserId():int{
        return $this->userId;
    }
     public function getshowtimeId():int{
        return $this->showtimeId;
    }
     public function gettotalprice():float{
        return $this->totalprice;
    }
     public function getbookingtime():DateTime{
        return $this->bookingtime;
    }
    public function getstatus():string{
        return $this->status;
    }

    public function setuserId(int $userId){
        $this->userId=$userId;
    }
       public function setshowtimeId(int $showtimeId){
        $this->showtimeId=$showtimeId;
    }
       public function settotalprice(float $totalprice){
        $this->totalprice=$totalprice;
    }
       public function setbookingtime(DateTime $bookingtime){
        $this->bookingtime=$bookingtime;
    }
       public function setstatus(string $status){
        $this->status=$status;
    }
     public function toArray(){
        return [$this->id, $this->userId, $this->showtimeId, $this->totalprice,$this->bookingtime,$this->status];
    }

}