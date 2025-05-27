# Instrucciones de Instalación y Uso

## 1. Configuración del Backend

### Solucionar problemas de dependencias

Primero, corrige el problema de conflicto de TypeScript:

```bash
# Instala TypeScript 4.9.5 (compatible con ts-jest)
npm uninstall typescript
npm install typescript@4.9.5 --save-dev

# Ahora instala las dependencias con la bandera --legacy-peer-deps
npm install --legacy-peer-deps
```

### Compilar el proyecto

```bash
# Genera los archivos de definiciones de tipos de Prisma
npx prisma generate

# Compila el proyecto TypeScript
npx tsc
```

Si hay errores durante la compilación, puedes intentar:

```bash
npx tsc --skipLibCheck
```

### Iniciar el servidor backend

```bash
npm run start
```

Si el error "Cannot find module 'dist/app.js'" persiste, sigue estos pasos para verificar y corregir el archivo package.json:

```bash
# 1. Abre el archivo package.json en un editor de texto
notepad package.json  # En Windows
# o usando Visual Studio Code
code package.json

# 2. Busca la sección "scripts" y verifica el script "start"
# Debería verse así:
# "scripts": {
#   "start": "node dist/app.js",
#   ...
# }

# 3. Si la ruta es incorrecta, modifícala según la estructura de tu proyecto
# Opciones comunes:
# - "node dist/app.js"
# - "node dist/src/app.js"
# - "node dist/index.js"

# 4. Guarda el archivo y vuelve a intentar iniciar el servidor
npm start
```

Otra solución es buscar manualmente el archivo principal compilado:

```bash
# Busca el archivo app.js o index.js en la carpeta dist
dir dist /s /b | findstr "app.js"
dir dist /s /b | findstr "index.js"

# Una vez que encuentres la ubicación correcta, actualiza package.json
```

También puedes ejecutar el archivo directamente para probar:

```bash
# Intentar ejecutar directamente (reemplaza la ruta según lo que encontraste)
node dist/src/app.js
```

## 2. Configuración del Frontend

### Crear la carpeta frontend y configurar el proyecto React

```bash
# Navega a la carpeta principal del proyecto
cd C:\Users\NoxiePC\Desktop\Baileys-2025-Rest-API-main

# Crea un nuevo proyecto React con Create React App
npx create-react-app frontend --template typescript

# Navega a la carpeta del frontend
cd frontend

# Instala las dependencias adicionales que necesitamos
npm install react-router-dom axios
```

### Copiar los archivos del frontend

Ahora debes copiar manualmente los archivos que generamos previamente (App.tsx, components, contexts, etc.) a la carpeta frontend. Puedes usar el Explorador de Archivos de Windows para esto.

### Iniciar el servidor de desarrollo del frontend

```bash
# Dentro de la carpeta frontend
npm start
```

El frontend estará disponible en http://localhost:3000

## 3. Verificación de la base de datos

Para asegurarte de que la conexión a la base de datos funciona:

```bash
# Verifica la conexión a la base de datos
npx prisma db pull

# Si hay problemas, revisa el archivo .env y asegúrate de que DATABASE_URL es correcto
```

## 4. Creación de un usuario de prueba

Si la API requiere autenticación, puedes crear un usuario de prueba:

```bash
# Usando curl o Postman
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Prueba",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 5. Solución de Problemas Comunes

### Error de módulo no encontrado

```bash
# Reinstala los módulos de Node.js
rm -rf node_modules
npm cache clean --force
npm install --legacy-peer-deps
```

### Errores de Prisma

```bash
# Regenera los archivos de Prisma
npx prisma generate
```

### Conflictos de dependencias

Si continúas teniendo problemas con las dependencias:

```bash
# Opción nuclear: reinstala Node.js y npm
# Luego, en el proyecto:
npm install --legacy-peer-deps --force
```

## 6. Recursos Adicionales

- [Documentación de la API](http://localhost:3001/api-docs)
- [Dashboard de administración](http://localhost:3001/dashboard)
- [Repositorio del proyecto](https://github.com/pointersoftware/Baileys-2025-Rest-API)

¡Feliz desarrollo!
