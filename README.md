# AccessBoard RBAC Client

Frontend client for AccessBoard, a dynamic RBAC admin panel. The app provides an authenticated admin interface for managing users, roles, and permissions while rendering navigation and actions based on the current user's access.

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- MUI X Data Grid
- Redux Toolkit
- React Query
- React Router
- Axios

## Features

- JWT-based login flow
- Auth bootstrap with persisted access token
- Protected routes with permission checks
- Permission-aware sidenav navigation
- User management with create, edit, delete, and role assignment flows
- Role management with create, edit, delete, search, and permission assignment
- Dynamic permission picker grouped by backend permission resources
- Toast feedback and loading states for admin actions

## Frontend Highlights

- Permission-aware sidenav that hides unavailable admin areas
- Route-level protection with `RouteGuard`
- Action-level permission checks for create, edit, delete, and role assignment
- React Query for API fetching, caching, mutation states, and invalidation
- Redux Toolkit for authenticated user state
- Axios request interceptor for attaching JWT tokens
- MUI Data Grid tables for user and role management workflows
- Dialog-based create, edit, delete, and permission assignment flows
- Reusable table, pagination, loading, layout, and delete confirmation components
- Feature-focused hooks for filters, forms, UI state, API calls, and mutations

## Frontend Architecture

The client is organized around shared UI primitives and feature modules.

```txt
src/
  api/                         Axios client and shared API services
  common/
    components/                Appbar, sidenav, auth guard, table helpers
    layout/                    Auth and protected app layouts
    util/                      Permission helper utilities
  hooks/                       Shared hooks such as toast and pagination
  modules/Admin/
    features/user/             User table, dialogs, form state, API hooks
    features/role/             Role table, permission picker, API hooks
    routes/                    Admin route definitions
  store/                       Redux Toolkit store and authenticated user slice
```

Feature modules keep API calls, types, hooks, and UI components close to the workflow they support. Shared components stay in `common` only when they are reused across admin areas.

## Auth Flow

1. A user logs in with email and password.
2. The API returns a JWT access token.
3. The client stores the token in `localStorage`.
4. Axios attaches the token to protected API requests.
5. The client fetches the current user and stores their roles and permissions.
6. Routes, sidenav items, and table actions render based on those permissions.

## Permission Model

The backend returns permission strings through the current user payload and permission list API. The client uses those permissions to control the admin experience.

Examples:

```txt
user:list
user:create
role:update
role:assign
```

Frontend permission checks improve user experience. Server-side authorization is still enforced by the backend.

## Setup

Create a `.env` file:

```env
VITE_API_URL="http://localhost:5000"
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Demo Credentials

These credentials are seeded by the AccessBoard RBAC API for local demo and portfolio review.

```txt
Email: admin@example.com
Password: Admin@123
```

## Routes

```txt
/login
/unauthorized
/admin/users
/admin/roles
```

## API Contract

This client expects the AccessBoard RBAC API to expose endpoints under:

```txt
{VITE_API_URL}/api
```

Used API areas:

```txt
POST   /api/user/login
GET    /api/user/me
GET    /api/user
POST   /api/user
PATCH  /api/user/:id
PATCH  /api/user/:id/roles
DELETE /api/user/:id

GET    /api/role
POST   /api/role
GET    /api/role/permissions
PATCH  /api/role/:id
DELETE /api/role/:id
```

## Project Focus

This frontend is intentionally focused on RBAC administration rather than a larger domain product. It is designed to showcase authenticated React apps, guarded routes, permission-aware UI, data tables, API state management, and clean admin workflows.
