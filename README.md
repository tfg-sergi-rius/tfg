# TFG

Aplicacion con frontend en Angular y backend en FastAPI para generar ideas de TFG con OpenAI.

## Requisitos

- Docker Desktop o Docker Engine con Compose
- Una clave valida de OpenAI

## Ejecutar con Docker Compose

1. Crea un archivo `.env` en la raiz del proyecto a partir de `.env.example`:

```env
OPENAI_API_KEY=tu_clave_real
```
Set-Content -Path .env -Value "OPENAI_API_KEY="
2. Levanta los servicios:

```bash
docker compose up --build
```

3. Accede a:

- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8000`
- Swagger: `http://localhost:8000/docs`

## Servicios incluidos

- `frontend`
  Sirve la aplicacion Angular con `nginx`.
- `backend`
  Expone la API FastAPI en el puerto `8000`.

El frontend en Docker usa `/api` y `nginx` hace proxy hacia el backend dentro de Compose.

## Persistencia

La base de datos SQLite se guarda en el volumen `backend-data`.

## Licencia

MIT. Consulta `LICENSE`.
