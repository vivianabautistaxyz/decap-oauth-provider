# decap-oauth-provider

Proveedor OAuth mínimo para que Decap CMS pueda iniciar sesión con GitHub.
Esto NO aloja el blog — solo resuelve el login. El blog sigue en GitHub Pages.

## Deploy

1. Crea un repo en GitHub con este contenido y despliégalo en Vercel (vercel.com → "Add New Project" → importa el repo).
2. En Vercel, agrega las variables de entorno:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   (estos valores salen de la GitHub OAuth App, ver más abajo).
3. Anota la URL que te da Vercel, ej. `https://decap-oauth-provider.vercel.app`.

## Crear la GitHub OAuth App

En GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:

- **Homepage URL**: `https://vivianabautistaxyz.github.io/constelaciones`
- **Authorization callback URL**: `https://TU-PROYECTO.vercel.app/api/callback`

Copia el Client ID y genera un Client Secret; esos van en las variables de entorno de Vercel.

## Conectar con Decap CMS

En `public/admin/config.yml` del blog, `base_url` debe ser la URL de este proyecto en Vercel
(sin `/api/auth` al final, Decap lo agrega solo).
