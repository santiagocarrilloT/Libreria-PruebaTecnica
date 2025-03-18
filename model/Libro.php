<?php


require_once '../config/conexion.php';

class Libro extends Conexion{

    public function nuevoLibro($titulo, $autor, $genero, $stock){
        $conectar = parent::conexion();
        parent::set_Names();
        $sql = "INSERT INTO libros (titulo, autor, genero, stock) VALUES (?, ?, ?, ?)";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $titulo);
        $sql->bindValue(2, $autor);
        $sql->bindValue(3, $genero);
        $sql->bindValue(4, $stock);
        $sql->execute();
    }

    public function editarLibro($titulo, $autor, $genero, $stock, $id_libro){
        $conectar = parent::conexion();
        parent::set_Names();
        $sql = "UPDATE libros SET titulo = ?, autor = ?, genero = ?, stock = ? WHERE id_libro = ?";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $titulo);
        $sql->bindValue(2, $autor);
        $sql->bindValue(3, $genero);
        $sql->bindValue(4, $stock);
        $sql->bindValue(5, $id_libro);
        return $sql->execute();
    }

    public function eliminarLibro($id_libro) {
        $conectar = parent::conexion();
        parent::set_Names();
        $sql = "DELETE FROM libros WHERE id_libro = ?";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $id_libro);
        return $sql->execute();
    }

    public function getLibro(){
        $conectar = parent::conexion();
        parent::set_Names();
        $sql = "SELECT * FROM libros";
        $sql = $conectar->prepare($sql);
        $sql->execute();
        return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLibroEdit($id_libro){
        $conectar = parent::conexion();
        parent::set_Names();
        $sql = "SELECT * FROM libros WHERE id_libro = ?";
        $sql = $conectar->prepare($sql);
        $sql->bindValue(1, $id_libro);
        $sql->execute();
        return $resultado = $sql->fetchAll(PDO::FETCH_ASSOC);
    }
}


?>