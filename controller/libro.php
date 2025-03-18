<?php 
    require_once "../config/conexion.php";
    require_once "../model/Libro.php";
    $libro = new Libro();

    switch ($_GET["op"]){
        case "insert":
            $datos = $libro->nuevoLibro($_POST["title_form"], $_POST["autor_form"], $_POST["genero_form"], $_POST["stock_form"]);
            break;
        case "update":
            $datos = $libro->editarLibro($_POST["editTitle_form"], $_POST["editAutor_form"], $_POST["editGenero_form"], $_POST["editStock_form"], $_POST["idLibro_form"]);
            if ($datos) {
                echo "Libro actualizado correctamente";
            } else {
                echo "Error al actualizar el libro";
            }
            break;
        case "delete":
             if (isset($_POST["id"])) {
                $datos = $libro->eliminarLibro($_POST["id"]);
                if ($datos) {
                    echo "Libro eliminado correctamente";
                } else {
                    echo "Error al eliminar el libro";
                }
            } else {
                echo "Error: id no definido";
            }
            break;    
        case "obtener_libro":
            if (isset($_POST["id_libro"])) {
                $datos = $libro->getLibroEdit($_POST["id_libro"]);
                echo json_encode($datos);
            } else {
                echo json_encode(["error" => "id_libro no definido"]);
            }
            break;
        case "listar_libros":
            $datos = $libro->getLibro();
            if ($datos) {
                echo json_encode($datos);
            } else {
                echo json_encode(["error" => "No se encontró el libro"]);
            }
            break;
    }
?>