<?php
require_once("Model.php");
class Movie extends Model{
    private int $id;
    private string $title;
    private string $description;
    private string $genre;
    private string $age_rating;
    private string $trailer_url;
    private string $cast;
    private string $release_date;
    private string $end_date;
    private string $poster_image;
    private string $created_at;
    protected static string $table="movies";

    public function __construct(array $data)
    {
        $this->id=$data["id"];
        $this->title=$data["title"];
        $this->description=$data["description"];
        $this->genre=$data["genre"];
        $this->age_rating=$data["age_rating"];
        $this->trailer_url=$data["trailer_url"];
        $this->cast=$data["cast"];
        $this->release_date=$data["release_date"];
        $this->end_date=$data["end_date"];
        $this->poster_image=$data["poster_image"];
        $this->created_at=$data["created_at"];
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
        return $this->age_rating;
    }
    public function gettrailer():string{
        return $this->trailer_url;
    }
    public function getcast():string{
        return $this->cast;
    }
    public function getrelease_date():string{
        return $this->release_date;
    }
    public function getend_date():string{
        return $this->end_date;
    }
    public function getposter():string{
        return $this->poster_image;
    }
    public function getcreated():string{
        return $this->created_at;
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
        $this->age_rating=$agerating;
    }
    public function settrailer(string $trailer){
        $this->trailer_url=$trailer;
    }
    public function setcast(string $cast){
        $this->cast=$cast;
    }
    public function setrelease_date(string $release_date){
        $this->release_date=$release_date;
    }
    public function setend_date(string $end_date){
        $this->end_date=$end_date;
    }
    public function setposter(string $poster){
        $this->poster_image=$poster;
    }
    public function setcreated(string $created){
        $this->created_at=$created;
    }
     public function toArray(){
        return ["id"=>$this->id, 
        "title"=>$this->title,
        "description"=>$this->description, 
        "genre"=>$this->genre, 
        "age_rating"=>$this->age_rating, 
        "trailer_url"=>$this->trailer_url, 
        "cast"=>$this->cast, 
        "release_date"=>$this->release_date, 
        "end_date"=>$this->end_date, 
        "poster_image"=>$this->poster_image, 
        "created_at"=>$this->created_at];
    }
    
}