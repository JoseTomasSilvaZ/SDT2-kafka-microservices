import psycopg2
import matplotlib.pyplot as plt

# Estableciendo la conexión
conn = psycopg2.connect(
    database="orders", user='user', password='password', host='127.0.0.1', port='5432'
)

# Crear un cursor object usando el método cursor()
cursor = conn.cursor()

# Ejecutando la consulta
cursor.execute('''SELECT EXTRACT(EPOCH FROM ("updatedAt" - "createdAt")) AS delta_seconds
FROM "Order";''')

# Obteniendo todos los registros
rows = cursor.fetchall()

# Cerrando la conexión
conn.close()

# Preparando los datos para graficar
delta_seconds = [row[0] for row in rows]
x_labels = [f'Consulta {i+1}' for i in range(len(rows))]

# Creando el gráfico de barras
plt.figure(figsize=(10, 6))
plt.bar(x_labels, delta_seconds, color='blue')
plt.xlabel('Consultas')
plt.ylabel('Tiempo Delta (segundos)')
plt.title('Tiempo Delta para Completar las Consultas')
plt.xticks(rotation=45, ha='right')
plt.tight_layout()

# Guardar el gráfico como una imagen
plt.savefig('delta_response_plot.png')

# Mostrar el gráfico
plt.show()
