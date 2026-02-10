# CRUD Inventario de Repostería (Angular + Node.js + Firebase)

Proyecto base para gestionar un inventario de repostería con:

- **Frontend:** Angular (formulario + tabla CRUD).
- **Backend:** Node.js + Express.
- **Base de datos:** Firebase Firestore.
- **Calculadora de costos:** costo total y precio sugerido por margen.

## 1) Configuración de Firebase

1. Crea un proyecto en Firebase.
2. Activa **Firestore Database**.
3. Ve a Configuración del proyecto > Cuentas de servicio.
4. Genera una clave privada y guarda el archivo JSON.
5. Copia `backend/.env.example` como `backend/.env`.
6. En `FIREBASE_SERVICE_ACCOUNT_PATH` coloca la ruta local del JSON.

> Ejemplo: `FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json`

## 2) Levantar backend

```bash
cd backend
npm install
npm run dev
```

La API quedará en `http://localhost:3000/api/inventario`.

## 3) Levantar frontend

```bash
cd frontend
npm install
npm start
```

La web quedará en `http://localhost:4200`.

## 4) Endpoints CRUD

- `GET /api/inventario`
- `GET /api/inventario/:id`
- `POST /api/inventario`
- `PUT /api/inventario/:id`
- `DELETE /api/inventario/:id`

## 5) Estructura rápida

- `backend/src/utils/costCalculator.js`: lógica de cálculo.
- `backend/src/controllers/inventarioController.js`: controladores CRUD.
- `frontend/src/app/components/inventario/`: UI principal y calculadora visual.

Todos los archivos clave incluyen comentarios en español para facilitar modificaciones.
