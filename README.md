# 🌟 Tarea 2 - Kafka + Microservicios

### Instalación

Para iniciar el proyecto, clónalo en tu máquina

```bash
  git clone https://github.com/JoseTomasSilvaZ/SDT2-kafka-microservices
```

Luego, instala las dependencias

```bash
  npm install
```

### Iniciación

Inicia la base de datos y Kafka

```bash
docker compose up
```

Aplica el esquema de prisma en la base de datos

```bash
cd libs/prisma
npx prisma db push
npx prisma generate
```

Inicia el microservicio que quieras

```bash
nest start <orders | processing | notifications>
```

Para iniciar algún microservicio con réplicas, corre su versión de compose

```bash
docker compose -f docker.<orders | processing | notifications>.compose.yml up --build
```
