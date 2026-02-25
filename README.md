# ByEstef - Sistema de Pastelería (Angular + Node + Firebase)

Aplicación full-stack con 4 módulos en el navbar:

- **Dashboard**: ventas por día/semana/quincena/mes + producto más vendido.
- **Ingredientes**: alta, edición y eliminación (con confirmación) de ingredientes con costo por unidad base.
- **Recetas**: presupuesto de recetas usando ingredientes guardados (con edición/eliminación).
- **Ventas**: registro, edición y eliminación (con confirmación) de ventas realizadas.

## Stack
- Frontend: Angular (standalone + router).
- Backend: Node.js + Express.
- DB: Firebase Firestore.

## Configuración rápida

1. Configura Firebase (Firestore activo) y descarga tu service account JSON.
2. Crea `backend/.env` desde `backend/.env.example`.
3. Define:

```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
```

## Ejecutar local

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Endpoints principales

- `GET/POST/PUT/DELETE /api/ingredientes`
- `GET/POST/PUT/DELETE /api/recetas`
- `GET/POST/PUT/DELETE /api/ventas`
- `GET /api/reportes/ventas?periodo=dia|semana|quincena|mes`

## Lógica de costos (recetas)

La receta calcula:
1. Subtotal ingredientes (sumatoria de `cantidadUsada * costoUnidad`).
2. Costo total (`ingredientes + empaque + mano de obra + gastos fijos`).
3. Precio sugerido con margen.
4. Costo/precio por porción.

Esto permite una calculadora estilo receta detallada como solicitaste.
