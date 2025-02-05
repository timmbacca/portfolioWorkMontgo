# Use Docker Compose for multi-service deployment
FROM docker/compose:1.29.2

WORKDIR /app

COPY docker-compose.yml .
COPY . . 

CMD ["docker-compose", "up"]
