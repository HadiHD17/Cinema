<?php
require_once("Model.php");
class Showtime extends Model {
    private int $id;
    private int $movie_id;
    private DateTime $start_time; 
    private DateTime $date;       
    private string $auditorium;
    private bool $is_peak;

    protected static string $table = "showtimes";

    public function __construct(array $data) {
        $this->id = $data["id"];
        $this->movie_id = $data["movie_id"];
        $this->start_time = $data["start_time"];
        $this->date = $data["date"];
        $this->auditorium = $data["auditorium"];
        $this->is_peak=$data["is_peak"];
    }

    public function getid(): int { 
        return $this->id; 
    }
    public function getmovie(): int { 
        return $this->movie_id; 
    }
    public function getstart(): DateTime { 
        return $this->start_time; 
    }
    public function getdate(): DateTime { 
        return $this->date; 
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
    public function setstart(DateTime $t) { 
        $this->start_time = $t; 
    }
    public function setdate(DateTime $d) { 
        $this->date = $d; 
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
            $this->start_time,
            $this->date,
            $this->auditorium,
            $this->is_peak
        ];
    }
}
