# Solución de Errores de Instalación y Ejecución

## Problema 1: Conflicto de dependencias con TypeScript

El error `npm error ERESOLVE` indica un conflicto entre las versiones de TypeScript requeridas por diferentes dependencias:
- ts-jest requiere TypeScript < 5.0
- Otras dependencias requieren TypeScript 5.8.x

### Solución:

Ejecuta npm install con la bandera `--legacy-peer-deps` para ignorar estos conflictos:

```bash
npm install --legacy-peer-deps
```

Alternativamente, puedes instalar una versión específica de TypeScript compatible con ts-jest:

```bash
# Desinstalar la versión actual
npm uninstall typescript

# Instalar una versión compatible
npm install typescript@4.9.5 --save-dev

# Luego reinstalar las dependencias
npm install
```

## Problema 2: Falta el archivo dist/app.js

El error `Cannot find module 'dist/app.js'` indica que el proyecto no ha sido compilado correctamente.

### Solución:

1. Primero, asegúrate de que todas las dependencias estén instaladas:

```bash
npm install --legacy-peer-deps
```

2. Compila el proyecto TypeScript:

```bash
# Si tienes un script de compilación
npm run build

# Si no hay script de compilación, ejecuta tsc directamente
npx tsc
```

3. Verifica que la carpeta `dist` se haya creado correctamente con el archivo `app.js`

4. Ahora puedes iniciar el servidor:

```bash
npm start
```

## Solución Alternativa: Iniciar en Modo Desarrollo

Si solo quieres probar el proyecto, puede ser más fácil iniciarlo en modo desarrollo:

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Iniciar en modo desarrollo (esto compila y ejecuta automáticamente)
npm run dev
```

## Para el Frontend React

Si estás configurando el frontend en React, sigue estos pasos:

1. Navega a la carpeta del frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm start
```

El frontend debería estar disponible en http://localhost:3000

## Notas Adicionales

- Asegúrate de que todas las variables de entorno estén configuradas correctamente en el archivo `.env`
- Verifica que la base de datos esté configurada y accesible
- Si usas la API desde el frontend, asegúrate de que el backend esté en ejecución en http://localhost:3001
