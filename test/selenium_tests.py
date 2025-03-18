from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import unittest

class PHPPageTest(unittest.TestCase):
    
    def setUp(self):
        # Configurar opciones de Chrome
        chrome_options = Options()
        
        # Inicializar el driver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Maximizar la ventana
        self.driver.maximize_window()
        
        self.url = "http://localhost/LibreriaPrueba/"
        
    def test_pagina_carga_correctamente(self):
        driver = self.driver
        # Navegar a la página
        driver.get(self.url)
        
        # Verifica que el título de la página sea el esperado
        self.assertIn("Libreria Prueba Técnica", driver.title)
        
    def test_formulario_envio(self):
        driver = self.driver
        driver.get(self.url)
        
        # Busca el campo de entrada por titulo y autor
        campo_titulo = driver.find_element(By.ID, "title_form")
        campo_titulo.send_keys("Titulo Test")
        
        campo_autor = driver.find_element(By.ID, "autor_form")
        campo_autor.send_keys("Autor Test")
        
        # Enviar el formulario
        boton_enviar = driver.find_element(By.ID, "btn_form")
        boton_enviar.click()

    def test_eliminar_libro(self):
        driver = self.driver
        driver.get(self.url)
        celda_con_texto = driver.find_element(By.XPATH, "//td[contains(text(), 'Titulo Test')]")
    
        # Buscar en el tr padre
        fila = celda_con_texto.find_element(By.XPATH, "./..")
        
        # Encuentra el botón dentro de esa fila
        boton = fila.find_element(By.XPATH, ".//button[contains(@id, 'btnEliminar')]")
        boton.click()

    def test_editar_libro(self):
        driver = self.driver
        driver.get(self.url)

        celda_con_texto = driver.find_element(By.XPATH, "//td[contains(text(), 'kgdTitulo Test Editado')]")
    
        # Luego, subir al elemento padre (la fila <tr>)
        fila = celda_con_texto.find_element(By.XPATH, "./..")
        
        # Encuentra el botón dentro de esa fila
        boton = fila.find_element(By.XPATH, ".//button[contains(@id, 'btnEditar')]")
        boton.click()

        # Busca el campo de entrada por titulo y autor para cambiar sus valores
        campo_titulo = driver.find_element(By.ID, "editTitle_form")
        campo_titulo.send_keys("Titulo Test Editado")
        
        campo_autor = driver.find_element(By.ID, "editAutor_form")
        campo_autor.send_keys("Autor Test Editado")

        # Envia el formulario
        boton_enviar = driver.find_element(By.ID, "btnEditar_form")
        boton_enviar.click()

if __name__ == "__main__":
    unittest.main()