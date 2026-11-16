# Backend de Veterinaria

API REST de demostración con Express, PostgreSQL y Ollama/Gemma 3. La información inicial de la clínica, sus servicios, especialidades, galería y precios es ficticia y debe actualizarse antes de publicarla.

## Requisitos

- Node.js 20 o posterior y npm.
- PostgreSQL en ejecución y una base ya creada llamada `veterinariadb`.
- Ollama local y el modelo Gemma 3 (`ollama pull gemma3`).

## Instalación y configuración

```powershell
npm install
Copy-Item .env.example .env
```

Edite `.env` con el usuario y contraseña de PostgreSQL. No comparta ni suba ese archivo. Conéctese a `veterinariadb` desde pgAdmin y ejecute `database/schema.sql`; el script crea las tablas y agrega datos de demostración sin borrar registros existentes.

Inicie Ollama y descargue el modelo si aún no está instalado:

```powershell
ollama pull gemma3
```

## Ejecución

```powershell
npm run dev
```

La API estará en `http://localhost:3000`. `GET /api/health` verifica la conexión con PostgreSQL. `GET /api/chatbot/health` comprueba Ollama y el modelo configurado.

## Endpoints

- `GET /api/servicios`, `GET /api/servicios/:id`
- `GET /api/especialidades`, `GET /api/especialidades/:id`
- `GET /api/precios`, `GET /api/precios/:servicioId`
- `GET /api/veterinaria`
- `GET /api/galeria`, `GET /api/galeria/:id`
- `POST /api/contactos`
- `POST /api/chatbot/message`
- `GET /api/chatbot/health`
- `GET /api/health`

Las respuestas usan JSON y el backend no conecta directamente con el navegador a Ollama ni a PostgreSQL.
