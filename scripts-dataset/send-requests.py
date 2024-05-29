import csv
import requests

def enviar_json_desde_csv(archivo_csv, url_destino, limite):
    with open(archivo_csv, 'r') as archivo:
        lector_csv = csv.reader(archivo)
        next(lector_csv)  # Saltar la primera fila si contiene encabezados

        for indice, fila in enumerate(lector_csv, start=1):
            if indice > limite:
                break
            
            nombre = fila[0].strip()  # Obteniendo el nombre de la primera columna
            precio = fila[1].strip()  # Obteniendo el precio de la segunda columna
            mail = 'josetomassilvaz@gmail.com'

            # Crear el payload JSON
            payload = {
                'price': float(precio),
                'item': nombre,
                'email': mail
                
            }

            # Enviar la solicitud POST con el payload JSON
            response = requests.post(url_destino, json=payload)

archivo_csv = './dataset_amazon.csv'
url_destino = 'http://localhost:3000/orders'

enviar_json_desde_csv(archivo_csv, url_destino, 50)
