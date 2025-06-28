<?php
abstract class Model{
    protected static string $table;
    protected static string $primary_key="id";
    protected static mysqli $db;

    public static function setDb(mysqli $mysqli){
        static::$db=$mysqli;
    }

    public static function find(int $id){
        $sql=sprintf("SELECT * from %s where %s =?",
                   static::$table,
                   static::$primary_key);
        $query=static::$db->prepare($sql);
        $query->bind_param("i",$id);
        $query->execute();
        
        $data=$query->get_result()->fetch_assoc();

        return $data ? new static($data):null ;
    }

    public static function findAll() {
        $sql = sprintf("SELECT * FROM %s", static::$table);
        $query = static::$db->prepare($sql);
        $query->execute();
        
        $objects=[];
        $result = $query->get_result();
        while ($data = $result->fetch_assoc()) {
            $objects[]=new static($data); 
        }
        return $objects;
    }
    public static function delete(int $id) {
        $sql = sprintf("DELETE FROM %s WHERE %s = ?", static::$table, static::$primary_key);
        $query = static::$db->prepare($sql);
        $query->bind_param("i", $id);
        $query->execute();
    }
    
    public static function create(array $values) {
        $columns = array_keys($values);
        $placeholders = implode(',', array_fill(0, count($columns), '?'));
        $types = str_repeat('s', count($values)); 

        $sql = sprintf("INSERT INTO %s (%s) VALUES (%s)",
            static::$table,
            implode(',', $columns),
            $placeholders
        );

        $query = static::$db->prepare($sql);
        $query->bind_param($types, ...array_values($values));
        $query->execute();
    }

    public static function update(int $id, array $values) {
        $set_clauses = [];
        foreach ($values as $key => $value) {
            $set_clauses[] = "$key = ?";
        }

        $sql = sprintf("UPDATE %s SET %s WHERE %s = ?",
            static::$table,
            implode(',', $set_clauses),
            static::$primary_key
        );

        $types = str_repeat('s', count($values)) . 'i'; 
        $params = array_values($values);
        $params[] = $id;

        $query = static::$db->prepare($sql);
        $query->bind_param($types, ...$params);
        $query->execute();
    }
}