<?php
require_once("Model.php");
class Showtime extends Model {
    private int $id;
    private int $movie_id;
    private string $auditorium;
    private string $show_date; 
    private string $show_time;       
    private bool $is_peak;

    protected static string $table = "showtimes";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->movie_id = $data["movie_id"];
        $this->show_date = $data["show_date"];
        $this->show_time = $data["show_time"];
        $this->auditorium = $data["auditorium"];
        $this->is_peak=$data["is_peak"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getmovie(): int { 
        return $this->movie_id; 
    }
    public function getdate(): string { 
        return $this->show_date; 
    }
    public function gettime(): string { 
        return $this->show_time; 
    }
    public function getauditorium(): string { 
        return $this->auditorium; 
    }
    public function getpeak():bool{ 
        return $this->is_peak;
    }

    public function setmovie(int $id) { 
        $this->movie_id = $id; 
    }
    public function setdate(string $d) { 
        $this->show_date = $d; 
    }
    public function settime(string $t) { 
        $this->show_time = $t; 
    }
    public function setauditorium(string $a) { 
        $this->auditorium = $a; 
    }
    public function setpeak(bool $p){ 
        $this->is_peak=$p;
    }

    public function toArray() {
        return [
            $this->id,
            $this->movie_id,
            $this->auditorium,
            $this->show_date,
            $this->show_time,
            $this->is_peak
        ];
    }
}
