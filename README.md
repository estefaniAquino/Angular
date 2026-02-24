# CRUD Inventario de Repostería (Angular + Node.js + Firebase)

Proyecto completo para gestionar un inventario de repostería con:

- **Frontend:** Angular (formulario + tabla CRUD con estilo rosa pastel).
- **Backend:** Node.js + Express.
- **Base de datos:** Firebase Firestore.
- **Calculadora de costos:** costo total y precio sugerido según margen de ganancia.

---

## 1) Requisitos previos

- Node.js 18 o superior.
- npm 9 o superior.
- Una cuenta de Firebase con Firestore habilitado.

---

## 2) Configuración de Firebase (obligatoria)

1. Crea un proyecto en Firebase.
2. Activa **Firestore Database**.
3. Ve a **Configuración del proyecto > Cuentas de servicio**.
4. Genera una clave privada y guarda el archivo JSON.
5. En el proyecto, copia `backend/.env.example` como `backend/.env`.
6. En `FIREBASE_SERVICE_ACCOUNT_PATH` coloca la ruta del JSON.

Ejemplo:

```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
```

> Nota: el archivo JSON de credenciales **no** se sube al repo.

---

## 3) Instalar dependencias

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## 4) Ejecutar el proyecto

Abre **dos terminales**.

### Terminal 1: backend

```bash
cd backend
npm run dev
```

Backend en: `http://localhost:3000`

### Terminal 2: frontend

```bash
cd frontend
npm start
```

Frontend en: `http://localhost:4200`

---

## 5) Endpoints CRUD

- `GET /api/inventario`
- `GET /api/inventario/:id`
- `POST /api/inventario`
- `PUT /api/inventario/:id`
- `DELETE /api/inventario/:id`

Base URL completa: `http://localhost:3000/api/inventario`

---

## 6) ¿Qué incluye la app?

- Alta, edición, listado y eliminación de productos de repostería.
- Cálculo automático de:
  - costo total = ingredientes + empaque + mano de obra.
  - precio sugerido = costo total + margen de ganancia (%).
- Comentarios en español para facilitar personalización del código.
- Interfaz en **colores rosa pastel**.

---

## 7) Estructura rápida

- `backend/src/utils/costCalculator.js`: lógica de cálculo de costos.
- `backend/src/controllers/inventarioController.js`: controladores CRUD.
- `backend/src/services/inventarioService.js`: acceso a Firestore.
- `frontend/src/app/components/inventario/`: pantalla principal (formulario + tabla).
- `frontend/src/app/services/inventario.service.ts`: cliente HTTP al backend.

---

## 8) Solución de problemas rápida

- Si el backend no arranca, revisa `backend/.env` y la ruta de `FIREBASE_SERVICE_ACCOUNT_PATH`.
- Si no carga datos en el frontend, verifica que backend esté corriendo en `:3000`.
- Si cambias puerto del backend, actualiza `frontend/src/environments/environment.ts`.
