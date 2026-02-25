# ByEstef - Sistema de Pastelería (Angular + Node + Firebase)

Aplicación full-stack con módulos en el navbar:

- **Dashboard**: ventas por día/semana/quincena/mes + producto más vendido.
- **Ingredientes**: alta, edición y eliminación (con confirmación) de ingredientes con costo por unidad base.
- **Recetas**: presupuesto de recetas usando ingredientes guardados (con edición/eliminación).
- **Ventas**: registro, edición y eliminación (con confirmación) de ventas realizadas.

Además incluye:
- **Login con autenticación JWT**.
- **Protección de rutas** (si no hay sesión, redirige a login).
- **Tema oscuro global**.
- **Estilo glassmorphism** y marca ByEstef en cursiva elegante.

## Stack
- Frontend: Angular (standalone + router + guard + interceptor).
- Backend: Node.js + Express.
- DB: Firebase Firestore.

## Configuración rápida

1. Configura Firebase (Firestore activo) y descarga tu service account JSON.
2. Crea `backend/.env` desde `backend/.env.example`.
3. Define:

```env
PORT=3000
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
AUTH_EMAIL=admin@byestef.com
AUTH_PASSWORD=ByEstef123!
AUTH_JWT_SECRET=byestef-secret-dev
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

## Credenciales iniciales

- Email: `admin@byestef.com`
- Contraseña: `ByEstef123!`

*(Puedes cambiarlas desde variables de entorno en backend).* 

## Endpoints principales

- `POST /api/auth/login`
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
