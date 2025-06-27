<?php
class CinemaNight extends Model{
    private int $id;
    private int $userId;
    private string $genre;
    private string $preffered;
    private bool $autobook;
    protected static string $table="cinemanights";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->userId=$data["userId"];
        $this->genre=$data["genre"];
        $this->preffered=$data["preffered"];
        $this->autobook=$data["autobook"];
    }

    public function getId():int{
        return $this->id;
    }
    public function getuserId():int{
        return $this->userId;
    }
    public function getgenre():string{
        return $this->genre;
    }
    public function getpreffered():string{
        return $this->preffered;
    }
    public function getautobook():bool{
        return $this->autobook;
    }

    public function setuserId(int $userId){
        $this->userId=$userId;
    }
    public function setgenre(string $genre){
        $this->genre=$genre;
    }
    public function setpreffered(string $preffered){
        $this->preffered=$preffered;
    }
    public function setautobook(bool $autobook){
        $this->autobook=$autobook;
    }
    public function toArray(){
        return [$this->id, $this->userId, $this->genre, $this->preffered,$this->autobook];
    }


}