<?php
require_once("Model.php");
class User extends Model {
    private int $id;
    private string $full_name;
    private string $email;
    private string $phone;
    private string $password;
    private string $BDay;
    private bool $is_verified;
    private ?string $id_document;
    private ?string $favorite_genres;
    private string $comm_pref;
    private string $created_at;

    protected static string $table = "users";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->full_name = $data["full_name"];
        $this->email = $data["email"];
        $this->phone = $data["phone"];
        $this->password = $data["password"];
        $this->BDay = $data["BDay"];
        $this->is_verified = (bool)$data["is_verified"];
        $this->id_document = $data["id_document"] ;
        $this->favorite_genres = $data["favorite_genres"];
        $this->comm_pref = $data["comm_pref"];
        $this->created_at = $data["created_at"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getname(): string { 
        return $this->full_name; 
    }
    public function getemail(): string { 
        return $this->email;
     }
    public function getphone(): string { 
        return $this->phone; 
    }
    public function getpassword(): string { 
        return $this->password; 
    }
    public function getbday(): string { 
        return $this->BDay; 
    }
    public function isverified(): bool { 
        return $this->is_verified; 
    }
    public function getidDoc(): ?string { 
        return $this->id_document; 
    }
    public function getgenres(): ?string { 
        return $this->favorite_genres; 
    }
    public function getcommPref(): string { 
        return $this->comm_pref; 
    }
    public function getcreated(): string { 
        return $this->created_at; 
    }

    public function setname(string $name) { 
        $this->full_name = $name; 
    }
    public function setemail(string $email) { 
        $this->email = $email; 
    }
    public function setphone(string $phone) { 
        $this->phone = $phone;
    }
    public function setpassword(string $pass) { 
        $this->password = $pass; 
    }
    public function setbday(string $bday) { 
        $this->BDay = $bday; 
    }
    public function setverified(bool $verified) {
         $this->is_verified = $verified;
    }
    public function setidDoc(?string $idDoc) { 
        $this->id_document = $idDoc; 
    }
    public function setgenres(?string $genres) {
         $this->favorite_genres = $genres;
    }
    public function setcommPref(string $pref) { 
        $this->comm_pref = $pref; 
    }

    public function toArray() {
        return [
            $this->id,
            $this->full_name,
            $this->email,
            $this->phone,
            $this->password,
            $this->BDay,
            $this->is_verified,
            $this->id_document,
            $this->favorite_genres,
            $this->comm_pref,
            $this->created_at
        ];
    }
}
