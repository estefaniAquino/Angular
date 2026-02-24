# CRUD de Inventario de Repostería (Angular + Node + Firebase)

Este proyecto incluye:

- **Frontend Angular** para administrar inventario de repostería.
- **Backend Node/Express** para exponer API REST CRUD.
- **Firebase Firestore** como base de datos.
- **Calculadora de costos** (inversión, venta potencial y utilidad estimada).

## Estructura

- `frontend/`: aplicación Angular.
- `backend/`: API Node + Express + Firebase Admin SDK.

## 1) Configurar Firebase

1. Crea un proyecto en Firebase.
2. Habilita Firestore.
3. Genera una cuenta de servicio (Service Account) y copia sus credenciales.
4. En `backend/`, crea un archivo `.env` basado en `.env.example`.

## 2) Levantar backend

```bash
cd backend
npm install
npm run dev
```

La API se expone en `http://localhost:4000/api`.

### Endpoints

- `GET /api/inventory`
- `POST /api/inventory`
- `PUT /api/inventory/:id`
- `DELETE /api/inventory/:id`
- `GET /api/inventory/cost-summary`

## 3) Levantar frontend

```bash
cd frontend
npm install
npm start
```

La app consumirá el backend desde `http://localhost:4000/api`.

## Lógica de calculadora

Por cada producto:

- `totalCost = quantity * unitCost`
- `potentialRevenue = quantity * salePrice`

Resumen global:

- `totalInversion = Σ totalCost`
- `totalVentaPotencial = Σ potentialRevenue`
- `utilidadEstimada = totalVentaPotencial - totalInversion`
