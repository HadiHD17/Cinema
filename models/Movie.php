<?php
require_once("Model.php");
class Movie extends Model{
    private int $id;
    private string $title;
    private string $description;
    private string $genre;
    private string $agerating;
    private string $trailer;
    private string $cast;
    private DateTime $release_date;
    private DateTime $end_date;
    private string $poster;
    private DateTime $created;
    protected static string $table="movies";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->title=$data["title"];
        $this->description=$data["description"];
        $this->genre=$data["genre"];
        $this->agerating=$data["agerating"];
        $this->trailer=$data["trailer"];
        $this->cast=$data["cast"];
        $this->release_date=$data["release_date"];
        $this->end_date=$data["end_date"];
        $this->poster=$data["poster"];
        $this->created=$data["created"];
    }
     
    public function getid():int{
        return $this->id;
    }
    public function gettitle():string{
        return $this->title;
    }
    public function getdescription():string{
        return $this->description;
    }
    public function getgenre():string{
        return $this->genre;
    }
    public function getagerating():string{
        return $this->agerating;
    }
    public function gettrailer():string{
        return $this->trailer;
    }
    public function getcast():string{
        return $this->cast;
    }
    public function getrelease_date():DateTime{
        return $this->release_date;
    }
    public function getend_date():DateTime{
        return $this->end_date;
    }
    public function getposter():string{
        return $this->poster;
    }
    public function getcreated():DateTime{
        return $this->created;
    }

    public function settitle(string $title){
        $this->title=$title;
    }
    public function setdescription(string $description){
        $this->description=$description;
    }
    public function setgenre(string $genre){
        $this->genre=$genre;
    }
    public function setagerating(string $agerating){
        $this->agerating=$agerating;
    }
    public function settrailer(string $trailer){
        $this->trailer=$trailer;
    }
    public function setcast(string $cast){
        $this->cast=$cast;
    }
    public function setrelease_date(DateTime $release_date){
        $this->release_date=$release_date;
    }
    public function setend_date(DateTime $end_date){
        $this->end_date=$end_date;
    }
    public function setposter(string $poster){
        $this->poster=$poster;
    }
    public function setcreated(DateTime $created){
        $this->created=$created;
    }
     public function toArray(){
        return [$this->id, $this->title, $this->description, $this->genre, $this->agerating, $this->trailer, $this->cast, $this->release_date, $this->end_date, $this->poster, $this->created];
    }
    
}