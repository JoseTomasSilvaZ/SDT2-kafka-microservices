import csv

def procesar_csv(archivo_entrada, archivo_salida):
    with open(archivo_entrada, 'r') as archivo_entrada, open(archivo_salida, 'w', newline='') as archivo_salida:
        lector_csv = csv.reader(archivo_entrada)
        escritor_csv = csv.writer(archivo_salida)

        for fila in lector_csv:
            nuevo_registro = [fila[1], fila[6]]  # Selecciona el segundo y el séptimo elemento de cada fila
            escritor_csv.writerow(nuevo_registro)

# Rutas de los archivos de entrada y salida
archivo_entrada = './amazon_products.csv'
archivo_salida = './dataset_amazon.csv'

# Procesar el archivo CSV
procesar_csv(archivo_entrada, archivo_salida)

print("Procesamiento completado. Se ha generado el archivo de salida:", archivo_salida)